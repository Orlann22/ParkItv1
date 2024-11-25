import { TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  bordercolor,
  bgcolor,
  textcolor,
  icon,
  iconPosition,
  iconStyles,
}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`rounded-xl min-h-[54px] max-h-[60px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        style={{
          borderColor: bordercolor,
          backgroundColor: bgcolor,
        }}
    >

    {icon && (
      <View className="">  
        <Image 
          source={icon}
          className={`${iconStyles}`}
        />
      </View>
    )}
      <Text 
        className={`font-hmedium text-lg ${textStyles}`}
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