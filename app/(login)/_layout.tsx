import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {

  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'slide_from_bottom',}}
      >
      <Stack.Screen name="index" options={{animation:"slide_from_left"}} />
      <Stack.Screen name="register" options={{animation:"slide_from_bottom"}} />
    </Stack>
  );
}
