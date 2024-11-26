import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, useSegments, useRouter  } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalProvider from '../lib/GlobalProvider';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import CustomButton from '../components/CustomButton';



const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://192.168.82.231:3000/session', {
          withCredentials: true,
        });

        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const navigation = useNavigation();

  const handleLoginSuccess = () => {
    // Reset the entire stack and set 'home' as the new root
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession'); // Clear local session
      await axios.post('http://192.168.82.231:3000/logout', {}, { withCredentials: true }); // End session on the server
      Alert.alert('Success', 'You have been logged out');
      handleLoginSuccess(); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Unable to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView className="bg-primary flex-1">
        <View>
          <View>
            <Text className="text-white pl-5 pt-3 font-pbold text-xl">Welcome, {user?.firstName || 'Guest'}!</Text>
          </View>

          <CustomButton 
            title="Pick Parking Slot"
            containerStyles="mx-5 mt-5"
            bgcolor={'#1849D6'}
            textcolor={'white'}
            handlePress={() => router.push('parking')}
          />
          <CustomButton 
            title="OCR"
            containerStyles="mx-5 mt-5"
            bgcolor={'#1849D6'}
            textcolor={'white'}
            handlePress={() => router.push('parking')}
          />
          <CustomButton 
            title="Logout"
            containerStyles="mx-5 mt-5"
            bgcolor={'#ef4444'}
            textcolor={'white'}
            handlePress={handleLogout}
          />

        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="#161122" style="light"/>

    </>
    
  );
};

export default Home;
