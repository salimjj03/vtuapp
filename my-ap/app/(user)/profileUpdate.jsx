import React, {useContext, useEffect, useState} from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {useRouter, router} from "expo-router"
import {SafeAreaView} from "react-native-safe-area-context"
import {Colors} from "@/constants/Colors"
import {handleLogout} from "@/components/logout";
import {GlobalContext} from "@/context/globalProvider"
import CustomButton from "@/components/customButton"
import FormField from "@/components/formField"
import CustomAlert from "@/components/customAlert"
import axios from "axios"
import {config} from "../../config";
import Loading from "@/components/loading"
import CustomBottomSheet from "@/components/customBottomSheet"


const ProfileUpdate = () => {

    const {user, setIsLogIn, setUser} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [pin, setPin] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse ] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handlePinUpdate = (type) => {
        setIsSubmitted(true)
        if (type === "pin") {
             if (pin.length != 4) {
                setResponse({status: "error", message: "Pin must be 4 digit"})
                return
            }
        }

        if (type === "password") {
             if (password.length < 4) {
                setResponse({status: "error", message: "Password too small"})
                return
            }
        }

        const data = type === "pin" ? {pin} : {password}
        setLoading(true)
        axios.put(`${config.API_URL}/users`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            setResponse(res?.data)
            setLoading(false)
            setIsSubmitted(false)
            setPin("")
            setPassword("")
            if (type === "pin") {
                setUser( (u) => ({...u, pin: pin}) )
            }
            })
        .catch( (err) => {
            if (err?.response?.status === 401){
                handleLogout(setIsLogIn)
                } else {
            setResponse(err?.response?.data)
            setLoading(false)
            setIsSubmitted(false)
            }
            })
        }

    const handleClose = () => {
        setResponse(null)
        setIsSubmitted(false)
        //setLoading(false)
        console.log(user)
        }

    const handleSuccessVerification = () => {
        ref.current.close()
        router.replace("/profileUpdate")
        }

  return (
    <SafeAreaView
    className="flex-1 bg-background"
    >
            <View className=" m-4">
                { response && (
                <CustomAlert
                title={response?.status}
                response={response?.message}
                onClose={handleClose}
                containerStyle="bg-primary"
                />
                )}
                <View className="bg-white p-4 my-4 gap-3 rounded-xl gap-4">
                    <Text className="font-pregular ">Change Pin</Text>
                    <FormField
                    keyboardType={"numeric"}
                    onChange={(e) => setPin(e)}
                    value={pin}
                    title="Pin"
                    required={true}
                    isSubmitted={isSubmitted}
                    />
                    <CustomButton
                    title={"Change Pin"}
                    onPress={ () => handlePinUpdate("pin")}
                    containerStyle="bg-primary"
                    />
                </View>

                <View className="bg-white p-4 my-4 gap-3 rounded-xl gap-4">
                    <Text className="font-pregular ">Change Password</Text>
                    <FormField
                    onChange={(e) => setPassword(e)}
                    value={password}
                    title="Password"
                    required={true}
                    isSubmitted={isSubmitted}
                    />
                    <CustomButton
                    title={"Change Password"}
                    onPress={ () => handlePinUpdate("password")}
                    containerStyle="bg-primary"
                    />
                </View>
            </View>

    <Loading
        loading={loading}
    />
    </SafeAreaView>
  );
};

export default ProfileUpdate;
