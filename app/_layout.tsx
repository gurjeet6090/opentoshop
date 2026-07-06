import { Colors } from "@/constants/theme";
import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import 'react-native-reanimated';
import { Provider } from "react-redux";
import { initI18n } from "../constants/i18n";
import { initStore, store } from "../store";
export const unstable_settings = {
  anchor: '(main)',
};

export default function RootLayout() {
   const scheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await initI18n();   // Language
      await initStore();  // Cart restore
      setReady(true);
    };

    initApp();
  }, []);

  if (!ready) return null; 


  return (
 <Provider store={store}>
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
 
</Provider>
  );
}
