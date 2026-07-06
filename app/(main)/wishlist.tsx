import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@/constants/theme";

import { useDispatch } from "react-redux";
import { useCartSelector } from "../../store/hook";

import { useEffect, useRef } from "react";
import { toggleWishlist } from "../../store/wishlistSlice";

/* ---------------- TYPES ---------------- */

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

/* ---------------- CARD ---------------- */

const WishlistCard = ({ item, onRemove }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim,slideAnim]);

  const pressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim },
        ],
      }}
      className="mb-3"
    >
      <Pressable onPressIn={pressIn} onPressOut={pressOut}>
        <View className="bg-white rounded-3xl p-3 shadow flex-row">

          {/* Image */}
          <Image
            source={{ uri: item.thumbnail }}
            className="w-20 h-20 rounded-2xl"
          />

          {/* Info */}
          <View className="flex-1 ml-4 justify-between">

            <View>
              <Text
                numberOfLines={2}
                className="text-base font-semibold text-gray-800"
              >
                {item.title}
              </Text>

              <Text
                className="mt-1 text-lg font-bold"
                style={{ color: Colors.primary }}
              >
                ₹{item.price}
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-row items-center mt-2">

              <TouchableOpacity
                onPress={() => onRemove(item)}
                activeOpacity={0.7}
                className="bg-red-50 px-4 py-2 rounded-full"
              >
                <Text className="text-red-600 text-xs font-semibold">
                  Remove
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() =>
  router.push({
    pathname: "/product/[id]",
    params: { id: item.id },
  })
}
                activeOpacity={0.7}
                className="ml-3 bg-indigo-50 px-4 py-2 rounded-full"
              >
                <Text className="text-indigo-600 text-xs font-semibold">
                  View
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

/* ---------------- MAIN ---------------- */

export default function Wishlist() {
  const dispatch = useDispatch();

  const wishObj = useCartSelector(
    (state) => state.wishlist.items
  );

  const wishlist: WishlistItem[] = Object.values(wishObj);

  /* ---------------- EMPTY UI ---------------- */

  if (wishlist.length === 0) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-6">

        <Ionicons
          name="heart-outline"
          size={90}
          color="#9ca3af"
        />

        <Text className="mt-4 text-2xl font-bold text-gray-700">
          Wishlist Empty
        </Text>

        <Text className="mt-2 text-center text-gray-500">
          Add products you love ❤️
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
          className="mt-6 px-8 py-3 rounded-full"
          style={{ backgroundColor: Colors.primary }}
        >
          <Text className="text-white font-bold">
            Explore Store
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <View className="flex-1 bg-gray-100">

      {/* HEADER */}
      <View className="bg-white px-5 py-5 flex-row items-center shadow">

        <TouchableOpacity onPress={router.back}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <Text className="ml-4 text-2xl font-bold text-gray-800">
          Wishlist
        </Text>

        <View className="ml-auto bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-600 text-sm">
            {wishlist.length} items
          </Text>
        </View>

      </View>

      {/* LIST */}
      <FlatList
        data={wishlist}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <WishlistCard
            item={item}
            onRemove={(i: any) =>
              dispatch(toggleWishlist(i))
            }
          />
        )}
      />

    </View>
  );
}