import {
  Dimensions,
  FlatList,
  Image,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");

const banners = [
  { id: "1", img: "https://plus.unsplash.com/premium_photo-1728970536937-f6a4ae97573d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "2", img: "https://plus.unsplash.com/premium_photo-1728970536941-955336bd7ef9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "3", img: "https://plus.unsplash.com/premium_photo-1728970537046-2a09c340c8cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function BannerSlider() {
  const sliderRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  /* Auto Play */
  useEffect(() => {
    const timer = setInterval(() => {
      let next = index + 1;

      if (next >= banners.length) {
        next = 0;
      }

      sliderRef.current?.scrollToIndex({
        index: next,
        animated: true,
      });

      setIndex(next);
    }, 3000); // 3 sec

    return () => clearInterval(timer);
  }, [index]);

  return (
    <View>

      <FlatList
        ref={sliderRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}

        onMomentumScrollEnd={(e) => {
          const i = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(i);
        }}

        renderItem={({ item }) => (
          <Image
            source={{ uri: item.img }}
            style={{
              width: width ,
              height: 150,
              objectFit: "fill",
              
              
            }}
          />
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center mt-2">

        {banners.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-2 mx-1 rounded-lg `}

              style={{
              backgroundColor: index === i ? Colors.primary : "rgba(0,0,0,0.3)",
            }}
          />
        ))}

      </View>

    </View>
  );
}
