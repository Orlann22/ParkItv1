import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ActivityIndicator, BackHandler} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';


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
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-5">
          </View>
            <CustomButton 
              title="Continue with Email"
              handlePress={() => router.replace('/sign-in')}
              containerStyles="w-full mt-7"
            />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161122' style='light' />
    </SafeAreaView>
  );
}
