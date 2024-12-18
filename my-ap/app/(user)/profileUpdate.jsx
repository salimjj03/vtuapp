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
             if (pin.length != 4 && pin.length > 0) {
                setResponse({status: "error", message: "Pin must be 4 digit"})
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
            setUser( (u) => ({...u, pin: pin}) )
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
    className="flex-1 bg-background m-4"
    >
{/*         <ScrollView */}
{/*             showsVerticalScrollIndicator = {false} */}
{/*             showsHorizontalScrollIndicator ={false} */}
{/*             contentContainerStyle={{ */}
{/*                 alignItems: "center", */}
{/*                 flexGrow: 1, */}
{/*                 gap: 10, */}
{/*                 padding: 20 */}
{/*              }} */}
{/*         > */}
            <View className="">
                <View className="bg-white p-4 my-4 gap-3 rounded-xl gap-4">
                    <Text>Change Pin</Text>
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
                    />
                </View>

                <View className="bg-white p-4 my-4 gap-3">
                    <FormField />
                    <CustomButton />
                </View>
            </View>
{/*         </ScrollView> */}
    { response && (
    <CustomAlert
    title={response?.status}
    response={response?.message}
    onClose={handleClose}
    />
    )}
{/*     { loading  && ( */}
    <Loading
        loading={loading}
    />
{/*     )} */}
    </SafeAreaView>
  );
};

export default ProfileUpdate;
