import React, {useContext, useEffect, useState, useRef} from 'react';
import { Alert, View, Text, TouchableOpacity,
    ScrollView, ActivityIndicator } from 'react-native';
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
import Pin from "@/components/pin"


const Transfer = () => {

    const {user, setIsLogIn, setUser} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [amount, setAmount] = useState("")
    const [response, setResponse ] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [fullName, setFullName] = useState("")
    const [isVarify, setIsVerify] = useState(false)
    const [isPhone, setIsPhone] = useState(false)

    const ref = useRef()


    const handleUserSearch = () => {
        setIsSubmitted(true)
        if (userName === "") {
            return
            }
        if (userName.toLowerCase() === user?.user_name.toLowerCase()) {
            setResponse(
                {
                    status: "error",
                    message: "You can't send money to yourself"
                    }
                )
            return
            }
        ref.current.snapToIndex(0)
        setLoading(true)
        axios.get(`${config.API_URL}/full_name/${userName}`,{
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            //setResponse(res?.data)
            setFullName(res?.data?.full_name)
            ref.current.snapToIndex(2)
            setLoading(false)
            setIsSubmitted(false)
            setIsPhone(true)
            })
        .catch( (err) => {
            if (err?.response?.status === 401){
                handleLogout(setIsLogIn)
                } else {
            ref.current.close()
            setResponse(err?.response?.data)
            setLoading(false)
            setIsSubmitted(false)
            }
            })
        }

    const handleClose = () => {
        setResponse(null)
        setIsSubmitted(false)
        setFullName("")
        setAmount("")
        setUserName("")
        setIsPhone(false)
        setIsVerify(false)
        ref.current.close()
        }

    const handleBack = () => {
        setResponse(null)
        setIsSubmitted(false)
        setFullName("")
        setAmount("")
        setUserName("")
        setIsPhone(false)
        setIsVerify(false)
        ref.current.close()
        //router.replace("/home")
        }

    const handleTransfer = () => {
        setIsSubmitted(true)
        if (amount === "") {
            return
            }
        if (amount < 10){
            setResponse(
                {
                    status: "error",
                    message: "Amount must be above ₦9"
                    }
                )
            return
            }
        setIsVerify(true)
        ref.current.snapToIndex(1)
        }

    const handleSuccessVerification = () => {
        setLoading(true)
        ref.current.snapToIndex(0)
        const data = {
            user_name: userName,
            amount: amount,
            sender: user?.user_name
            }

        axios.post(`${config.API_URL}/send_money`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            ref.current.close()
            setResponse(res?.data)
            setLoading(false)
            setIsSubmitted(false)
            setFullName("")
            setAmount("")
            setUserName("")
            setIsPhone(false)
            setIsVerify(false)
            })
        .catch( (err) => {
            if (err?.response?.status === 401){
                handleLogout(setIsLogIn)
                } else {
            ref.current.close()
            setResponse(err?.response?.data)
            setLoading(false)
            setIsSubmitted(false)
            }
            })
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
                onClose={handleBack}
                secondTitle="back"
                secondOnClose={handleClose}
                />
                )}

                <View className="bg-white p-4 my-4 gap-3 rounded-xl gap-4">
                    <Text className="font-pregular ">User name</Text>
                    <FormField
                    onChange={(e) => setUserName(e)}
                    value={userName}
                    title="User Name"
                    required={true}
                    isSubmitted={isSubmitted}
                    />
                    <CustomButton
                    title={"Continue"}
                    onPress={ () => handleUserSearch()}
                    containerStyle="bg-primary"
                    />
                </View>
            </View>

            <CustomBottomSheet
                ref={ref}
                components={
                    loading ?
                    <View className="">
                        <ActivityIndicator
                            color={Colors.primary.DEFAULT}
                            size="large"
                        />
                        <Text className="mt-2">Loading....</Text>
                    </View> :
                    !loading && !isVarify && isPhone ?
                    <View className="flex-1 items-center justify-center">
                         <View className="bg-white p-4 w-[90vw] gap-3 rounded-xl gap-4">
                             <View className="bg-white flex-row rounded-xl p-3
                             shadow shadow-primary gap-4 items-center">
                                 <View
                                  className="w-[50] h-[50] rounded-full justify-center items-center bg-primary"
                                  >
                                     { user?.user_name && (
                                        <Text className="font-bold text-white text-4xl uppercase">
                                            {user?.user_name[0]}
                                        </Text>
                                        )}
                                 </View>
                                 <View>
                                     <Text className="font-psemibold uppercase">{fullName}</Text>
                                     <Text className="font-pthin uppercase">{userName}</Text>
                                 </View>
                             </View>
                            <Text className="font-pregular mt-4">Amount</Text>
                            <FormField
                            onChange={(e) => setAmount(e)}
                            keyboardType="numeric"
                            value={amount}
                            title="Amount"
                            required={true}
                            isSubmitted={isSubmitted}
                            />
                            <View className="flex-row justify-center gap-4">
                                <CustomButton
                                title={"Close"}
                                onPress={ () => handleClose()}
                                containerStyle="w-[40%] bg-blue-500"

                                />

                                <CustomButton
                                title={"Continue"}
                                onPress={ () => handleTransfer()}
                                containerStyle="w-[40%] bg-primary"
                                />
                            </View>
                         </View>
                    </View> :
                    isVarify && !loading && isPhone ?
                    <View>
                        <Pin
                            title="Verify"
                            handleClose={handleClose}
                            handleSuccessVerification={handleSuccessVerification}
                        />
                    </View> :
                    ""
                    }
            />

{/*     <Loading */}
{/*         loading={loading} */}
{/*     /> */}
    </SafeAreaView>
  );
};

export default Transfer;
