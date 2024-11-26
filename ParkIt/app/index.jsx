import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ActivityIndicator, BackHandler} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient



export default function App() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const parsedSession = JSON.parse(session);
          const response = await fetch('http://192.168.82.231:3000/session', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const data = await response.json();

          if (data.loggedIn) {
            router.replace('/home');
          } else {
            await AsyncStorage.removeItem('userSession');
            router.replace('/sign-in');
          }
        } else {
          
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <SafeAreaView className="bg-[#fdfdfd] h-full">
      {/* Circular Gradient */}
      <View
        style={{
        position: 'absolute',
        top: -300,
        left: -100,
        width: 1000,
        height: 1000,
        borderRadius: 150,
        overflow: 'hidden',
      }}
      >
      <LinearGradient
        colors={['#C8DEFF', '#fdfdfd']} // Gradient colors
        style={{
          flex: 1,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      </View>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[200px]"
            resizeMode='contain'
          />
          <Text className="text-[36px] text-[#0F2FEB] font-hbold">
            Park It
          </Text>
          <View className="relative mt-5">
            <Text className="text-[36px] font-hbold text-black text-center mt-[100px]">
              Join us Today
            </Text>
          </View>
          <Text className="text-[15px] font-hregular text-black mt-3 text-center">
            Start your Parking Journey!
          </Text>
          <CustomButton 
            title="Get Started"
            handlePress={() => router.push('/sign-up')}
            containerStyles="w-full mt-7"
            bordercolor={'#1849D6'}
            bgcolor={'#1849D6'}
            textcolor={'#fdfdfd'}
          />
          <CustomButton 
            title="Login"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7 border-2"
            bordercolor={'#1849D6'}
            textcolor={'#1849D6'}
          />
        </View>
      </ScrollView>

      {/* <StatusBar backgroundColor='#C8DEFF' style='light' /> */}
    </SafeAreaView>
  );
}
