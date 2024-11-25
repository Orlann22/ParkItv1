import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, bordercolor, bgcolor, textcolor }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-xl min-h-[62px] justify-center items-center border-2 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        style={{
          borderColor: bordercolor,
          backgroundColor: bgcolor,
        }}
        
    >
      <Text 
        className={`font-psemibold text-lg ${textStyles}`}
        style={{
          color: textcolor
        }}
      >
          {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton