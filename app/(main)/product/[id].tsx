import { useEffect, useState } from "react";

import {
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Animated, {
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";

import { addToCart, decreaseQty, increaseQty } from "../../../store/cartSlice";

import { useDispatch } from "react-redux";
import { useCartSelector } from "../../../store/hook";
import { toggleWishlist } from "../../../store/wishlistSlice";

/* ---------------- CONFIG ---------------- */

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 380;

/* ---------------- TYPES ---------------- */

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  description: string;
  discountPercentage: number;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  seller: string;
}

/* ---------------- SCREEN ---------------- */

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const dispatch = useDispatch();

  const scrollY = useSharedValue(0);
  const scaleBtn = useSharedValue(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setproduct] = useState<Product>();

  /* ---------------- DEMO DATA ---------------- */

  useEffect(() => {
    fetch("https://dummyjson.com/products/" + id)
      .then((data) => data.json())
      .then((data) => {
        setproduct(data);
      });
  }, [id]);

  /* ---------------- REDUX ---------------- */

  const cartItem = useCartSelector(
    (state) => state.cart.items[product?.id ?? 0],
  );

  const isWished = useCartSelector(
    (state) => state.wishlist.items[product?.id ?? 0],
  );

  /* ---------------- SCROLL HANDLER ---------------- */

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  /* ---------------- PARALLAX IMAGE ---------------- */

  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0, 300], [1.3, 1, 1]);

    const translateY = interpolate(scrollY.value, [0, 300], [0, -120]);

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  /* ---------------- HEADER FADE ---------------- */

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 180], [0, 1]);

    return { opacity };
  });

  /* ---------------- CTA BUTTON ---------------- */

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBtn.value }],
  }));

  /* ---------------- HANDLERS ---------------- */
  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  const add = () => {
    dispatch(addToCart(product));
  };

  const inc = () => dispatch(increaseQty(product.id));
  const dec = () => dispatch(decreaseQty(product.id));

  const toggleWish = () =>
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.images[0],
      }),
    );

  /* ---------------- UI ---------------- */
  const disprice = Math.round(
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price,
  );

  return (
    <View className="flex-1 bg-white">
      {/* ================= FLOAT HEADER ================= */}
      <Animated.View
        style={headerStyle}
        className="absolute top-0 left-0 right-0 z-20 bg-white pt-4 pb-4 px-4 pb-3 shadow shadow-[0px_0px_16px_5px_gray]"
      >
        <View className=" z-10 flex-row justify-between">
          <TouchableOpacity
            onPress={router.back}
            className="bg-white/90  rounded-full"
          >
            <Ionicons name="arrow-back" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <Text className="text-lg font-bold">{product.title}</Text>
          <TouchableOpacity
            onPress={toggleWish}
            className="bg-white/90  rounded-full"
          >
            <Ionicons
              name={isWished ? "heart" : "heart-outline"}
              size={22}
              color={isWished ? "red" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ================= MAIN ================= */}

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= IMAGE SLIDER ================= */}

        <View className="overflow-hidden">
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInUp}
                style={{ width, height: IMAGE_HEIGHT }}
              >
                <Animated.Image
                  source={{ uri: item }}
                  style={[{ width, height: IMAGE_HEIGHT }, imageStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            )}
          />

          <View className="absolute bottom-6 self-center flex-row">
            {product.images.map((_, i) => (
              <View
                key={i}
                className={`h-2 w-4 mx-1 rounded-full`}
                style={{
                  backgroundColor:
                    i === activeIndex ? Colors.primary : "#C2C2C2",
                }}
              />
            ))}
          </View>
          {/* Header Buttons */}

          <View className="absolute top-5 left-4 right-4 z-10 flex-row justify-between">
            <TouchableOpacity
              onPress={router.back}
              className="bg-white/90 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={26} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleWish}
              className="bg-white/90 p-2 rounded-full"
            >
              <Ionicons
                name={isWished ? "heart" : "heart-outline"}
                size={22}
                color={isWished ? "red" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= CONTENT ================= */}

        <Animated.View
          entering={FadeInDown.delay(100)}
          className="bg-white rounded-t-3xl -mt-6 px-5 pt-6 pb-36"
        >
          {/* Title */}

          <Text className="text-2xl font-bold">{product.title}</Text>

          <Text className="text-gray-500 mt-1">{product.brand}</Text>

          {/* Rating */}

          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#facc15" />

            <Text className="ml-1 text-sm text-gray-600">
              {product.rating} (2.4k Reviews)
            </Text>
          </View>

          {/* Price */}

          <View className="flex-row items-center mt-3">
            {product.discountPercentage ? (
              <View>
                <Text
                  style={{ color: Colors.primary }}
                  className="text-2xl font-bold"
                >
                  ₹
                  {(
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  ).toFixed(0)}
                </Text>

                <Text className="ml-3 text-gray-400 line-through">
                  ₹{product.price}
                </Text>
              </View>
            ) : (
              <Text
                style={{ color: Colors.primary }}
                className="text-2xl font-bold"
              >
                ₹{product.price}
              </Text>
            )}
          </View>
          {/* Quantity */}
          {cartItem && (
            <View className="flex-row items-center mt-6">
              <Text className="text-lg font-semibold mr-4">Quantity</Text>

              <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-1">
                <TouchableOpacity onPress={dec}>
                  <Ionicons name="remove" size={20} />
                </TouchableOpacity>

                <Text className="mx-4 font-bold">{cartItem.qty}</Text>

                <TouchableOpacity onPress={inc}>
                  <Ionicons name="add" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Highlights */}

          <View className="mt-6 bg-gray-50 p-4 rounded-xl">
            {[
              "Active Noise Cancellation",
              "40H Battery Life",
              "Bluetooth 5.3",
              "Fast Charging",
            ].map((f, i) => (
              <View key={i} className="flex-row items-center mb-2">
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={Colors.primary}
                />

                <Text className="ml-2 text-gray-600">{f}</Text>
              </View>
            ))}
          </View>

          {/* Description */}

          <Text className="mt-6 text-lg font-bold">Description</Text>

          <Text className="text-gray-600 leading-6 mt-2">
            {product.description}
          </Text>
        </Animated.View>
      </Animated.ScrollView>

      {/* ================= SMART BOTTOM BAR ================= */}

      <View className="absolute bottom-0 left-0 right-0 bg-white shadow shadow-[0px_0px_16px_5px_gray] px-5 py-3 flex-row items-center">
        <View className="flex-1">
          <Text className="text-gray-500 text-xs">Total</Text>

          <Text style={{ color: Colors.primary }} className="text-xl font-bold">
            ₹{cartItem ? cartItem.qty * disprice : disprice}
          </Text>
        </View>

        {/* CTA BUTTON */}

        <Animated.View style={btnStyle}>
          <TouchableOpacity
            onPress={() => {
              scaleBtn.value = withSpring(0.9, {}, () => {
                scaleBtn.value = withSpring(1);
              });

              if (!cartItem) add();
              else router.push("/cart");
            }}
            style={{ backgroundColor: Colors.primary }}
            className="px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-bold text-base">
              {!cartItem ? "Add to Cart" : "Go to Cart"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
