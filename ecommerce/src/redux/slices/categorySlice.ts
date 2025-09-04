import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Services/api';

export type Category = { id: number; name: string; image?: string };

type CategoryState = {
  items: Category[];
  loading: boolean;
  error?: string | null;
};

const initialState: CategoryState = { items: [], loading: false, error: null };

// GET /categories
export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchCategories.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; })
     .addCase(fetchCategories.rejected, (s, { error }) => { s.loading = false; s.error = error.message || 'Failed to load categories'; });
  }
});

export default categorySlice.reducer;
export const selectCategories = (s: any) => s.categories.items as Category[];
