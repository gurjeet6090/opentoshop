import { TypedUseSelectorHook, useSelector } from "react-redux";

/* Typed Dispatch */

export interface CartItemtype {
  id: string;
  title: string;
  price: number;
  qty: number;
  thumbnail: string;
}

interface CartState {
  items: Record<string, CartItemtype>;
}

interface RootState {
  cart: CartState;
  wishlist: CartState;
}

export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
