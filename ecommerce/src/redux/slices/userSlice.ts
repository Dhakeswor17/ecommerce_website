import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../Services/api';

type User = { id: number; name: string; email: string; avatar?: string; token: string };
type AuthResponse = { access_token: string; refresh_token: string };

type UserState = { user: User | null; loading: boolean; error?: string | null };
const initialState: UserState = { user: null, loading: false, error: null };

// POST /auth/login -> {access_token, refresh_token}
export const login = createAsyncThunk('user/login', async (payload: { email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
});

// GET /auth/profile with Bearer token
export const fetchProfile = createAsyncThunk('user/profile', async (access_token: string) => {
  const { data } = await api.get<{ id: number; name: string; email: string; avatar?: string }>('/auth/profile', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  return data;
});

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) { state.user = null; }
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(login.fulfilled, (s, { payload }) => {
        // store token temporarily; profile will enrich
        s.loading = false;
        s.user = { id: -1, name: 'User', email: '', token: payload.access_token };
     })
     .addCase(login.rejected, (s, { error }) => { s.loading = false; s.error = error.message || 'Login failed'; })
     .addCase(fetchProfile.fulfilled, (s, { payload }) => {
        if (!s.user) s.user = { id: payload.id, name: payload.name, email: payload.email, token: '' };
        s.user = { ...(s.user || {} as User), ...payload, token: s.user?.token || '' };
     });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
