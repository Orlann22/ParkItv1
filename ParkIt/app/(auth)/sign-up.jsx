// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'

// import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
// import { Link, router } from 'expo-router'

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { Text, TextInput, TouchableOpacity, View, Alert, BackHandler, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { images, icons } from '../../constants'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'


export default function HomeScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const firstNameRegex = /^[A-Za-z]{2,50}$/;
    const lastNameRegex = /^[A-Za-z]{2,50}$/;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      console.log('error');
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First Name is required.');
      return false;
    }

    if (!lastName.trim()) {
      Alert.alert('Validation Error', 'Last Name is required.');
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

    if (!firstName || !firstNameRegex.test(firstName)) {
      Alert.alert(
        'Validation Error',
        'Please enter valid first name.'
      );
      return false;
    }

    if (!lastName || !lastNameRegex.test(lastName)) {
      Alert.alert(
        'Validation Error',
        'Please enter valid last name.'
      );
      return false;
    }

    return true;
  }

  const navigation = useNavigation();

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  }

  const handleSignUp = async () => {
    if (!validateInputs()) return;
    
    try {
      const response = await fetch('http://192.168.82.231:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password}),
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
    <SafeAreaView className="bg-[#0F2FEB] h-full">
    <ScrollView contentContainerStyle={{height: '100%'}}>
      <View classname="w-full items-center h-full px-4">
        <View className="w-full relative items-center justify-center" >
          <TouchableOpacity
            className="absolute left-[16px] top-[25px]"
            onPress={goBack}
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
          className="bg-white rounded-[30px] w-full h-full px-4 "
        >
          <Text className="text-[32px] font-hbold text-black text-center mt-[40px]">
            Register
          </Text>
          <Text className="text-[15px] font-hregular text-black mt-3 text-center">
            Start your parking journey!
          </Text>
          <View className="flex flex-row justify-between w-full gap-3 mt-[40px]">
            <View className='flex-1'>
              <FormField 
                title={'First Name'}s
                placeholder={'Juan'}
                value={firstName}
                handleChangeText={setFirstName}
              />
            </View>
            <View className="flex-1">
              <FormField 
                title={'Last Name'}
                placeholder={'Dela Cruz'}
                value={lastName}
                handleChangeText={setLastName}
              />
            </View>
          </View>
          <View className="mt-5">
          <FormField 
            title={'Email Address'}
            placeholder={'Input email address'}
            value={email}
            handleChangeText={setEmail}
          />
          <FormField 
            title={'Password'}
            placeholder={'Input your password'}
            otherStyles={'pt-5'}
            value={password}
            handleChangeText={setPassword}
          />
          </View>
          
          <CustomButton 
            title="Register"
            containerStyles="mt-7"
            bgcolor={'#1849D6'}
            textcolor={'white'}
            handlePress={handleSignUp}
          />


          <View className="justify-center pt-[100px] flex-row gap-2">
            <Text className="text-lg text-black font-hregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className='text-lg font-hbold text-[#1849D6]'
            >Sign In</Link>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}
  