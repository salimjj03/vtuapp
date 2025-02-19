import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl,
    FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
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
import {config} from "../config";
import {handleLogout} from "@/components/logout";
import images from "@/constants/images"
import SlideText from "@/components/textSlide"
import CustomButton from "@/components/customButton"
import Refresh from "@/components/refresh"
import CustomBottomSheet from "@/components/customBottomSheet"
import CreatePin from "@/components/createPin"
import CustomAlert from "@/components/customAlert"
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Clipboard from "expo-clipboard"

const { width: screenWidth } = Dimensions.get("window");


function Home() {
    const router = useRouter()
    const {setIsLogIn, setNotification, notification} = useContext(GlobalContext);
    const { user, setUser } = useContext(GlobalContext);
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
    const [commission, setCommission] = useState(0)
    const [referrals, setReferrals] = useState(0)

    const [transactions, setTransactions ] = useState([]);
    const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1 < user?.accounts?.length ? prevIndex + 1 : 0;
        flatListRef.current?.scrollToOffset({
          offset: newIndex * screenWidth, // Ensure full-width scroll
          animated: true,
        });
        return newIndex;
      });
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [user?.accounts]);

    const ref = useRef(null)

    const handleCopy = async (text) => {
        await Clipboard.setStringAsync(text)
        }

    const handleAmount = (amount) => {
        return new Intl.NumberFormat(
        "en-NG",
        {style: "currency", currency: "NGN" })
        .format(amount)
        }

    const runFocus = () => {
        setIsFocus(true)
        }

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
                    setReferrals(res?.data?.ref)
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

    useEffect( () => setShowNotification(true), [] )

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
      <>
         <View
            className="flex flex-row items-center justify-between
             top-0 left-0 z-10 w-[90vw] my-3 p-2"
             >
                { notification?.length && (
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

                <View className="w-[90vw] flex-1  text-white
                h-[screen] rounded-xl mb-[10] overflow-hidden" >
                    <FlatList
                     ListHeaderComponent={

                 <View className="mb-2 rounded-xl" style={{ gap: 20 }}>

                <View className="justify-center items-center">
                 <View className="w-[80vw] text-white bg-white shadow   rounded-xl items-center" style={{ height: 300}}>
                    <View
                    className="flex-row items-center justify-between
                     top-0 left-0 z-10 w-[90%] bg-primary rounded-xl m-4 p-2 border border-gray-200"
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
                                <SlideText
                                    textStyle="text-white"
                                    message={(notification?.length > 0) && notification[0].message}
                                />
                            </View>
                       </View>

                    </View>

                  { !loading && !error && (
                  <View className="gap-4 w-[90vw] justify-center items-center">
                   <View className="w-[70%] flex flex-col text-white p-3
                    gap-4 justify-center" style={{ height: 100 }}>
                     <View className="justify-center items-center gap-3">
                       <View className="flex gap-4 justify-center flex-row">
                           <View className="">
                               <Text className="text-3xl font-semibold text-primary">
                                    { isVisible ? handleAmount(balance) : "*****"}
                               </Text>
                           </View>

                           <View className="flex-row items-center gap-2">
                               <TouchableOpacity
                                  onPress={() => setIsVisible(i => !i)}
                               >
                                   <Entypo name={isVisible ? "eye" : "eye-with-line"} size={24} color={ Colors.primary.DEFAULT} />
                               </TouchableOpacity>
                           </View>
                       </View>


                    </View>

                   </View>

                   <View className="border border-primary bg-primary w-[70%]"></View>

                   <View className="flex flex-row  w-[90%] justify-around">

                        <View className="justify-center items-center">
                           <Text style={{color: "#F1C40F"}} className="text-lg  font-pregular">Commission</Text>
                           <Text style={{color: "#F1C40F"}} className="font-psemibold text-xl">{handleAmount(commission)}</Text>
                        </View>

                        <View className="justify-center items-center">
                           <Text style={{color: "#8E44AD"}} className="text-lg  font-pregular">Referrals</Text>
                           <Text style={{color: "#8E44AD"}} className="font-psemibold text-xl text-white">{referrals}</Text>
                        </View>


                   </View>
                 </View>

                     )}

                     { (loading || error) && (
                       <View className="h-[150] items-center justify-center w-[50%]" >
                            <Refresh
                            loading={loading}
                            setRefresh={setRefresh}
                            error={error}
                            setError={setError}
                            />
                        </View>
                    )}


                </View>
                </View>

                <View className="" style={{ padding: 1}}>
                        <FlatList
                           snapToInterval={screenWidth} // ✅ Ensures centering while sliding
                            snapToAlignment="center" // ✅ Centers the items
                            decelerationRate="fast"
                            contentContainerStyle={{ alignItems: "center" }}
                          ref={flatListRef}
                          data={user?.accounts}
                          horizontal
                          pagingEnabled // ✅ Ensures full-page scroll
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
                          renderItem={({ item }) => (
                            <View style={{ width: "80vw", margin: 20  }} className="bg-primary-100 p-4 rounded-xl h-[200] mb-3 justify-center shadow-lg gap-2">
                              <Text className="font-psemibold text-xl text-black-100 " numberOfLines={1}>
                                {item.bankName}
                              </Text>
                              <Text className="font-pregular text-lg text-black-100">{item.accountName}</Text>
                              <View className="flex-row justify-between">
                                <Text className="font-pregular text-lg text-black-100">{item.accountNumber}</Text>
                                <TouchableOpacity onPress={() => handleCopy(item.accountNumber)}>
                                  <FontAwesome6 name="copy" size={24} color="black" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        />

                        <View style={{ flexDirection: "row", marginTop: 30 }} className="justify-center">
                        {user?.accounts?.map((_, index) => (
                          <View
                            key={index}
                            style={{
                              width: currentIndex === index ? 10 : 8,
                              height: currentIndex === index ? 10 : 8,
                              borderRadius: 5,
                              backgroundColor: currentIndex === index ? "#000" : "#ccc",
                              marginHorizontal: 5,
                            }}
                          />
                        ))}
                      </View>
                 </View>

                <View className="bg-white flex-1 w-[90vw] my-4 py-4 rounded-xl">

            <View
                className="flex-1 w-[90vw] py-4 bg-white text-white gap-5 rounded-xl"
                >
                    <View className="flex flex-row justify-around">
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

                    <View className="flex flex-row  justify-around">
                        <Icon
                        title="Fund"
                        link="/addMoney"
                        icon={
                              <FontAwesome6
                                    name= "money-bill-transfer"
                                    size={20}
                                    color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />

                        <Icon
                        title="Commission"
                        link="commission"
                        icon={
                            <MaterialIcons
                                 name="attach-money"
                                 size={24}
                                 color={Colors.primary.DEFAULT} />
                             }
                        />

                         <Icon
                        title="Transfer"
                        link="/transfer"
                        icon={
                             <MaterialCommunityIcons
                                 name="bank-transfer"
                                 size={30}
                                 color={"#27AE60"}
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
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />

                        <Icon
                        title="A2C"
                        link="/a2c"
                        icon={
                            <Ionicons
                            name="card-outline"
                            size={24}
                            color={ Colors.primary.DEFAULT } />
                            }
                        />

                         <Icon
                            title="Contact Us"
                            link="/support"
                            icon={
                                 <MaterialCommunityIcons
                                    name="face-agent"
                                    size={30}
                                    color={Colors.primary.DEFAULT }
                                />}
                         />
                    </View>

                    <View className="flex flex-row  justify-around">
                        <Icon
                        title="Bundles"
                        link="/bundle"
                        icon={
                            <AntDesign
                                name="API"
                                size={25}
                                color={ Colors.primary.DEFAULT }
                                 />
                             }
                        />
                    </View>



                </View>

            </View>
           </View>

                         }
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={ ({item}) => null }
                    refreshing={isRefresh}
                    onRefresh={handleRefresh}
                    />
{/*                 } */}
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
    );
}

export default Home;
