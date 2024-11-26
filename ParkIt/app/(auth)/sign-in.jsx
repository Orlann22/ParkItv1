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

  const forgotPassword = () => {
    router.push('/forgot');
  }

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  }

  const submit = async () => {
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
              Login
            </Text>
            <Text className="text-[15px] font-hregular text-black mt-3 text-center">
              Start your parking journey!
            </Text>
            <View className="mt-[40px]">
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
            <TouchableOpacity onPress={forgotPassword}>
              <Text className="text-[#1849D6] font-hregular text-base pt-1">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <CustomButton 
              title="Login"
              containerStyles="mt-7"
              bgcolor={'#1849D6'}
              textcolor={'white'}
              handlePress={submit}
            />
            <View className="mt-16 px-4">
              <Text className="text-lg text-black font-hregular text-center mb-5">
                or Login using
              </Text>
              <View className="flex flex-row gap-2 justify-between">
                <CustomButton 
                  containerStyles="border-2 w-[100px]"
                  bordercolor={'#D9D9D9'}
                  icon={icons.google}
                  iconStyles={'w-[25px] h-[25px] top-3'}
                />
                <CustomButton 
                  containerStyles="w-[100px]"
                  bgcolor={'#1877F2'}
                  icon={icons.facebook}
                  iconStyles={'w-[30px] h-[30px]  top-[8px]'}
                />
                <CustomButton 
                  containerStyles="w-[100px]"
                  bgcolor={'#000'}
                  icon={icons.apple}
                  iconStyles={' top-3'}
                />              
              </View>
            </View>

            <View className="justify-center pt-[100px] flex-row gap-2">
              <Text className="text-lg text-black font-hregular">
                Don't have an account yet?
              </Text>
              <Link
                href="/sign-up"
                className='text-lg font-hbold text-[#1849D6]'
              >Sign Up</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
