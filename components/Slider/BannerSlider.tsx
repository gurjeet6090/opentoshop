import { Dimensions, FlatList, Image, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "3",
    img: "https://as1.ftcdn.net/v2/jpg/03/14/28/96/1000_F_314289607_ADADbnGr64dpGnddyhZPidCoc6jgKiHK.jpg",
  },

  {
    id: "2",
    img: "https://as2.ftcdn.net/v2/jpg/03/14/29/31/1000_F_314293121_OMI97gmYC7I0lECkLyZpn30Pf3NYYABn.jpg",
  },

  {
    id: "4",
    img: "https://as1.ftcdn.net/v2/jpg/20/00/89/30/1000_F_2000893066_4cdHqODLLbKbC30gd2tL5sCVvqbfm8gQ.jpg",
  },
  {
    id: "1",
    img: "https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465248_FiKUDwScNZ1N5OoVncuiabtKsJqfWSWj.jpg",
  },
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
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.img }}
            style={{
              width: width,
              height: 160,
              objectFit: "cover",
            }}
          />
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center mt-2">
        {banners.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-4 mx-1 rounded-lg `}
            style={{
              backgroundColor:
                index === i ? Colors.primary : "rgba(73, 73, 73, 0.3)",
            }}
          />
        ))}
      </View>
    </View>
  );
}
