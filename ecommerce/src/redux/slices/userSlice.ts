import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
