import React, {useState, useEffect, useRef} from "react";
import {View, Text, TextInput, TouchableOpacity, Image, Keyboard} from "react-native";
import {icons} from "@/constants"
import {Colors} from "@/constants/Colors"

function FormField({labelShow, title, onChange, value,
    otherStyles, placeholder, keyboardType, isSubmitted, required , isFocus}){

    const [showPassword, setShowPassword] = useState(false)
    const [focus, setFocus] = useState(false)
//       const inputRef = useRef(null);
//
//     useEffect(() => {
//     // Focus the TextInput on component mount
//         inputRef.current.focus();
//     }, []);


    return (
        <View className={`${otherStyles}`}>
            { labelShow &&
            <Text className="text-base text-xs p-1 font-pmedium"> { labelShow && title} </Text>
            }
            <View className="">

                <TextInput
                    className={`h-14 bg-gray-200  font-pregular text-base
                    rounded-2xl px-4 ${focus
                        ? "border-2 border-primary-100"
                        : isSubmitted && required && !value.trim()
                        ? "border-2 border-red-500"
                        : ""
                        }
                    `}

                    placeholder={placeholder}
                 //   ref={inputRef}
                    autoCapitalize="none"  // Prevents automatic capitalization
                    autoCorrect={false}  // Disables auto-correction
                    autoComplete="off"
                    returnKeyType="next"
                    textContentType="none"
                    autoFocus={isFocus}
                    onFocus= {() => setFocus(true)}
                    onBlur={() => {
                        setFocus(false)
                      //  Keyboard.dismiss()
                        }}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={Colors.gray.DEFAULT}
                    keyboardType={keyboardType}
                    secureTextEntry={(title === "Password" || title === "Pin") && showPassword === false ? true : false}
                />
                {isSubmitted && required && !value.trim()
                    ? <Text className="text-xs color-red-500 px-1 text-right">{`${title} is required`}</Text>
                    : ""
                    }
            {(title === "Password" || title === "Pin") && (
            <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setShowPassword( s => !s)}
            className="absolute right-2 ">
                <Image
                style={{ height: 30, width: 30, marginTop: 9, }}
                source={showPassword === false ? icons.eyeHide : icons.eye}
                resizeMode="contain"
                />
            </TouchableOpacity>
            )}
            </View>

        </View>
        )
    }

export default FormField