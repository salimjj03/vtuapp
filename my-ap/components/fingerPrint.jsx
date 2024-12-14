import React from "react";
import {Alert} from "react-native"
import * as Sensor from "expo-local-authentication"


const BiometricAuthenticate = async () => {
    try{

        const hasPrint = await Sensor.hasHardwareAsync();
        if (!hasPrint) {
            Alert.alert("Error", "Not supported")
            return "Not supported"
            }
        const isEnrolled = await Sensor.isEnrolledAsync();
        if(!isEnrolled) {
            Alert.alert("Error", "Not enrolled");
            return "Not enrolled"
            }
        const result = await Sensor.authenticateAsync({
            promptMessage: "Authenticate",
            fallbackLabel: "Use PIN Instead",
            cancelLabel: "Cancel"
            });

        if (result.success) {
                return true
            } else if (result.error === "user_cancel") {
                //Alert.alert("Error", "Cancel by the user")
                return "cancel"
                } else {
                    Alert.alert("Failed", "Authentication failed. Please try again.");
                    return "error try again"
                    }
        } catch (err) {
            Alert.alert("Error", `An error occurred: ${err.message}`);
            return "cancel occurred"
            }
    }

export default BiometricAuthenticate