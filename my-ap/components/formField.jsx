import React, {useState} from "react";
import {View, Text, TextInput} from "react-native";
import {icons} from "@/constants"

function FormField({ title, onChange, value, otherStyles, placeholder, keyBoardType }){

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className="space-y-2">
            <Text className="text-base font-pmedium"> {title} </Text>

            <TextInput
            className="h-16 bg-primary-100 font-psemibold text-base rounded-2xl px-4
            focus:border-green-500"

            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            placeholderTextColor="white"
            keyBoardType={keyBoardType}
            secureTextEntry={title === "Password" && showPassword === false ? true : false}
            >
            ok
            
            </TextInput>

        </View>
        )
    }

export default FormField