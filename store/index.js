import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { setCart } from "./cartSlice";
import { loadCart, loadWishlist, saveCart, saveWishlist } from "./persist";

import wishlistReducer, { setWishlist } from "./wishlistSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // ✅ ADD
  },
});

// Auto save when state changes
store.subscribe(() => {
  const state = store.getState();
  saveWishlist(state.wishlist.items);
  saveCart(state.cart.items);
  
});




export const initStore = async () => {
  const [savedCart, savedWishlist] = await Promise.all([
    loadCart(),
    loadWishlist(),
  ]);

  store.dispatch(setCart(savedCart));
  store.dispatch(setWishlist(savedWishlist));


};