import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const categories = [
  {
    id: "1",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "2",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "3",
    name: "Shoes",
    img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: "4",
    name: "Watches",
    img: "https://titanworld.com/cdn/shop/files/1802KM01_1_837a07e8-b3c1-46d3-a81c-efb2e969584d.jpg?v=1706547481",
  },
    {
    id: "5",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "6",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
];

export default function CategoryList() {
  return (
    <View className="mt-6">

      <Text className="text-lg font-bold mb-3">
        Shop by Category
      </Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <TouchableOpacity className="mr-4 items-center">

            <View className="bg-gray-100 p-1 rounded-md">

              <Image
                source={{ uri: item.img }}
                className="w-[4.5rem] h-16 rounded-md"
              />

            </View>

            <Text className="mt-2 text-sm font-medium">
              {item.name}
            </Text>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}
