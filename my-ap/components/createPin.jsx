import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard,
    TouchableOpacity, Text, Alert } from 'react-native';
import {BottomSheetView, BottomSheetTextInput } from "@gorhom/bottom-sheet"
import {GlobalContext} from "@/context/globalProvider";
import {router} from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import fingerPrint from "@/components/fingerPrint";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from "@/components/customAlert"

export default function CreatePin({handleClose, handleSuccessVerification, title, hideButtons, isFocus}) {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const {setIsLogIn} = useContext(GlobalContext);
    const [error, setError] = useState(false)
//     const inputRef = useRef(null);

//     useEffect(() => {
//     // Focus the TextInput on component mount
//         inputRef.current.focus();
//     }, []);

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
                handleSuccessVerification(p)
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
{/*                 {pin.map((_, index) => ( */}
                    <TextInput
                      //  key={0}
                        ref={(ref) => (inputs.current[0] = ref)} // Assign ref
                        style={styles.input}
                        maxLength={1}
                        //onFocus={}
                        keyboardType="number-pad"
                        value={pin[0]}
                        onChangeText={(value) => handleChange(value, 0)}
                        onKeyPress={(e) => handleKeyPress(e, 0)}
                        secureTextEntry={true}
                        autoFocus={isFocus} // Auto-focus on the first input
                    />

                    <TextInput
                      //  key={0}
                        ref={(ref) => (inputs.current[1] = ref)} // Assign ref
                        style={styles.input}
                        maxLength={1}
                        //onFocus={}
                        keyboardType="number-pad"
                        value={pin[1]}
                        onChangeText={(value) => handleChange(value, 1)}
                        onKeyPress={(e) => handleKeyPress(e, 1)}
                        secureTextEntry={true}
                        //autoFocus={(0 === 0)  && isFocus} // Auto-focus on the first input
                    />

                    <TextInput
                      //  key={0}
                        ref={(ref) => (inputs.current[2] = ref)} // Assign ref
                        style={styles.input}
                        maxLength={1}
                        //onFocus={}
                        keyboardType="number-pad"
                        value={pin[2]}
                        onChangeText={(value) => handleChange(value, 2)}
                        onKeyPress={(e) => handleKeyPress(e, 2)}
                        secureTextEntry={true}
                       // autoFocus={(0 === 0)  && isFocus} // Auto-focus on the first input
                    />

                    <TextInput
                      //  key={0}
                        ref={(ref) => (inputs.current[3] = ref)} // Assign ref
                        style={styles.input}
                        maxLength={1}
                        //onFocus={}
                        keyboardType="number-pad"
                        value={pin[3]}
                        onChangeText={(value) => handleChange(value, 3)}
                        onKeyPress={(e) => handleKeyPress(e, 3)}
                        secureTextEntry={true}
                        //autoFocus={(0 === 0)  && isFocus} // Auto-focus on the first input
                    />
{/*                 ))} */}
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
