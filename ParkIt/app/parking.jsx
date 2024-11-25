import { View, Text, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Link } from "expo-router";
import ParkingSlots from '../components/ParkingSlots';

const Parking = () => {
  const goToHome = async () => {
    router.dismissAll();
    router.replace('home');
  };


  return (
    <SafeAreaView className="bg-primary h-full">

      <ScrollView>
        <Text className="text-white text-xl font-psemibold pl-5 pt-5">Parking Slots</Text>
        <View className="flex flex-row flex-wrap justify-evenly gap-3 mx-3">
        {[...Array(500)].map((_, index) => (
            <ParkingSlots
              key={index}
              activeOpacity={0.7}
              handlePress={() => router.push('reservation')}
            />
          ))}

        </View>
        
        {/* Payment Button
        <TouchableOpacity
          onPress={goToHome}
          className="bg-blue-500 py-3 mx-3 rounded-md items-center"
        >
          <Text className="text-white text-lg">Go Back to Home</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Parking;
