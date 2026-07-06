import { Stack } from "expo-router";

import CustomTab from "@/components/Tab/CustomTabBar";

export default function TabLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="cart" />
      </Stack>
      <CustomTab />
    </>
  );
}
