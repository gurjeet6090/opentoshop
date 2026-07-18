import { Text, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Entypo";
import { usePathname, useRouter } from "expo-router";

import { useEffect } from "react";

import { Colors } from "@/constants/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

/* Routes where tab is visible */
const TAB_ROUTES = [
  "/home",
  "/profile",
  "/shop",
  "/wishlist",
  "/allcategories",
];

const TabNames = {
  1: { name: "Home", icon: "home", route: "/home" },
  2: { name: "Shop", icon: "shop", route: "/shop" },
  3: { name: "Categories", icon: "shop", route: "/allcategories" },
  5: { name: "Wishlist", icon: "heart", route: "/wishlist" },
  6: { name: "Account", icon: "user", route: "/profile" },
};

export default function CustomTab() {
  const router = useRouter();
  const path = usePathname();

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (!TAB_ROUTES.includes(path)) {
      translateY.value = withTiming(120);
    } else {
      translateY.value = withTiming(0);
    }
  }, [path, translateY]);

  /* Tab Style */
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const hide = () => {
    translateY.value = withTiming(120);
  };

  const show = () => {
    translateY.value = withTiming(0);
  };

  (globalThis as any).tabBar = { hide, show };

  return (
    <Animated.View
      style={[animStyle, { backgroundColor: Colors.lightBg }]}
      className="absolute bottom-0 left-0 right-0  border-t border-gray-200 flex-row justify-around py-3"
    >
      {TabNames &&
        Object.values(TabNames).map((t: any) => (
          <TabBtn
            key={t.route}
            icon={t.icon}
            label={t.name}
            active={path === t.route}
            onPress={() => {
              if (path === t.route) {
                return;
              }
              router.push(t.route);
            }}
          />
        ))}
    </Animated.View>
  );
}

/* Button */

function TabBtn({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center flex-1"
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? Colors.primary : "#94a3b8"}
      />

      <Text
        className={`text-xs ${active ? "font-bold" : "text-gray-400"}`}
        style={{ color: active ? Colors.primary : "#94a3b8" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
