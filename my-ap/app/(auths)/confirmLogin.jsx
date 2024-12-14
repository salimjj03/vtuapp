import React, { useRef, useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Keyboard,
    Text, Alert, TouchableOpacity, Image } from 'react-native';
import {router} from "expo-router";
import fingerPrint from "@/components/fingerPrint";
import Entypo from '@expo/vector-icons/Entypo';
import images from "@/constants/images"
import {Colors} from "@/constants/Colors"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {SafeAreaView} from "react-native-safe-area-context"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {handleLogout} from "@/components/logout"
import {GlobalContext} from "@/context/globalProvider";

export default function App() {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const {setIsLogIn} = useContext(GlobalContext);

    const handleChange = (value, index) => {
        const newPin = [...pin];
        if (value.length === 1) {
            newPin[index] = value;
            setPin(newPin);

            // Move to next input if not the last one
            if (index < inputs.current.length - 1) {
                inputs.current[index + 1].focus();
            } else {
                Keyboard.dismiss(); // Hide the keyboard when the last input is filled
                const p = pin.toString().replaceAll(",", "") + value;
                //console.log(p)
                if (p === "1234") {
                    router.push("/home")
                    } else {
                        setPin(['', '', '', ''])
                        Alert.alert("Error", "Invalid Pin")
                        }
            }
        }
    };

    const handleKeyPress = (e, index) => {
        const { key } = e.nativeEvent;

        if (key === 'Backspace') {
            const newPin = [...pin];
            if (pin[index] === '' && index > 0) {
                // Move to previous input and clear it
                inputs.current[index - 1].focus();
                newPin[index - 1] = '';
            } else {
                // Clear current input
                newPin[index] = '';
            }
            setPin(newPin);
        }
    };

    return (
        <SafeAreaView
        className="h-screen items-center bg-white justify-around"
        >

          <View className="justify-center w-[90vw] items-center gap-3">
            <View className="w-full flex-row justify-between">
               <View className="bg-white w-[50]">
                <Ionicons
                className="w-[50]"
               // name="exit" size={50} color={Colors.primary.DEFAULT}
                />
               </View>

               <View className="bg-white w-[50] ">
                  <TouchableOpacity
                  onPress={() => handleLogout(setIsLogIn) }
                  >
                    <Ionicons
                    className="w-[50]"
                    name="exit-outline"
                    size={40}
                    color={Colors.primary.DEFAULT}
                    />
                  </TouchableOpacity>
               </View>
            </View>
            <Image
            className="rounded-full"
            style={{
                height: 90,
                width: 90,
                shadowColor: Colors.primary.DEFAULT,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                }}
            source={images.logo}
            resizeMode="contain"
            />
            <Text className="font-psemibold text-2xl">Salim JJ</Text>
          </View>

          <View className="items-center justify-around">
            <Text
            style={styles.label}
            className=""
            >Enter 4-digit PIN:</Text>
            <View style={styles.pinContainer}>
                {pin.map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)} // Assign ref
                        style={styles.input}
                        maxLength={1}
                        //onFocus={}
                        keyboardType="number-pad"
                        value={pin[index]}
                        onChangeText={(value) => handleChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        secureTextEntry={true}
                        //autoFocus={index === 0} // Auto-focus on the first input
                    />
                ))}
            </View>
          </View>
          <View className="items-center justify-around gap-3">
            <TouchableOpacity
            onPress = { () => fingerPrint()
                .then((res) => res === true && router.push("/home"))
                .catch((err) => console.log(err))
                }
            >
                <Ionicons name="finger-print-outline" size={60} color={"black"} />
            </TouchableOpacity>
            <Text className="text-lg text-primary">Verify using Fingerprint</Text>
         </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containere: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 16,
        marginBottom: 20,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.primary.DEFAULT,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 8,
        backgroundColor: Colors.background.DEFAULT,
    },
});
