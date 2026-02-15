import { Stack } from 'expo-router';
import React from 'react';

import CustomTab from '@/components/CustomTabBar';


export default function TabLayout() {
  

  return (

   <>
      <Stack screenOptions={{ 
         headerShown: false,
         animation:"fade_from_bottom"
          
      }} />
      <CustomTab />
    </>
  
 
  );
}
