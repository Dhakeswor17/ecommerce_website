
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../Services/api';

export type Product = {
  id: number;
  title: string;
  images: string[];
  price: number;
  description?: string;
  category?: { id: number; name: string; image?: string };
};

type Query = {
  offset?: number;
  limit?: number;
  title?: string;      // filter by title
  categoryId?: number; // filter by category
  price_min?: number;
  price_max?: number;
};

type ProductState = {
  items: Product[];
  search: string;
  recentIds: number[];
  loading: boolean;
  error?: string | null;
  totalLoaded: number; // for infinite scroll
};

const initialState: ProductState = {
  items: [],
  search: '',
  recentIds: [],
  loading: false,
  error: null,
  totalLoaded: 0,
};

// GET /products?offset=&limit=&title=&categoryId=&price_min=&price_max
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (query: Query = {}) => {
    const params = { offset: 0, limit: 20, ...query };
    const { data } = await api.get<Product[]>('/products', { params });
    return data;
  }
);

// GET /products/:id
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  }
);

const MAX_RECENT = 8;

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    addRecentlyViewed(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.recentIds = [id, ...state.recentIds.filter(x => x !== id)].slice(0, MAX_RECENT);
    },
    clearProducts(state) {
      state.items = [];
      state.totalLoaded = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Merge (avoid dups) to support infinite scroll/pagination
        const existingIds = new Set(state.items.map(p => p.id));
        const merged = [...state.items];
        payload.forEach(p => { if (!existingIds.has(p.id)) merged.push(p); });
        state.items = merged;
        state.totalLoaded = merged.length;
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to load products';
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex(p => p.id === payload.id);
        if (idx >= 0) state.items[idx] = payload;
        else state.items.push(payload);
      });
  }
});

export const { setSearch, addRecentlyViewed, clearProducts } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectProducts = (s: any) => (s.products.items as Product[]);
export const selectSearch = (s: any) => s.products.search as string;
export const selectFilteredProducts = (s: any) => {
  const q = (s.products.search as string).trim().toLowerCase();
  const items = s.products.items as Product[];
  if (!q) return items;
  return items.filter(p =>
    [p.title, p.category?.name ?? '', String(p.price)]
      .some(v => v?.toLowerCase?.().includes(q))
  );
};
export const selectProductById = (s: any, id: number) =>
  (s.products.items as Product[]).find(p => p.id === id);
export const selectRecentlyViewed = (s: any) =>
  (s.products.recentIds as number[])
    .map((id: number) => (s.products.items as Product[]).find(p => p.id === id))
    .filter(Boolean) as Product[];
