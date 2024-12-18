import React, {useContext, useEffect, useRef, useState} from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {useRouter, router} from "expo-router"
import {SafeAreaView} from "react-native-safe-area-context"
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "@/constants/Colors"
import {handleLogout} from "@/components/logout";
import {GlobalContext} from "@/context/globalProvider"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton from "@/components/customButton"
import CustomBottomSheet from "@/components/customBottomSheet"
import Pin from "@/components/pin"
import { useFocusEffect } from '@react-navigation/native';




const Profile = () => {

    const ref = useRef()
    const {user, setIsLogIn} = useContext(GlobalContext)
    const [isVerified, setIsVerified] = useState(false);

    const handleClose = () => {
        ref.current.close()
        }

    const handleSuccessVerification = () => {
        ref.current.close()
        router.replace("/profileUpdate")
        }

  return (
    <SafeAreaView
    className="flex-1 bg-background"
    >
        <ScrollView
            showsVerticalScrollIndicator = {false}
            showsHorizontalScrollIndicator ={false}
            contentContainerStyle={{
                alignItems: "center",
                flexGrow: 1,
                gap: 10,
                padding: 20
             }}
        >
            <View className="my-5 gap-4 items-center">
                <View className="h-[70] w-[70] items-center justify-center bg-white rounded-full">
                    <Text className="text-5xl uppercase text-primary">{user?.user_name[0]}</Text>
                </View>
                <Text className="font-psemibold text-lg uppercase">{user?.full_name}</Text>
            </View>

            <Text className="text-left w-[100%] font-pthin">Personal Information</Text>
            <View className="bg-white w-[100%] p-4 rounded-xl">
                <Text className="font-pthin">Name</Text>
                <Text className="font-pregular mb-2">{user?.full_name}</Text>

                 <Text className="font-pthin">User Name</Text>
                <Text className="font-pregular mb-2">{user?.user_name}</Text>

                <Text className="font-pthin">Email</Text>
                <Text className="font-pregular mb-2">{user?.email}</Text>

                <Text className="font-pthin">Phone number</Text>
                <Text className="font-pregular mb-2">{user?.phone_no}</Text>

                <Text className="font-pthin">Account Type</Text>
                <Text className="font-pregular mb-2">{user?.type}</Text>

                <Text className="font-pthin">Registration Date</Text>
                <Text className="font-pregular mb-2">{user?.created_at}</Text>

                <CustomButton
                    title="Manage security"
                    onPress={() => ref.current.snapToIndex(1)}
                    containerStyle="m-6 mb-2"
                />
            </View>

            <Text className="text-left w-[100%] font-pthin mt-3">Actions</Text>
            <View className="bg-white w-[100%] p-4 rounded-xl">
{/*                 <TouchableOpacity */}
{/*                 onPress= {() => { */}
{/*                     //ref.current?.forceClose(); */}
{/*                     router.push("/notifications") */}
{/*                     } */}
{/*                 } */}
{/*                 className="flex-row justify-between items-center mb-4" */}
{/*                 > */}
{/*                     <View className="flex-row gap-4 items-center"> */}
{/*                         <View */}
{/*                          className="w-[40] h-[40] items-center justify-center rounded-2xl bg-primary-200" */}
{/*                          > */}
{/*                             <MaterialIcons name="notifications" size={24} color={Colors.primary.DEFAULT} /> */}
{/*                         </View> */}
{/*                         <Text className="font-pregular">Notifications</Text> */}
{/*                     </View> */}
{/*                     <AntDesign name="right" size={15} color={Colors.primary.DEFAULT} /> */}
{/*                 </TouchableOpacity> */}

                <TouchableOpacity
                onPress= {() => router.push("/support")}
                className="flex-row justify-between items-center mb-4"
                >
                    <View className="flex-row gap-4 items-center">
                        <View
                         className="w-[40] h-[40] items-center justify-center rounded-2xl bg-primary-200"
                         >
                        <MaterialCommunityIcons
                        name="face-agent"
                        size={24}
                        color={Colors.primary.DEFAULT} />
                        </View>
                        <Text className="font-pregular">Support</Text>
                    </View>
                    <AntDesign name="right" size={15} color={Colors.primary.DEFAULT} />
                </TouchableOpacity>

                <TouchableOpacity
                onPress= {() => handleLogout(setIsLogIn)}
                className="flex-row justify-between items-center"
                >
                    <View className="flex-row gap-4 items-center">
                        <View
                         className="w-[40] h-[40] items-center justify-center rounded-2xl bg-red-100"
                         >
                            <Ionicons name="exit-outline" size={24} color="red" />
                        </View>
                        <Text className="font-pregular">Log out</Text>
                    </View>
                    <AntDesign name="right" size={15} color="red" />
                </TouchableOpacity>
            </View>
        </ScrollView>
        <CustomBottomSheet
            title={"Verify"}
            ref={ref}
            components={
                isVerified ?
                <View className="mt-2 justify-center items-center">
                    <Text>ok</Text>
                </View> :
                <View className="gap-4"
                style={{ flexGrow: 1}}
                >
                    <View className="bg-white rounded-lg mt-4">
                        <Pin
                            handleClose={handleClose}
                            handleSuccessVerification={handleSuccessVerification}
                            //title={`${plan?.network_id}  ${plan?.plan_name} to ${phone}`}
                        />
                    </View>
                </View>
            }
        />
    </SafeAreaView>
  );
};

export default Profile;
