import { Colors } from "@/constants/theme";
import "@/global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from "react-native";
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(main)',
};

export default function RootLayout() {
   const scheme = useColorScheme();


  return (

    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className=" h-10 w-100" style={{ backgroundColor: scheme === 'dark' ? Colors.darkBg : Colors.lightBg }} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(login)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar style={scheme === 'dark' ? "light" : "dark"} />
    </ThemeProvider>
 

  );
}
