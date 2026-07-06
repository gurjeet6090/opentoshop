import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MyOrders() {
  const router = useRouter();

  const orders = [
    {
      id: "ORD1025",
      title: "The Psychology of Money",
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
      price: "₹499",
      date: "06 Jul 2026",
      status: "Delivered",
    },
    {
      id: "ORD1024",
      title: "Atomic Habits",
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
      price: "₹699",
      date: "04 Jul 2026",
      status: "Shipped",
    },
    {
      id: "ORD1023",
      title: "Deep Work",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
      price: "₹399",
      date: "01 Jul 2026",
      status: "Processing",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}

      <View
        className="pt-16 pb-10 rounded-b-3xl"
        style={{ backgroundColor: Colors.primary }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5 top-16"
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <View className="items-center">
          <Ionicons name="bag-handle" size={45} color="white" />

          <Text className="text-white text-2xl font-bold mt-3">My Orders</Text>

          <Text className="text-indigo-100">Track your purchased books</Text>
        </View>
      </View>

      {/* Orders */}

      <View className="px-4 mt-6 mb-8">
        {orders.map((item) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </View>
    </ScrollView>
  );
}

function OrderCard({ order }: any) {
  const router = useRouter();
  const statusColors = {
    Delivered: "#22c55e",
    Shipped: "#3b82f6",
    Processing: "#f59e0b",
    Cancelled: "#ef4444",
  } as const;

  const color = statusColors[order.status as keyof typeof statusColors];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white rounded-xl px-3 py-3 mb-3 border border-gray-200"
    >
      <View className="flex-row">
        <Image source={{ uri: order.image }} className="w-14 h-20 rounded-lg" />

        <View className="flex-1 ml-3 justify-between">
          {/* Top */}
          <View className="flex-row justify-between items-start">
            <Text
              numberOfLines={1}
              className="flex-1 text-base font-semibold text-gray-900 pr-2"
            >
              {order.title}
            </Text>

            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: color + "20" }}
            >
              <Text
                className="text-[11px] font-semibold"
                style={{ color: color }}
              >
                {order.status}
              </Text>
            </View>
          </View>

          {/* Middle */}
          <Text className="text-xs text-gray-500 mt-1">{order.id}</Text>

          {/* Bottom */}
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-xs text-gray-400">{order.date}</Text>

            <Text className="font-bold" style={{ color: Colors.primary }}>
              {order.price}
            </Text>
          </View>
        </View>
      </View>

      <View className="border-t border-gray-100 mt-3 pt-2 flex-row justify-between items-center">
        <TouchableOpacity
          className="bg-white shadow-md py-2 px-4 rounded-lg"
          onPress={() => router.push(`/orderdetails/${order.id}` as any)}
        >
          <Text className="font-medium" style={{ color: Colors.primary }}>
            View Details
          </Text>
        </TouchableOpacity>

        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}
