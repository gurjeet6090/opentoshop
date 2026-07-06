import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ManageAddress() {
  const router = useRouter();

  const addresses = [
    {
      id: 1,
      type: "Home",
      default: true,
      name: "Guri Developer",
      phone: "+91 9876543210",
      address: "221, Sector 15, Vaishali Nagar, Jaipur, Rajasthan - 302021",
    },
    {
      id: 2,
      type: "Work",
      default: false,
      name: "Guri Developer",
      phone: "+91 9876543210",
      address: "Business Park, Tonk Road, Jaipur, Rajasthan - 302018",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}

      <View
        style={{ backgroundColor: Colors.primary }}
        className="pt-16 pb-8 px-5 rounded-b-[30px]"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold">Manage Address</Text>

          <View style={{ width: 26 }} />
        </View>

        <Text className="text-indigo-100 mt-2">
          {addresses.length} Saved Addresses
        </Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Add Address */}

        <TouchableOpacity
          onPress={() => {
            router.push("/edit-address/0" as any);
          }}
          activeOpacity={0.8}
          className="bg-white rounded-2xl p-4 mt-5 mb-4 flex-row items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <Ionicons name="add-circle" size={24} color={Colors.primary} />

          <Text
            className="ml-2 font-semibold text-base"
            style={{ color: Colors.primary }}
          >
            Add New Address
          </Text>
        </TouchableOpacity>

        {/* Address List */}

        {addresses.map((item) => (
          <AddressCard key={item.id} item={item} />
        ))}

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

function AddressCard({ item }: any) {
  return (
    <View
      className="bg-white rounded-3xl p-5 mb-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      {/* Top */}

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: "#EEF2FF" }}
          >
            <Ionicons
              name={item.type === "Home" ? "home" : "business"}
              size={22}
              color={Colors.primary}
            />
          </View>

          <View className="ml-3">
            <Text className="font-bold text-lg">{item.type}</Text>

            <Text className="text-gray-500">{item.name}</Text>
          </View>
        </View>

        {item.default && (
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-semibold">
              Default
            </Text>
          </View>
        )}
      </View>

      {/* Address */}

      <View className="mt-4">
        <Text className="text-gray-700 leading-6">{item.address}</Text>

        <Text className="text-gray-500 mt-2">{item.phone}</Text>
      </View>

      {/* Actions */}

      <View className="flex-row mt-5 border-t border-gray-100 pt-4">
        <TouchableOpacity
          onPress={() => {
            router.push(`/edit-address/${item.id}` as any);
          }}
          className="flex-1 flex-row justify-center items-center"
        >
          <Ionicons name="create-outline" size={20} color={Colors.primary} />

          <Text className="ml-2 font-medium" style={{ color: Colors.primary }}>
            Edit
          </Text>
        </TouchableOpacity>

        <View className="w-px bg-gray-200" />

        <TouchableOpacity className="flex-1 flex-row justify-center items-center">
          <Ionicons name="trash-outline" size={20} color="#EF4444" />

          <Text className="ml-2 text-red-500 font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
