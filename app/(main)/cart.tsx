import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

/* Dummy Cart Data */
const cartData = [
  {
    id: "1",
    name: "Nike Air Zoom",
    price: 2999,
    qty: 1,
    img: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 1999,
    qty: 2,
    img: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
  },
];

export default function Cart() {
  const [cart, setCart] = useState(cartData);

  /* Quantity Handler */
  const updateQty = (id: string, type: "add" | "sub") => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        let q = item.qty;

        if (type === "add") q++;
        if (type === "sub" && q > 1) q--;

        return { ...item, qty: q };
      }

      return item;
    });

    setCart(updated);
  };

  /* Remove Item */
  const removeItem = (id: string) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  /* Total */
  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <View className="flex-1 bg-gray-100">

      {/* Header */}
      <View className="bg-white px-5 py-4 shadow-sm">
       <View className="flex-row  gap-5 ">
        <TouchableOpacity onPress={() => { router.back();}} className="justify-center">
        <Ionicons name="arrow-back" size={24} color={Colors.primary} className="self-center mb-2" />
      </TouchableOpacity>
        <Text className="text-2xl font-bold">
          My Cart
        </Text>
 <Text className="self-center flex-1   text-right text-gray-500 mt-1">
          {cart.length} items
        </Text>

        </View>
          
     

      </View>

      {/* Cart List */}
      <FlatList
        data={cart}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}

        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl mb-4 p-3 shadow flex-row">

            {/* Image */}
            <Image
              source={{ uri: item.img }}
              className="w-20 h-20 rounded-xl"
              resizeMode="contain"
            />

            {/* Info */}
            <View className="flex-1 ml-3 justify-between">

              <View>

                <Text
                  numberOfLines={1}
                  className="font-semibold text-gray-800"
                >
                  {item.name}
                </Text>

                <Text style={{ color: Colors.primary }} className="font-bold mt-1">
                  ₹{item.price}
                </Text>

              </View>

              {/* Quantity */}
              <View className="flex-row items-center">

                <TouchableOpacity
                  onPress={() =>
                    updateQty(item.id, "sub")
                  }
                  className="bg-gray-200 p-1.5 rounded-full"
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>

                <Text className="mx-3 font-bold">
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    updateQty(item.id, "add")
                  }
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
              <Ionicons
                name="trash-outline"
                size={20}
                color="#ef4444"
              />
            </TouchableOpacity>

          </View>
        )}
      />

      {/* Checkout Bar */}
      <View className="bg-white px-5 py-4 border-t border-gray-200">

        {/* Summary */}
        <View className="flex-row justify-between mb-2">

          <Text className="text-gray-500">
            Subtotal
          </Text>

          <Text className="font-bold">
            ₹{total}
          </Text>

        </View>

        <View className="flex-row justify-between mb-4">

          <Text className="text-gray-500">
            Delivery
          </Text>

          <Text className="font-bold text-green-600">
            Free
          </Text>

        </View>

        {/* Total */}
        <View className="flex-row justify-between mb-4">

          <Text className="text-lg font-bold">
            Total
          </Text>

          <Text className="text-lg font-bold " style={{ color: Colors.primary }}>
            ₹{total}
          </Text>

        </View>

        {/* Checkout Button */}
        <TouchableOpacity
        style={{ backgroundColor: Colors.primary }}
          className=" py-4 rounded-xl items-center mb-20"
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
