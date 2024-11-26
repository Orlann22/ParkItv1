import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setshowPassword] = useState(false);

    return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-black font-hregular pb-1">{title}</Text>

        <View className="w-full h-16 px-4 bg-white rounded-2xl border-[1px] border-[#797979] focus:border-secondary flex flex-row items-center">
        <TextInput 
            className="flex-1 text-black font-hregular text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            {...props}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-[22px] h-[22px]"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )}
        </View>
    </View>
    )
}

export default FormField