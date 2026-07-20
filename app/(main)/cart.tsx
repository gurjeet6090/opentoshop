import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useDispatch } from "react-redux";

import { Colors } from "@/constants/theme";

import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../store/cartSlice";
import { CartItemtype, useCartSelector } from "../../store/hook";

/* --------------- COMPONENT --------------- */

export default function Cart() {
  const dispatch = useDispatch();

  const cartObj = useCartSelector((state) => state.cart.items);

  // Convert object → array
  const cart: CartItemtype[] = Object.values(cartObj);

  /* Quantity Handler */
  const updateQty = (id: string, type: "add" | "sub"): void => {
    if (type === "add") {
      dispatch(increaseQty(id));
    } else {
      dispatch(decreaseQty(id));
    }
  };

  /* Remove Item */
  const removeItem = (id: string): void => {
    dispatch(removeFromCart(id));
  };

  const total: number = Number(
    cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2),
  );

  if (cart.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Ionicons name="cart-outline" size={70} color="#999" />

        <Text className="mt-4 text-lg text-gray-500">Your cart is empty</Text>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={{ backgroundColor: Colors.primary }}
          className="mt-6 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* ================= HEADER ================= */}
      <View className="bg-white px-5 py-4 shadow-sm">
        <View className="flex-row gap-5">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) router.back();
            }}
            className="justify-center"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>

          <Text className="text-2xl font-bold">My Cart</Text>

          <Text className="flex-1 text-right text-gray-500 mt-1">
            {cart.length} items
          </Text>
        </View>
      </View>

      {/* ================= LIST ================= */}
      <FlatList<CartItemtype>
        data={cart}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl mb-2 px-3 py-2 shadow flex-row">
            {/* Image */}
            <Image
              source={{ uri: item?.thumbnail }}
              className="w-20 h-20 rounded-xl"
              resizeMode="contain"
            />

            {/* Info */}
            <View className="flex-1 ml-3 justify-between">
              <View>
                <Text numberOfLines={1} className="font-semibold text-gray-800">
                  {item.title}
                </Text>

                <Text
                  style={{ color: Colors.primary }}
                  className="font-bold mt-1"
                >
                  ₹{item.price}
                </Text>
              </View>

              {/* Quantity */}
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => updateQty(item.id, "sub")}
                  className="bg-gray-200 p-1.5 rounded-full"
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>

                <Text className="mx-3 font-bold">{item.qty}</Text>

                <TouchableOpacity
                  onPress={() => updateQty(item.id, "add")}
                  className="bg-gray-200 p-1.5 rounded-full"
                >
                  <Ionicons name="add" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delete */}
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              className="justify-center"
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ================= FOOTER ================= */}
      <View className="bg-white px-5 py-2 border-t border-gray-200">
        {/* Summary */}
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Subtotal</Text>

          <Text className="font-bold">₹{total}</Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-500">Delivery</Text>

          <Text className="font-bold text-green-600">Free</Text>
        </View>

        {/* Total */}
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-bold">Total</Text>

          <Text className="text-lg font-bold" style={{ color: Colors.primary }}>
            ₹{total}
          </Text>
        </View>

        {/* Checkout */}
        <TouchableOpacity
          style={{ backgroundColor: Colors.primary }}
          className="py-4 rounded-xl items-center mb-1"
          activeOpacity={0.85}
        >
          <Text className="text-white font-bold text-lg">
            Proceed to Checkout →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
