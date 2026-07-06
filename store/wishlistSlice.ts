import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ---------- TYPE ---------- */

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

/* ---------- STATE ---------- */

interface WishlistState {
  items: Record<string, WishlistItem>;
}

const initialState: WishlistState = {
  items: {},
};

/* ---------- SLICE ---------- */

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;

      state.items[item.id] = item; // no duplicate
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },

    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;

      if (state.items[item.id]) {
        delete state.items[item.id];
      } else {
        state.items[item.id] = item;
      }
    },

    clearWishlist: (state) => {
      state.items = {};
    },

    setWishlist: (
      state,
      action: PayloadAction<Record<string, WishlistItem>>,
    ) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
