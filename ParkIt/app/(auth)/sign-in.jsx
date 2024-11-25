import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { Text, TextInput, TouchableOpacity, View, Alert, BackHandler, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { images, icons } from '../../constants'
import FormField from '../../components/FormField';



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
        handleLoginSuccess();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const navigation = useNavigation();

  const handleLoginSuccess = () => {
    // Reset the entire stack and set 'home' as the new root
    navigation.reset({
      index: 0,
      routes: [{ name: 'home' }],
    });
  };

  // <View className="flex-1 w-full h-full bg-[#0F2FEB] justify-center items-center p-4">
  //    <View className="justify-center pb-5 flex-row gap-2">
  //     <Text className="text-3xl text-gray-100 font-psemibold">
  //       Log In
  //     </Text>
  //   </View>
  //   <View className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
  //     {/* Email */}
  //     <View className="mb-4">
  //       <Text className="text-lg text-gray-700">Email</Text>
  //       <TextInput
  //         value={email}
  //         onChangeText={setEmail}
  //         placeholder="Enter your email"
  //         keyboardType="email-address"
  //         className="mt-2 p-3 border border-gray-300 rounded-md"
  //       />
  //     </View>
  
  //     {/* Password */}
  //     <View className="mb-4">
  //       <Text className="text-lg text-gray-700">Password</Text>
  //       <TextInput
  //         value={password}
  //         onChangeText={setPassword}
  //         placeholder="Enter your password"
  //         secureTextEntry={true}
  //         className="mt-2 p-3 border border-gray-300 rounded-md"
  //       />
  //     </View>
  
  //     {/* Login Button */}
  //     <TouchableOpacity
  //       onPress={handleSignIn}
  //       className="bg-blue-500 py-3 rounded-md items-center"
  //     >
  //       <Text className="text-white text-lg">Sign In</Text>
  //     </TouchableOpacity>
  //   </View>
  
  //   <View className="justify-center pt-5 flex-row gap-2">
  //     <Text className="text-lg text-gray-100 font-pregular">
  //       Don't have an account?
  //     </Text>
  //     <Link
  //       href="/sign-up"
  //       className='text-lg font-psemibold text-secondary'
  //     >Sign Up</Link>
  //   </View>
  // </View>
  return (
    <SafeAreaView className="bg-[#0F2FEB] h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View classname="w-full justify-center items-center h-full px-4">
          <View className="w-full relative items-center justify-center" >
            <TouchableOpacity
              className="absolute left-[16px] top-[25px]"
            >
            <Image
              source={icons.leftArrow}
              classname="w-6 h-6"
              resizeMode='contain'
            />
            </TouchableOpacity>
            <Image 
              source={images.logoSmall}
              className="w-[129px] h-[52] mb-[20px] mt-[20px]"
              resizeMode='contain'
            />
          </View>
          <View 
            // style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%', maxWidth: 400, marginTop: 30 }}
            className="bg-white rounded-[30px] w-full h-full px-4 relative"
          >
            <Text className="text-[32px] font-hbold text-black text-center mt-[40px]">
              Login
            </Text>
            <Text className="text-[15px] font-hregular text-black mt-3 text-center">
              Start your parking journey!
            </Text>
            <View className="mt-[40px]">
            <FormField 
              title={'Email address'}
              placeholder={'Input email address'}
            />
            <FormField 
              title={'Password'}
              placeholder={'Input your password'}
              otherStyles={'pt-5'}
            />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


      // style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F2FEB'}}



//        <Text style={{ fontSize: 20, color: '#333' }}>Log In</Text>

        // {/* Email Input */}
        // <TextInput
        //   value={email}
        //   onChangeText={setEmail}
        //   placeholder="Enter your email"
        //   style={{
        //     borderColor: '#ccc',
        //     borderWidth: 1,
        //     borderRadius: 5,
        //     marginTop: 20,
        //     padding: 10,
        //     fontSize: 16
        //   }}
        // />

        // {/* Password Input */}
        // <TextInput
        //   value={password}
        //   onChangeText={setPassword}
        //   placeholder="Enter your password"
        //   secureTextEntry
        //   style={{
        //     borderColor: '#ccc',
        //     borderWidth: 1,
        //     borderRadius: 5,
        //     marginTop: 20,
        //     padding: 10,
        //     fontSize: 16
        //   }}
        // />

        // {/* Login Button */}
        // <TouchableOpacity onPress={handleSignIn} style={{
        //   backgroundColor: '#0F2FEB', padding: 15, borderRadius: 5, marginTop: 20, alignItems: 'center'
        // }}>
        //   <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
        // </TouchableOpacity>

        // {/* Social Login Buttons */}
        // <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        //   <TouchableOpacity style={{ margin: 10 }}>
        //     <Image source={{uri: 'google-logo-url'}} style={{ width: 40, height: 40 }} />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={{ margin: 10 }}>
        //     <Image source={{uri: 'facebook-logo-url'}} style={{ width: 40, height: 40 }} />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={{ margin: 10 }}>
        //     <Image source={{uri: 'apple-logo-url'}} style={{ width: 40, height: 40 }} />
        //   </TouchableOpacity>
        // </View>

        // {/* Sign-up Link */}
        // <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        //   <Text style={{ color: '#555' }}>Don't have an account?</Text>
        //   <Link href="/sign-up" style={{ color: '#0F2FEB', fontWeight: 'bold' }}> Sign Up</Link>
        // </View>

//         <View className="items-center justify-center">
// <Image 
//     source={images.logoSmall}
//     style={{ width: 129, height: 52, marginBottom: 20 }}
//   />
// {/* <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>Park It</Text> */}
// </View>

// <View 
// // style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%', maxWidth: 400, marginTop: 30 }}
// className="bg-white rounded-[60px] w-full h-full"
// >

// </View>