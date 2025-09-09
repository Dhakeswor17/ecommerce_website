import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../Services/api'; // ← make sure api exports setAuthToken (shown below)

type User = { id: number; name: string; email: string; avatar?: string; token: string };
type AuthResponse = { access_token: string; refresh_token: string };

type UserState = { user: User | null; loading: boolean; error?: string | null };
const initialState: UserState = { user: null, loading: false, error: null };

// POST /auth/login -> {access_token, refresh_token}
export const login = createAsyncThunk(
  'user/login',
  async (payload: { email: string; password: string }) => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  }
);

// GET /auth/profile (requires Bearer token)
export const fetchProfile = createAsyncThunk(
  'user/profile',
  async (access_token: string) => {
    const { data } = await api.get<{ id: number; name: string; email: string; avatar?: string }>('/auth/profile', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return data;
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      setAuthToken(undefined); // clear axios header
    },
  },
  extraReducers: (b) => {
    b
      // LOGIN
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        // Stash token immediately so ProtectedRoute works even before profile loads
        s.user = { id: -1, name: 'User', email: '', token: payload.access_token };
        setAuthToken(payload.access_token);
      })
      .addCase(login.rejected, (s, { error }) => {
        s.loading = false;
        s.error = error.message || 'Login failed';
      })
      // PROFILE
      .addCase(fetchProfile.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProfile.fulfilled, (s, { payload }) => {
        s.loading = false;
        if (!s.user) {
          // Shouldn't happen normally, but be safe
          s.user = { id: payload.id, name: payload.name, email: payload.email, token: '' };
        } else {
          s.user = { ...s.user, ...payload };
        }
      })
      .addCase(fetchProfile.rejected, (s, { error }) => {
        s.loading = false;
        s.error = error.message || 'Failed to fetch profile';
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
