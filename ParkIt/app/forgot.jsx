import React, { useState} from 'react';
import { Link, router } from 'expo-router'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { images, icons } from '../constants'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      console.log('error');
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }
    
    return true;
  }

  const goBack = () => {
    navigation.goBack();
  }

  const sendOtp = () => {
    if (!validateInputs()) return;
    
    Alert.alert('Send OTP', email);

  }

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
            <Text className="text-[32px] font-hbold text-black text-center mt-[50px]">
              Forgot Password?
            </Text>
            <Text className="text-[15px] font-hregular text-black mt-3 text-center">
              Enter your registered email below to receive{"\n"}password reset code
            </Text>
            <View className="mt-[40px]">
            <FormField 
              title={'Email Address'}
              placeholder={'Input email address'}
              value={email}
              handleChangeText={setEmail}
            />
            </View>
            <View className="mt-5" ></View>
            <CustomButton 
              title="Send OTP"
              containerStyles="mt-7"
              bgcolor={'#1849D6'}
              textcolor={'white'}
              handlePress={sendOtp}
            />           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword