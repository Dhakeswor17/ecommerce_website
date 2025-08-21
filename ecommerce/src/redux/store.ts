import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';

const PERSIST_KEY = 'temudark_state';

function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch { return undefined; }
}
function saveState(state: any) {
  try {
    const minimal = {
      cart: state.cart,
      user: state.user,
      wishlist: state.wishlist, // ⬅️ persist wishlist
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(minimal));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    wishlist: wishlistReducer,  
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
