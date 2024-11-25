import { View, Text } from 'react-native'
import React from 'react'
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";

import "../global.css";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Henry-Black": require("../assets/fonts/Henry-Black.ttf"),
    "Henry-Bold": require("../assets/fonts/Henry-Bold.ttf"),
    "Henry-Medium": require("../assets/fonts/Henry-Medium.ttf"),
    "Henry-Regular": require("../assets/fonts/Henry-Regular.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
});

useEffect(() => {
  if(error) throw error;

  if(fontsLoaded) SplashScreen.hideAsync();
}, [fontsLoaded, error])

if(!fontsLoaded && !error) return null;

  return (
    <>
      <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="forgot" options={{ headerShown: false }} />
          <Stack.Screen name="parking" options={{ headerShown: false }} />
          <Stack.Screen name="payment" options={{ headerShown: false }} />
          <Stack.Screen name="reservation" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#C8DEFF" style="dark"/>
    </>
  )
}

export default RootLayout