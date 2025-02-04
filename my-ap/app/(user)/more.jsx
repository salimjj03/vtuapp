import React from "react";
import {View, Text, StyleSheet, } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors"
import Entypo from '@expo/vector-icons/Entypo';
import {icons} from "@/constants";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from "@/components/icon"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images"
import AntDesign from '@expo/vector-icons/AntDesign';


const More = () => {

  return (
    <SafeAreaView
    className=" flex-1 items-center bg-background gap-4"
    >
        <View className="bg-white flex-1 w-[90vw] my-4 py-4 rounded-xl">

            <View
                className="flex-1 w-[90vw] py-4 bg-white text-white gap-4 rounded-xl"
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
                                 color={Colors.primary.DEFAULT}
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
    </SafeAreaView>
  );
};


export default More;
