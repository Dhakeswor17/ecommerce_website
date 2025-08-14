import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
};

const initialState: ProductState = {
  search: '',
  items: [
    { id: 'p1', title: 'Smartphone XYZ', image: 'https://via.placeholder.com/300x200', price: 299.99, originalPrice: 399.99, category: 'Electronics' },
    { id: 'p2', title: 'Wireless Headphones', image: 'https://via.placeholder.com/300x200', price: 99.99, originalPrice: 129.99, category: 'Electronics' },
    { id: 'p3', title: 'Fitness Tracker', image: 'https://via.placeholder.com/300x200', price: 59.99, originalPrice: 89.99, category: 'Fitness' },
    { id: 'p4', title: 'Smart TV 50"', image: 'https://via.placeholder.com/300x200', price: 499.99, originalPrice: 599.99, category: 'Electronics' },
  ],
};

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
  },
});

export const { setSearch, setProducts } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectSearch = (s: { products: ProductState }) => s.products.search;
export const selectProducts = (s: { products: ProductState }) => s.products.items;
export const selectProductById = (s: { products: ProductState }, id: string) =>
  s.products.items.find(p => p.id === id)
export const selectFilteredProducts = (s: { products: ProductState }) => {
  const q = s.products.search.trim().toLowerCase();
  if (!q) return s.products.items;
  return s.products.items.filter(p =>
    [p.title, p.category ?? ''].some(v => v.toLowerCase().includes(q))
  );
};
