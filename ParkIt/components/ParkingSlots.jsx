import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ParkingSlots = ({ activeOpacity, handlePress }) => {
  return (
    <TouchableOpacity
        activeOpacity={activeOpacity}
        className="bg-white h-[50px] w-[30px] my-2"
        onPress={handlePress}
  />
  )
}

export default ParkingSlots