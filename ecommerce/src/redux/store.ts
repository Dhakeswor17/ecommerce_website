import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import categoryReducer from './slices/categorySlice';

const PERSIST_KEY = 'temudark_state';

function loadState() {
  try { const raw = localStorage.getItem(PERSIST_KEY); return raw ? JSON.parse(raw) : undefined; }
  catch { return undefined; }
}
function saveState(state: any) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify({
      cart: state.cart,
      user: state.user,
      wishlist: state.wishlist
    }));
  } catch {}
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
