import {
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";

import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

export default function FeaturedSlider({ data }: any) {

  const dataitems= data.filter((item: any) => item.id >10 && item.id <16);
  return (
    <View className="mt-6">

      {/* Title */}
      <View className="flex-row justify-between items-center mb-3">

        <Text className="text-lg font-bold">
        Featured Products
        </Text>

        <Text className="text-gray-600 text-sm">
          View All
        </Text>

      </View>

      {/* Slider */}
      <FlatList
        data={dataitems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}

      
        decelerationRate="fast"
        snapToAlignment="start"

      

        renderItem={({ item }) => (
          
          <View style={{ width: width * 0.35, marginRight: 10 }}>
            <ProductCard item={item} />
          </View>
        )}
      />

    </View>
  );
}
