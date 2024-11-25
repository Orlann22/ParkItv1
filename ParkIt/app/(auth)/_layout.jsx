import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar'
import '../../global.css'


const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='sign-in' options={{ headerShown: false}}/>
        <Stack.Screen name='sign-up' options={{ headerShown: false}}/>
      </Stack>
    
      <StatusBar backgroundColor="#0F2FEB" style="light"/>
    </>
  )
}

export default AuthLayout