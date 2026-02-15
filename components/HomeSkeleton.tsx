import { View } from "react-native";

export default function HomeSkeleton() {
  return (
    <View className="px-4 mt-4 bg-white flex-1">

      {/* Banner */}
      <View className="h-40 bg-gray-200 rounded-2xl mb-6 animate-pulse mt-6" />

      {/* Categories */}
      <View className="flex-row mb-6">
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            className="h-20 w-20 bg-gray-200 rounded-xl mr-3 animate-pulse"
          />
        ))}
      </View>

      {/* Products */}
      <View className="flex-row flex-wrap justify-between">

        {[1, 2, 3, 4,5,6].map((i) => (
          <View
            key={i}
            className="w-[32%] h-52 bg-gray-200 rounded-2xl mb-4 animate-pulse"
          />
        ))}

      </View>

    </View>
  );
}
