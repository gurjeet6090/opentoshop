import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { id: { product, qty } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      if (state.items[product.id]) {
        state.items[product.id].qty += 1;
      } else {
        state.items[product.id] = {
          ...product,
          qty: 1,
        };
      }
    },

    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },

    increaseQty: (state, action) => {
      state.items[action.payload].qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items[action.payload];

      if (item.qty > 1) item.qty -= 1;
      else delete state.items[action.payload];
    },

    clearCart: (state) => {
      state.items = {};
    },

    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;