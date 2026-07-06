import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "APP_CART_DATA";

export const saveCart = async (cart) => {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCart = async () => {
  const data = await AsyncStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : {};
};



const WISHLIST_KEY = "APP_WISHLIST_DATA";

export const saveWishlist = async (wishlist)  => {
   await AsyncStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
  );
};

/* Load Wishlist */
export const loadWishlist = async () => {
  const data = await AsyncStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : {};
};