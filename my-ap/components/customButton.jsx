import React from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import {Colors} from "../constants/Colors"
function CustomButton({isLoading, containerStyle, title, onPress, textStyle}){
    return (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={style.buttonOpacity}
        className={`items-center justify-center bg-primary
            min-h-[62] rounded-lg ${containerStyle} ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading}
        >
            <Text style={style.text}> {title} </Text>
        </TouchableOpacity>
        )
    }

const style=StyleSheet.create({
    buttonOpacity: {

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary.DEFAULT,
        shadowColor: Colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
    text: {
        color: "white",
        fontFamily: "Poppins-SemiBold"
        }
    })

export default CustomButton