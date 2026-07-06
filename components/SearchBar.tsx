import {
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-1 mt-1 flex-1">

      {/* Search Icon */}
      

      {/* Input */}
      <TextInput
        placeholder="Search products..."
         placeholderTextColor="#9CA3AF"
        className="flex-1 text-gray-500"
      />

      {/* Voice */}
      <TouchableOpacity>
       <Ionicons name="search" size={20} color="gray" />
      </TouchableOpacity>

    </View>
  );
}
