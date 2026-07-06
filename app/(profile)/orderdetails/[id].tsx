import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function OrderDetails() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}

      <View
        style={{ backgroundColor: Colors.primary }}
        className="pt-16 pb-8 rounded-b-[35px]"
      >
        <TouchableOpacity
          className="absolute left-5 top-10"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" color="white" size={28} />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold text-center">
          Order Details
        </Text>
      </View>

      {/* Book */}

      <View className="bg-white mx-4 -mt-6 rounded-3xl p-5 shadow">
        <View className="items-center">
          <Image
            source={{
              uri: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
            }}
            className="w-32 h-44 rounded-xl"
          />

          <Text className="text-xl font-bold mt-4">Atomic Habits</Text>

          <Text className="text-gray-500">James Clear</Text>

          <View className="bg-green-100 px-4 py-2 rounded-full mt-4">
            <Text className="text-green-700 font-semibold">Delivered</Text>
          </View>
        </View>
      </View>

      {/* Order Info */}

      <Section title="Order Information">
        <Row left="Order ID" right="#ORD1025" />
        <Row left="Order Date" right="06 Jul 2026" />
        <Row left="Payment" right="Online" />
        <Row left="Total" right="₹699" />
      </Section>

      {/* Address */}

      <Section title="Delivery Address">
        <Text className="text-gray-800 font-semibold">Guri Developer</Text>

        <Text className="text-gray-500 mt-1">House No. 101,</Text>

        <Text className="text-gray-500">Jaipur, Rajasthan</Text>

        <Text className="text-gray-500">India - 302001</Text>
      </Section>

      {/* Timeline */}

      <Section title="Order Timeline">
        <Timeline title="Order Placed" active />
        <Timeline title="Packed" active />
        <Timeline title="Shipped" active />
        <Timeline title="Out for Delivery" active />
        <Timeline title="Delivered" active />
      </Section>

      {/* Payment */}

      <Section title="Payment Summary">
        <Row left="Book Price" right="₹599" />
        <Row left="Shipping" right="₹50" />
        <Row left="Discount" right="-₹100" />

        <View className="border-t border-gray-200 mt-3 pt-3">
          <Row left="Total" right="₹549" bold />
        </View>
      </Section>

      <TouchableOpacity
        className="mx-4 mb-10 rounded-xl py-4 items-center"
        style={{ backgroundColor: Colors.primary }}
      >
        <Text className="text-white font-bold">Download Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Section({ title, children }: any) {
  return (
    <View className="bg-white mx-4 mt-4 rounded-3xl p-5">
      <Text className="font-bold text-lg mb-4">{title}</Text>
      {children}
    </View>
  );
}

function Row({ left, right, bold }: any) {
  return (
    <View className="flex-row justify-between mb-3">
      <Text className="text-gray-500">{left}</Text>

      <Text className={bold ? "font-bold" : ""}>{right}</Text>
    </View>
  );
}

function Timeline({ title, active }: any) {
  return (
    <View className="flex-row items-center mb-4">
      <Ionicons
        name={active ? "checkmark-circle" : "ellipse-outline"}
        size={22}
        color={active ? "#22c55e" : "#d1d5db"}
      />

      <Text className="ml-3">{title}</Text>
    </View>
  );
}
