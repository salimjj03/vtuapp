import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image,
    FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { GlobalContext } from "@/context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {Colors} from "@/constants/Colors"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from "@/components/icon"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {icons} from "@/constants";
import Entypo from '@expo/vector-icons/Entypo';
import TransactionHistory from "@/components/transactionHistory";
import axios from "axios";
import {config} from "../../config";
import {handleLogout} from "@/components/logout";


function Home() {
    const router = useRouter()
    const {setIsLogIn} = useContext(GlobalContext);
    const { user } = useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);

    let formattedBalance = new Intl.NumberFormat(
        "en-NG",
        {style: "currency", currency: "NGN" })
        .format(user?.balance)
    const [transactions, setTransactions ] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [transactionsData, userBalance] = await Promise.all([
                        axios.get(`${config.API_URL}/transactions`, {
                            headers: {
                                "Authorization": `Bearer ${user.token}`
                                }
                            }),

                        axios.get(`${config.API_URL}/balance`, {
                            headers: {
                                "Authorization": `Bearer ${user?.token}`
                                }
                            })

                    ])

                    setTransactions(transactionsData?.data)
                    setBalance(userBalance?.data.balance)

                     } catch (err) {
                        if (err?.response?.status  === 401) {
                                handleLogout(setIsLogIn);
                            }
                        console.log(err.response)
                        } finally {
                            setLoading(false)
                            }
                }
            fetchData()
            }
        }, [user])

    return (
        <SafeAreaView
        style={{
            flex: 1,
            paddingLeft: 4,
            paddingRight: 5
            }}
         className="bg-background items-center"
        >
         <View
            className="flex flex-row items-center justify-between
             top-0 left-0 z-10 w-[90vw] my-3 p-2"
             >
               <View className="flex flex-row gap-3 items-center justify-between">
                    <View
                     style={{
                        shadowColor: Colors.primary.DEFAULT,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                         }}
                    className="flex justify-center items-center
                    rounded-full bg-primary w-[50] h-[50]"
                    >
                        <Text className="font-bold text-white text-4xl uppercase">
                            {user?.user_name[0]}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm font-pmedium">Hi, {user?.user_name} </Text>
                        <Text className="text-xs font-pregular">
                            Welcome, let's make payments!
                        </Text>
                    </View>
               </View>
               <View className="flex-row gap-2">
                <Link href="/notifications">
                   <Ionicons
                    name="notifications-outline"
                    size={30}
                    color="black"
                    />
                </Link>


               </View>

            </View>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            showsHorizontalScrollIndicator ={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    //justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    margin: 2,
                    gap: 15,
                    backgroundColor: Colors.background.DEFAULT
                }}
            >

                <View className="w-[90vw] text-white bg-primary-200 h-[130] rounded-xl">
                   <View className="w-[90vw] flex flex-col text-white p-5
                   bg-primary h-[95] gap-1 rounded-xl shadow-lg shadow-primary-100">

                       <View className="flex justify-between flex-row">
                           <View className="flex-row items-center gap-2">
                               <Text className="font-pregular text-white">Available Balance</Text>
                               <TouchableOpacity
                                  onPress={() => setIsVisible(i => !i)}
                               >
                                   <Entypo name={isVisible ? "eye" : "eye-with-line"} size={24} color="white" />
                               </TouchableOpacity>
                           </View>
                           <View
                           style={{
                                shadowColor: "gray", //Colors.primary.second,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                           className="bg-white w-30
                           rounded-xl text-center p-2 h-[35]"
                           >
                                <Link href="/addMoney">
                                    <Text className="font-pmedium text-primary">+ Add Money</Text>
                                </Link>
                           </View>
                       </View>

                       <View>
                           <Text className="text-2xl font-semibold text-white">
                               { isVisible ? `${formattedBalance}` : "*****"}
                           </Text>
                       </View>

                   </View>

                   <View className="p-2 justify-center items-center">
                       <Text className="text-xs font-pregular">
                           Total commission: <Text className="font-psemibold">₦20,000</Text>
                           </Text>
                   </View>
                </View>

                <View
                className="w-[90vw] text-white py-4 justify-center gap-4 rounded-xl shadow-lg shadow-primary-100"
                style={{ backgroundColor: "#ffffff" }}
                >
                    <View className="flex flex-row  justify-around">
                        <Icon
                        title="Data"
                        link="/data"
                        icon={
                             <MaterialCommunityIcons
                                name= "cellphone-nfc"
                                size={30}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />

                        <Icon
                        title="Airtime"
                        link="/airtime"
                        icon={
                            <FontAwesome5
                            name="phone-square"
                            size={30}
                            color={ Colors.primary.DEFAULT } />
                             }
                        />

                         <Icon
                        title="Electricity"
                        link="/electricity"
                        icon={
                             <Foundation
                                name= "lightbulb"
                                size={30}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />
                    </View>

                    <View className="flex flex-row  justify-around ">
                        <Icon
                        title="Bills"
                        link="/bills"
                        icon={
                             <Ionicons
                                name= "receipt"
                                size={25}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />

                        <Icon
                        title="Transfer"
                        link="transfer"
                        icon={
                             <FontAwesome6
                                name= "money-bill-transfer"
                                size={25}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />

                         <Icon
                        title="More"
                        link="/more"
                        icon={
                             <MaterialIcons
                                name= "read-more"
                                size={30}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />
                    </View>
                </View>

                <View className="w-[90vw] flex-1 text-white
                bg-white max-h-[190] rounded-xl mb-[10] shadow-lg shadow-primary-100">
                { loading ?
                    <View className="flex-grow justify-center items-center">
                        <ActivityIndicator
                            color={Colors.primary.DEFAULT}
                            size="large"
                        />
                    </View> :
                    <FlatList
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={ ({item}) => (
                        <TouchableOpacity
                        //onPress= {() => router.push(`/transaction/${JSON.stringify(item)}`)}
                        onPress= {() => router.push(`/transaction/${item.id}`)}
                        >
                            <TransactionHistory
                            amount={item?.amount}
                            description={item?.t_disc}
                            date={item?.t_date}
                            status={item?.status}
                            type={item?.t_type}
                            />
                        </TouchableOpacity>
                        )}

                    />
                }
                </View>

            </ScrollView>
             <Link href="/notifications"
              className="absolute
             bottom-[20] right-8 z-10 "
             >
             <View className="bg-white rounded-full shadow-xl w-[55] h-[55]
             justify-center items-center"
             >

                   <FontAwesome6
                    name="whatsapp"
                    size={50}
                    color="green"
                    />
             </View>
                </Link>
        </SafeAreaView>
    );
}

export default Home;
