import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WishlistState = {
  ids: string[]; // product ids
};

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id);
      } else {
        state.ids.unshift(id);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter(x => x !== action.payload);
    },
    clearWishlist(state) {
      state.ids = [];
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// Selectors
export const selectWishlistIds = (s: any) => s.wishlist.ids as string[];
