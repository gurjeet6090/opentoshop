import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function ProductCard({ item }: any) {
  const [wish, setWish] = useState(false);

  /* Button Animation */
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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

        {/* Image Area */}
        <View className="relative bg-gray-100 p-3">

          {/* Discount Badge */}
          {item.discountPercentage && item.id <4 && (
            <View className="absolute top-2 left-1 px-2 py-1 rounded-full z-10" style={{ backgroundColor: Colors.secondary }}>
              <Text className="text-white text-[8px] font-bold">
                {item.discountPercentage}% OFF
              </Text>
            </View>
          )}

          {/* Wishlist */}
          <TouchableOpacity
            onPress={() => setWish(!wish)}
            className="absolute top-1 right-1  z-10 bg-white/80 p-1.5 rounded-full"
          >
            <Ionicons
              name={wish ? "heart" : "heart-outline"}
              size={18}
              color={wish ? "red" : "#334155"}
            />
          </TouchableOpacity>

          {/* Product Image */}
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-24 rounded-xl"
            resizeMode="cover"
          />

        </View>

        {/* Info */}
        <View className="p-3 relative ">

          <TouchableOpacity  style={{ backgroundColor: Colors.primary }} className="absolute top-[-15px] left-1/2  p-1 rounded-full shadow-md">

              <Ionicons name="bag-add" size={20} color="white" />

            </TouchableOpacity>

          {/* Title */}
          <Text
            numberOfLines={1}
            className="mt-2 font-semibold text-gray-800 text-sm"
          >
            {item.title}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mt-0.5">

            <Ionicons name="star" size={14} color="#facc15" />
            

            <Text className="ml-1 text-xs text-gray-500">
              {item.rating} ({item.reviews.length})
            </Text>

          </View>

  

          {/* Price Row */}
          <View className="flex-row items-center justify-between mt-0.5">

            <View>

              <Text style={{ color: Colors.secondary }} className="text-indigo-600 font-bold text-sm">
                ₹{item.price}
              </Text>

              {item.old && (
                <Text className="text-gray-400 text-xs line-through">
                  ₹{item.old}
                </Text>
              )}

            </View>

            {/* Cart Button */}


          </View>


        </View>

      </Pressable>
    </Animated.View>
  );
}
