import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { Text, TextInput, TouchableOpacity, View, Alert, BackHandler } from 'react-native';
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email.trim() || !password.trim()) {
      console.log('error');
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }

    if (!password || !passwordRegex.test(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 8 characters long and include both letters and numbers.'
      );
      return false;
    }
    
    return true;
  }

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch('http://192.168.82.231:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save session info to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(data.user));
        Alert.alert('Success', data.message);
        router.replace('home');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View className="flex-1 w-full h-full bg-black justify-center items-center p-4">
       <View className="justify-center pb-5 flex-row gap-2">
        <Text className="text-3xl text-gray-100 font-psemibold">
          Log In
        </Text>
      </View>
      <View className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        {/* Email */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-blue-500 py-3 rounded-md items-center"
        >
          <Text className="text-white text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>

      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular">
          Don't have an account?
        </Text>
        <Link
          href="/sign-up"
          className='text-lg font-psemibold text-secondary'
        >Sign Up</Link>
      </View>
    </View>
  );
}