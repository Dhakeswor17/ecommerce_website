import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  category?: string;
};




type ProductState = {
  items: Product[];
  search: string;
  recentIds: string[]; // ⬅️ add this
};

const initialState: ProductState = {
  search: '',
  recentIds: [],
  items: [
    // ...your demo items
  ],
};

const MAX_RECENT = 8;

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    addRecentlyViewed(state, action: PayloadAction<string>) {
      const id = action.payload;
      // put it first, unique, limit MAX_RECENT
      state.recentIds = [id, ...state.recentIds.filter(x => x !== id)].slice(0, MAX_RECENT);
    },
  },
});

export const { setSearch, setProducts, addRecentlyViewed } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectSearch = (s: { products: ProductState }) => s.products.search;
export const selectProducts = (s: { products: ProductState }) => s.products.items;
export const selectFilteredProducts = (s: { products: ProductState }) => {
  const q = s.products.search.trim().toLowerCase();
  if (!q) return s.products.items;
  return s.products.items.filter(p =>
    [p.title, p.category ?? ''].some(v => v.toLowerCase().includes(q))
  );
};
export const selectProductById = (s: { products: ProductState }, id: string) =>
  s.products.items.find(p => p.id === id);

export const selectRecentlyViewed = (s: { products: ProductState }) =>
  s.products.recentIds
    .map(id => s.products.items.find(p => p.id === id))
    .filter(Boolean) as Product[];

