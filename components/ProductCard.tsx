import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";




import {
  addToCart,
  decreaseQty,
  increaseQty,
} from "../store/cartSlice";


import { toggleWishlist } from "@/store/wishlistSlice";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useCartSelector } from "../store/hook";

/* ---------------- TYPES ---------------- */

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  reviews: any[];
  discountPercentage?: number;
  old?: number;
}

/* --------------- COMPONENT --------------- */

export default function ProductCard({
  item,
}: {
  item: Product;
}) {
  const dispatch = useDispatch();


const isWished = useCartSelector(
  (state) => state.wishlist.items[item.id]
);

 const cartItem = useCartSelector(
  (state) => state.cart.items[item.id]
);



  /* Button Animation */
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /* Qty Handlers */
  const add = () => dispatch(addToCart(item));
  const inc = () => dispatch(increaseQty(item.id));
  const dec = () => dispatch(decreaseQty(item.id));

  return (
    
    <Animated.View
      style={animStyle}
      className="w-full mb-4 rounded-md bg-white shadow-lg overflow-hidden"
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        className="flex-1"
      >
        {/* ================= IMAGE AREA ================= */}
        <View className="relative bg-gray-100 p-3">

          {/* Discount */}
          {item.discountPercentage && item.id < "4" && (
            <View
              className="absolute top-2 left-1 px-2 py-1 rounded-full z-10"
              style={{
                backgroundColor: Colors.secondary,
              }}
            >
              <Text className="text-white text-[8px] font-bold">
                {item.discountPercentage}% OFF
              </Text>
            </View>
          )}

          {/* Wishlist */}
          <TouchableOpacity
            
             onPress={() => {
             
             
    dispatch(
      toggleWishlist({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
      })
    )
  }
  }
            className="absolute top-1 right-1 z-10 bg-white/80 p-1.5 rounded-full"
          >
            <Ionicons
              name={isWished ? "heart" : "heart-outline"}
              size={18}
              color={isWished ? "red" : "#334155"}
            />
          </TouchableOpacity>

          {/* Image */}
           <TouchableOpacity onPress={()=> router.push(`/product/${item.id}`)}>  
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-24 rounded-xl"
            resizeMode="cover"
          />
          </TouchableOpacity>
        </View>

        {/* ================= INFO ================= */}
        <View className="p-3 relative">

          {/* CART / QTY BUTTON (NO DESIGN CHANGE) */}
          <View
            style={{ backgroundColor: Colors.primary }}
           className={`absolute top-[-15px] -translate-x-1/1 flex-row items-center p-1 rounded-full shadow-md ${!cartItem ? 'left-1/2 ' :'left-1/3 '}`}
          >
            {!cartItem ? (
              /* Add Button */
              <TouchableOpacity onPress={add}>
                <Ionicons
                  name="bag-add"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              /* Qty Controller */
              <>
                <TouchableOpacity onPress={dec}>
                  <Ionicons
                    name="remove"
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>

                <Text className="mx-2 text-white text-xs font-bold">
                  {cartItem.qty}
                </Text>

                <TouchableOpacity onPress={inc}>
                  <Ionicons
                    name="add"
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Title */}

          <TouchableOpacity onPress={()=> router.push(`/product/${item.id}`)}>  
          <Text
            numberOfLines={1}
            className="mt-2 font-semibold text-gray-800 text-sm"
          >
            {item.title}
          </Text>
        
          {/* Rating */}
          <View className="flex-row items-center mt-0.5">
            <Ionicons
              name="star"
              size={14}
              color="#facc15"
            />

            <Text className="ml-1 text-xs text-gray-500">
              {item.rating} ({item.reviews.length})
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center justify-between mt-0.5">

            <View>
              <Text
                style={{ color: Colors.secondary }}
                className="font-bold text-sm"
              >
                ₹{item.price}
              </Text>

              {item.old && (
                <Text className="text-gray-400 text-xs line-through">
                  ₹{item.old}
                </Text>
              )}
            </View>

          </View>
        </TouchableOpacity>
        </View>
        
      </Pressable>
    </Animated.View>
  );
}