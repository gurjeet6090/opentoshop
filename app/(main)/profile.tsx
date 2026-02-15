import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-gray-100">

      {/* Header */}
      <View className=" pt-16 pb-10 rounded-b-3xl" style={{ backgroundColor: Colors.primary }}>

        {/* Profile Pic */}
        <View className="items-center">

          <View className="relative">

            <Image
              source={{
                uri: "https://i.imgur.com/0y8Ftya.png",
              }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />

            {/* Edit */}
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
            >
              <Ionicons
                name="camera"
                size={16}
                color="#4f46e5"
              />
            </TouchableOpacity>

          </View>

          <Text className="text-white text-xl font-bold mt-3">
            Guri Developer
          </Text>

          <Text className="text-indigo-100">
            guridev@gmail.com
          </Text>

        </View>

      </View>

      {/* Stats */}
      <View className="bg-white mx-4 -mt-6 rounded-2xl shadow flex-row justify-around py-4">
        <Stat title="Orders" value="24" />
        <Stat title="Wishlist" value="12" />
        <Stat title="Coupons" value="5" />

      </View>

      {/* Menu */}
      <View className="mt-6 px-4">

        <MenuItem
          icon="person-outline"
          title="Edit Profile"
        />

        <MenuItem
          icon="bag-outline"
          title="My Orders"
        />

        <MenuItem
          icon="heart-outline"
          title="Wishlist"
        />

        <MenuItem
          icon="location-outline"
          title="Manage Address"
        />

        <MenuItem
          icon="card-outline"
          title="Payment Methods"
        />

        <MenuItem
          icon="settings-outline"
          title="Settings"
        />

        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
        />

      </View>

      {/* Logout */}
      <View className="px-4 my-6 mb-20">

        <TouchableOpacity
          className="bg-red-500 py-4 rounded-xl items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">
            Logout
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

/* ---------------- Components ---------------- */

function Stat({ title, value }: any) {
  return (
    <View className="items-center">

      <Text className="text-xl font-bold text-gray-800">
        {value}
      </Text>

      <Text className="text-gray-400 text-sm">
        {title}
      </Text>

    </View>
  );
}

function MenuItem({ icon, title }: any) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl mb-3 px-4 py-4 flex-row items-center justify-between shadow-sm"
      activeOpacity={0.7}
    >

      <View className="flex-row items-center">

        <View className=" p-2 rounded-full mr-3" style={{ backgroundColor: Colors.lightBg }}>

          <Ionicons
            name={icon}
            size={20}
            color={Colors.primary}
          />

        </View>

        <Text className="text-gray-800 font-medium">
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#94a3b8"
      />

    </TouchableOpacity>
  );
}
