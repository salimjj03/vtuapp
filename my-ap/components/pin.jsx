import React, { useRef, useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Keyboard,
    TouchableOpacity, Text, Alert } from 'react-native';
import {BottomSheetView, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import {GlobalContext} from "@/context/globalProvider";
import {router} from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import fingerPrint from "@/components/fingerPrint";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from "@/components/customAlert"

export default function App({handleClose, handleSuccessVerification, title}) {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const {setIsLogIn} = useContext(GlobalContext);
    const [error, setError] = useState(false)

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
                    handleSuccessVerification()
                    } else {
                        setPin(['', '', '', ''])
                        setError(true)
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
        <BottomSheetView style={{
            alignItems: "center",
            padding: 10
            }}>
            { error &&
                <CustomAlert
                title={"error"}
                response={"Invalid Pin"}
                onClose={() => setError(false)}
            />
            }
            { title &&
            <Text className="font-psemibold text-xl mb-4">{title}</Text>
            }
            <Text
            style={styles.label}
            className=""
            >Enter 4-digit PIN:</Text>
            <BottomSheetView c style={styles.pinContainer}>
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
            </BottomSheetView>

            <BottomSheetView className="items-center flex-row justify-around gap-4 mt-[20]">
                <TouchableOpacity
                className="w-[150] h-[60] rounded-lg bg-green-500 items-center justify-center"
                onPress={ () => handleClose() }
                >
                    <Text className="text-lg text-white">Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                className="w-[150] h-[60] items-center justify-center bg-primary-200 rounded-lg"
                onPress = { () => fingerPrint()
                    .then((res) => res === true && handleSuccessVerification())
                    .catch((err) => console.log(err))
                    }
                >
                    <Ionicons name="finger-print-outline" size={40} color={"black"} />
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});
