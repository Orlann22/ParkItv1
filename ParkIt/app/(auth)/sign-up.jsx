import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Link, router } from 'expo-router'


export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const mobileRegex = /^[0-9]{11}$/;

    if (!username.trim() || !email.trim() || !password.trim() || !mobile.trim()) {
      console.log('error');
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    if (!username.trim()) {
      Alert.alert('Validation Error', 'Username is required.');
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

    if (!mobile || !mobileRegex.test(mobile)) {
      Alert.alert('Validation Error', 'Please enter a valid 11-digit mobile number.');
      return false;
    }
    
    return true;
  }

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    
    try {
      const response = await fetch('http://192.168.82.231:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, mobile }), // Send email and password in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        Alert.alert('Success', data.message);
        router.replace('sign-in');

      } else {
        // Error, invalid credentials
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
          Sign Up
        </Text>
      </View>
      <View className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        {/* Username */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter a username"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

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
        
        {/* Mobile */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700">Mobile Number</Text>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter your phone number"
            className="mt-2 p-3 border border-gray-300 rounded-md"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-blue-500 py-3 rounded-md items-center"
        >
          <Text className="text-white text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-lg text-gray-100 font-pregular">
            Already have an account?
        </Text>
        <Link
            href="/sign-in"
            className='text-lg font-psemibold text-secondary'
        >Sign In</Link>
      </View>
    </View>
  );
}