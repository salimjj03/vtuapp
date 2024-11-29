import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView,
    Image, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import FormField from "@/components/formField"
import CustomButton from "@/components/customButton"
import images from "@/constants/images"
import {Colors} from "@/constants/Colors"
import {Link, router} from "expo-router"
import axios from "axios"
import {config} from "@/config"
import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage"

const setSecureStore = async (name, data) => {
    try{
        await AsyncStorage.setItem(name, data);
        console.log("stored");
        } catch (error) {
            console.error(error)
            }
    }

function SignIn(){

    const [form, setForm] = useState(
        {
            user_name: "",
            password: ""
         }
        )

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const [error, setError] = useState(false)

    const required = ["password", "user_name"];

    function submitLogging(){
        let error = false
        setIsSubmitted(true);
        for(let i of required) {
            if (!form[i].trim()) {
                error = true
                return
                }
            }
        if (error) {
            return
            }
        setIsLoading(true)
        axios.post(`${config.API_URL}/login`, form)
        .then((res) => {
            setIsLoading(false)
            setSecureStore("userData", JSON.stringify(res.data))
            router.push("/home")
            })
        .catch((err) => {
            setIsLoading(false)
            Alert.alert("Error", err?.response?.data?.message)
            })
        }

    return (
        <SafeAreaView className="h-full">
            <ScrollView
            contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                gap: 20
                }}>
                <View>
                <Image
                source={images.logo}
                style={{

                    width: 100,
                    height: 100,
                    shadowColor: Colors.primary.DEFAULT,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    }}
                className="rounded-full"
                resizeMode="contain"
                />
                </View>

                <Text className="font-psemibold text-xl">Welcome Back</Text>
                <View className="bg-white justify-center
                rounded-xl px-4  w-[90vw] "
                style={{
                    shadowColor: Colors.primary.DEFAULT,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    }}
                >
                    <FormField
                     title="UserName"
                     value={form.user_name}
                     placeholder=" User name"
                     onChange={(e) => setForm({...form, user_name: e})}
                     otherStyles=""
                     required={true}
                     isSubmitted={isSubmitted}
                     />

                    <FormField
                     title="Password"
                     value={form.password}
                     placeholder=" Password"
                     onChange={(e) => setForm({...form, password: e})}
                     required={true}
                     isSubmitted={isSubmitted}
                     />

                     <CustomButton
                     containerStyle="my-5"
                     title="Login"
                     onPress={submitLogging}
                     isLoading={isLoading}
                     />
                </View>

                <View>
                    <Text className="font-psemibold text-xl">
                        <Link href="/resetPassword">
                            <Text className="text-black-200">Forgot Password </Text>
                        </Link>
                         |
                         <Link href="/signup">
                            <Text className="text-primary"> Register</Text>
                         </Link>
                    </Text>
                </View>


            </ScrollView>
        </SafeAreaView>
        )
    }

export default SignIn