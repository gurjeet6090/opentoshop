import SearchComponent from "@/components/SearchComponent";
import { Colors } from "@/constants/theme";
import { Ionicons as Iconsar, Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

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
  {
    id: "7",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "8",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "9",
    name: "Shoes",
    img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: "10",
    name: "Watches",
    img: "https://titanworld.com/cdn/shop/files/1802KM01_1_837a07e8-b3c1-46d3-a81c-efb2e969584d.jpg?v=1706547481",
  },
  {
    id: "11",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "12",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "13",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "14",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "15",
    name: "Shoes",
    img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: "16",
    name: "Watches",
    img: "https://titanworld.com/cdn/shop/files/1802KM01_1_837a07e8-b3c1-46d3-a81c-efb2e969584d.jpg?v=1706547481",
  },
  {
    id: "17",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "18",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "19",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "20",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "21",
    name: "Shoes",
    img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: "22",
    name: "Watches",
    img: "https://titanworld.com/cdn/shop/files/1802KM01_1_837a07e8-b3c1-46d3-a81c-efb2e969584d.jpg?v=1706547481",
  },
  {
    id: "23",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "24",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "25",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "26",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
  {
    id: "27",
    name: "Shoes",
    img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg",
  },
  {
    id: "28",
    name: "Watches",
    img: "https://titanworld.com/cdn/shop/files/1802KM01_1_837a07e8-b3c1-46d3-a81c-efb2e969584d.jpg?v=1706547481",
  },
  {
    id: "29",
    name: "Mobiles",
    img: "https://darlingretail.com/cdn/shop/files/iPhone_15_Blue_Pure_Back_iPhone_15_Blue_Pure_Front_2up_Screen__WWEN_800x.jpg?v=1695103868",
  },
  {
    id: "30",
    name: "Laptop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTog5mWGOg1IJgtCoCnXZYYTgfle4W8_8O5ig&s",
  },
];

export default function AllCategories() {
  const itemCount = useSelector((state: any) =>
    Object.values(state.cart.items).reduce(
      (sum: number, item: any) => sum + item.qty,
      0,
    ),
  );
  const [searchVisible, setSearchVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 60;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  return (
    <View className="bg-white">
      <SearchComponent
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
      />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: HEADER_HEIGHT,
          transform: [{ translateY }],
        }}
        className="bg-white px-5 py-5 shadow-sm"
      >
        <View className="flex-row justify-between items-center w-full gap-4">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) router.back();
            }}
            className="justify-center"
          >
            <Iconsar name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>

          <Text className="text-2xl font-bold flex-1">Categories</Text>
          <View className="flex-row gap-3 mr-3 items-end">
            <TouchableOpacity onPress={() => setSearchVisible(true)}>
              <Ionicons name="search" size={25} color="#929292" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(main)/cart")}>
              <View>
                {/* Cart Icon */}

                <Ionicons name="cart-outline" size={24} color="#929292" />

                {/* Badge */}
                {itemCount > 0 && (
                  <View
                    style={{ backgroundColor: Colors.primary }}
                    className="absolute -top-2 -right-2  rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
                  >
                    <Text className="text-white text-xs font-bold">
                      {itemCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View className=" px-4 ">
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          data={categories}
          numColumns={4}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 70,

            paddingTop: HEADER_HEIGHT + 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mr-4 items-center mb-4"
              onPress={() => {
                router.push({
                  pathname: `/cat-products/[id]`,
                  params: {
                    id: item.name,
                  },
                });
              }}
            >
              <View className="bg-gray-100 p-1 rounded-md">
                <Image
                  source={{ uri: item.img }}
                  className="w-[4.7rem] h-[4.7rem] rounded-md"
                />
              </View>

              <Text className="mt-2 text-sm font-medium">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
