import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl,
    FlatList, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
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
import images from "@/constants/images"
import SlideText from "@/components/textSlide"
import CustomButton from "@/components/customButton"
import Refresh from "@/components/refresh"
import CustomBottomSheet from "@/components/customBottomSheet"
import CreatePin from "@/components/createPin"
import CustomAlert from "@/components/customAlert"
import WebDashboard from "@/components/webDashboard"


function Home() {
    const router = useRouter()
    const {setIsLogIn, setSingleTransaction, setUser, isView, setIsView} = useContext(GlobalContext);
    const { user, setBanks, setCommission, commission, notification, setNotification } = useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(false)
    const [isPinSet, setIsPinSet] = useState(true)
    const [loadingPin, setLoadingPin] = useState(false)
    const [pinResponse, setPinResponse] = useState(null);
    const [isFocus, setIsFocus] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    //const [commission, setCommission] = useState(0)

    const [transactions, setTransactions ] = useState([]);
    const ref = useRef(null)
    const handleAmount = (amount) => {
        return new Intl.NumberFormat(
        "en-NG",
        {style: "currency", currency: "NGN" })
        .format(amount)
        }

    const runFocus = () => {
        setIsFocus(true)
        }

    useEffect( () => setShowNotification(true), [] )
    useEffect(() => {
        setLoading(true);
        setError(false)
        if (user) {
            setLoading(true);
            setError(false);

                // Fetch transactions data
            axios.get(`${config.API_URL}/dashboard_data`, {
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                    }
                })
            .then( (res) => {
                    setTransactions(res?.data?.transactions);
                    setBalance(res?.data?.user?.balance);
                    setCommission(res?.data?.user?.commission)
                    if ((res?.data?.notifications?.length > 0 && notification?.length > 0 ) &&
                     (res?.data?.notifications[0] == notification[0])){
                    setIsView(true)
                    } else {
                        setIsView(false)
                        setNotification(res?.data?.notifications)
                        }
                    setNotification(res?.data?.notifications)
                    setLoading(false);
                    if (user?.pin === null || user?.pin === "") {
                        setIsPinSet(false)
                        setTimeout( () => {
                            //setIsFocus(true)

                            ref?.current?.snapToIndex(2)

                            }, 3000 )

                        runFocus()
                        }
                })
            .catch( (err) => {
                console.log("Error fetching transactions:", err.response);
                if (err?.response?.status === 401) {
                    handleLogout(setIsLogIn);
                }
                setError(true);
                })
            }

        }, [user, refresh])



    const handleRefresh = () => {
        setIsRefresh(true)
        setRefresh( r => !r)

        setTimeout( () => {
            setIsRefresh(false)
            }, 2000 )
        }

    const handlePinCreation = (pin) => {
        setLoadingPin(true)
        ref?.current?.snapToIndex(0);
        const data = {pin: pin}
        axios.put(`${config.API_URL}/users`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            setPinResponse(res?.data)
            setUser({...user, pin: pin})
            ref?.current?.close()
            setLoadingPin(false)
            setIsPinSet(true)
            } )
        .catch((err) => {
            setLoadingPin(false)
            setPinResponse(res?.response?.data)
            })
        }

    const handleClose = () => {
        ref?.current?.close()
        setIsPinSet(true)
        setIsFocus(false)
        }

    const handleCloseResponse = () => {
        setPinResponse(null);
        setIsPinSet(true)
        }

    return (

        <SafeAreaView
        style={{
            flex: 1,
            paddingLeft: 4,
            paddingRight: 5
            }}
         className="bg-background items-center"
        >

         { pinResponse && (
                    <CustomAlert
                    title={pinResponse?.status}
                    response={pinResponse?.message}
                    onClose={handleCloseResponse}
                    />
             )}

             { (isPinSet && notification?.length > 0 && showNotification) && (
             <CustomAlert
                title={"Notification"}
                response={notification[0].message}
                onClose={() => setShowNotification(false)}
             />
             )}

            { Platform.OS === "web" ?
            <WebDashboard /> :
            <>
             <View
                className="flex flex-row items-center justify-between
                top-0 left-0 z-10 w-[90vw] my-3 p-2"
             >
             { !isView && (
                    <View className="w-[20] h-[20] right-0 rounded-full
                    bg-red-500 absolute top-0 justify-center items-center"

                    >
                        <Text className="text-white  text-center">{notification?.length}</Text>
                    </View>
                    )}
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
                            { user?.user_name && (
                            <Text className="font-bold text-white text-4xl uppercase">
                                {user?.user_name[0]}
                            </Text>
                            )}
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

            <View className="w-[90vw] flex-1 text-white
            h-[screen] rounded-xl mb-[10] overflow-hidden">

                <View className="w-[90vw] text-white bg-white rounded-xl items-center mb-3">
                     <View
                     className="flex-row items-center justify-between
                     top-0 left-0 z-10 w-[90%] rounded-xl m-4 p-2 border border-gray-200"
                     >
                         <View className="flex flex-row gap-3 items-center justify-between ">
                             <View className="w-[30] h-[30] rounded-full shadow-lg">
                                 <Image
                                 source={images.logo}
                                 resizeMode="contain"
                                 style={{
                                    width: 30,
                                    height: 30
                                  }}
                                  className="rounded-full"
                                 />
                             </View>

                             <View className=" w-[240]">
                                 { notification &&
                                 <SlideText
                                     textStyle="text-primary"
                                     message={(notification?.length > 0) && notification[0].message}
                                 />
                                 }
                             </View>
                         </View>

                     </View>

    {/*                     balance */}
                      {!loading  && !error && (
                       <View className="w-[100%] flex flex-col text-white p-3
                       bg-primary  gap-2 rounded-xl shadow-xl">
                         <View className="justify-center items-center">
                           <View className="flex gap-4 justify-center flex-row">
                               <View className="">
                                   <Text className="text-3xl font-semibold text-white">
                                        { isVisible ? handleAmount(balance || 0) : "*****"}
                                   </Text>
                               </View>

                               <View className="flex-row items-center gap-2">
    {/*                                <Text className="font-pregular text-white">Available Balance</Text> */}
                                   <TouchableOpacity
                                      onPress={() => setIsVisible(i => !i)}
                                   >
                                       <Entypo name={isVisible ? "eye" : "eye-with-line"} size={24} color="white" />
                                   </TouchableOpacity>
                               </View>
                           </View>

                            <Text className="text-s text-white font-pregular">
                               commission: <Text className="font-psemibold">{handleAmount(commission || 0)}</Text>
                            </Text>
                        </View>

                           <View className="border border-white"></View>

                           <View className="flex flex-row  justify-around">
                            <View className="items-center">
                                <TouchableOpacity
                                onPress={() => router.push("/addMoney")}
                                className="w-[45] h-[45] bg-white rounded-full
                                justify-center items-center z-10"
                                >
                                     <FontAwesome6
                                        name= "money-bill-transfer"
                                        size={20}
                                        color={ Colors.primary.DEFAULT }
                                     />
                                </TouchableOpacity>
                                <Text className="text-white font-pregular" >Fund</Text>
                            </View>

                            <View className="items-center">
                                <TouchableOpacity
                                onPress={() => router.push("/transfer")}
                                className="w-[45] h-[45] bg-white rounded-full
                                justify-center items-center z-10"
                                >
                                     <MaterialCommunityIcons
                                         name="bank-transfer"
                                         size={30}
                                         color={Colors.primary.DEFAULT}
                                     />
                                </TouchableOpacity>
                                <Text className="text-white font-pregular" >Transfer</Text>
                            </View>

                            <View className="items-center">
                                <TouchableOpacity
                                onPress={() => router.push("/transactions")}
                                className="w-[45] h-[45] bg-white rounded-full
                                justify-center items-center z-10"
                                >
                                     <MaterialCommunityIcons
                                         name="note-search-outline"
                                         size={24}
                                         color={Colors.primary.DEFAULT}
                                     />
                                </TouchableOpacity>
                                <Text className="text-white font-pregular" >History</Text>
                            </View>

                        </View>
                       </View>
                       )}
                    { (loading || error) && (
                       <View className="h-[150] items-center justify-center">
                            <Refresh
                            loading={loading}
                            setRefresh={setRefresh}
                            error={error}
                            setError={setError}
                            />
                        </View>
                    )}
                </View>
                <FlatList
                     ListHeaderComponent={

                         <View className="gap-3 mb-2 flex-1 rounded-xl">
                            <View
                            className="flex-1 w-[90vw] py-4 bg-white text-white justify-center gap-4 rounded-xl"
                            >
                                <View className="flex flex-row  justify-around">
                                    <Icon
                                    title="Data"
                                    link="/data"
                                    icon={
                                         <MaterialCommunityIcons
                                            name= "cellphone-nfc"
                                            size={30}
                                            color={ "#27AE60" }
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
                                        color={ "#3498DB" } />
                                         }
                                    />

                                     <Icon
                                    title="Electricity"
                                    link="/electricity"
                                    icon={
                                         <Foundation
                                            name= "lightbulb"
                                            size={30}
                                            color={ "#FF5733"  }
                                             />
                                         }
                                    />
                                </View>

                                <View className="flex flex-row  justify-around">
                                    <Icon
                                    title="Cable"
                                    link="/cable"
                                    icon={
                                         <Ionicons
                                            name= "receipt"
                                            size={25}
                                            color={ "#8E44AD" }
                                             />
                                         }
                                    />

                                    <Icon
                                    title="Commission"
                                    link="commission"
                                    icon={
                                        <MaterialIcons
                                             name="attach-money"
                                             size={35}
                                             color={"#F1C40F"} />
                                         }
                                    />

                                     <Icon
                                    title="More"
                                    link="/more"
                                    icon={
                                         <MaterialIcons
                                            name= "read-more"
                                            size={35}
                                            color={ "#E74C3C" }
                                             />
                                         }
                                    />
                                </View>
                            </View>
                        </View>
                    }
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={ ({item}) => (
                        <TouchableOpacity
                        className="bg-white rounded-xl my-1"
                        //onPress= {() => router.push(`/transaction/${JSON.stringify(item)}`)}
                        onPress= {() => {
                            setSingleTransaction(item)
                            router.push(`/transaction/${item.id}`)
                            }
                        }
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
                    refreshing={isRefresh}
                    onRefresh={handleRefresh}
                    />
            </View>


             <Link href="/support"
              className="absolute
             bottom-[15] right-5 z-10 "
             >

             { isPinSet && (
             <View className="bg-white rounded-full shadow-xl w-[55] h-[55]
             justify-center items-center"
             >

                   <FontAwesome6
                    name="whatsapp"
                    size={50}
                    color="green"
                    />
             </View>
             )}
             </Link>


            { !isPinSet && (
                 <CustomBottomSheet
                    ref={ref}
                    title="Create Transaction Pin"
                    components={
                        !loadingPin ?
                        <View className="gap-2 bg-white w-[90vw] mt-3 rounded-xl items-center p-3">

                            <CreatePin
                            isFocus={isFocus}
                            setOpen={setIsPinSet}
                            handleSuccessVerification={handlePinCreation}
                            />

                             <CustomButton
                                title={"Close"}
                                onPress={ () => handleClose()}
                                containerStyle="w-[40%] bg-primary"

                                />
                        </View> :
                        <View>
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary.DEFAULT}
                            />
                        </View>

                        }
                    />
                    )}
                </>
            }
        </SafeAreaView>
    );
}

export default Home;
