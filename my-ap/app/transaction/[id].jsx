import React, {useEffect, useContext, useState} from "react"
import {View, Text, Image, ScrollView} from "react-native"
import {useLocalSearchParams, useRouter} from "expo-router"
import axios from "axios"
import {SafeAreaView} from "react-native-safe-area-context"
import {config} from "../../config"
import {GlobalContext} from "@/context/globalProvider"
import {router} from "expo-router"
import {Colors} from "@/constants/Colors"
import images from "@/constants/images"
import {handleLogout} from "@/components/logout";

const Transaction = () => {
    const {id} = useLocalSearchParams()
    const {user, setIsLogIn} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [transaction, setTransaction] = useState(null)

    useEffect( () => {
        if (user) {
            setLoading(true)
            axios.get(`${config.API_URL}/transactions/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                    }
                })
            .then( (res) => {
                setTransaction(res?.data)
                setLoading(false)
                } )
            .catch( (err) => {
                if (err?.response?.status === 401) {
                    handleLogout(setIsLogIn)
                    }
                setError(true)
                setLoading(false)
                console.log(err)
                } )
        }
        }, [user] )
    return (
            <SafeAreaView
               style={{ flex: 1,
                  alignItems: "center",
                  //justifyContent: "center",
                  backgroundColor:
                  Colors.background.DEFAULT,
                  gap: 15
                  }}
            >
             <ScrollView
                showsVerticalScrollIndicator = {false}
                showsHorizontalScrollIndicator ={false}
                contentContainerStyle={{
                    flexGrow: 1,
                     gap: 10,
                     alignItems: "center"
                     }}
                >
                <View className="bg-white w-[95%] gap-1 p-4 items-center rounded-lg">
                    <View className="">
                        <Image
                        className="rounded-full shadow shadow-primary"
                        style={{ width: 60, height: 60 }}
                        source={images.logo}
                        resizeMode="contain"
                        />
                    </View>
                    <Text className="font-pregular text-center">{transaction?.t_disc}</Text>
                    <Text className="font-semibold text-2xl">
                        {new Intl.NumberFormat(
                            "en-NG",
                            {style: "currency", currency: "NGN"})
                            .format(transaction?.amount)
                            }
                    </Text>
                    <Text
                    className={
                        `font-regular ${
                        transaction?.status === "failed" ?
                        "text-red-400" :
                        "text-green-400"}`
                        }
                    >
                        {transaction?.status}
                    </Text>
                </View>

                <View className="bg-white w-[95%] p-4  rounded-lg">
                    <Text className="font-psemibold mb-2">Transaction Details</Text>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">User</Text>
                        <Text className="font-pregular">{transaction?.user_name}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Type</Text>
                        <Text className="font-pregular">{transaction?.t_type}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Status</Text>
                        <Text className="font-pregular ">{transaction?.status}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Amount</Text>
                        <Text className="font-pregular ">{
                            new Intl.NumberFormat(
                            "en-NG",
                            {style: "currency", currency: "NGN"})
                            .format(transaction?.amount)
                            }
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Amount Before</Text>
                        <Text className="font-pregular ">{
                            new Intl.NumberFormat(
                            "en-NG",
                            {style: "currency", currency: "NGN"})
                            .format(transaction?.amount_before)
                            }
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Amount After</Text>
                        <Text className="font-pregular ">{
                            new Intl.NumberFormat(
                            "en-NG",
                            {style: "currency", currency: "NGN"})
                            .format(transaction?.amount_after)
                            }
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Date</Text>
                        <Text className="font-pregular ">{transaction?.t_date}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-pthin">Reference</Text>
                        <Text className="font-pregular text-right flex-1">{transaction?.ref}</Text>
                    </View>
                </View>

                <View className="bg-white w-[95%] p-4  rounded-lg">
                    <View className="justify-between">
                        <Text className="font-psemibold mb-2">API response</Text>
                        <Text className="font-pregular">{transaction?.rtr}</Text>
                    </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        )
    }

export default Transaction