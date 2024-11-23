import React from "react";
import {View, Platform, Text, StyleSheet, Image} from "react-native";
import {Tabs} from "expo-router";
import Icon from "../../constants/icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/HapticTab';
import {Colors} from "../../constants/Colors"


function TabLayout(){
    return (
        <>
        <Tabs
            screenOptions={{
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarStyle: {
                height: 80,
                marginBottom: 20,
                width: "95%",
                marginHorizontal: "auto",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
                },
            tabBarShowLabel: false,
        }}
        >
            <Tabs.Screen
                name="home"
                options={{
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <View
                     style={{
                        justifyContent: "center",
                        alignItems: "center",
                     }}>
                        <MaterialCommunityIcons
                        name={ focused ? "home-minus" : "home-minus-outline" }
                        size={35}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}>
                            Home
                        </Text>
                    </View>
                    )
                }}
            />

            <Tabs.Screen
                name="transactions"
                options={{
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <View
                     style={{
                        justifyContent: "center",
                        alignItems: "center",
                     }}>
                        <MaterialCommunityIcons
                        name={ focused ? "file-find" : "file-find-outline" }
                        size={35}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}>
                            History
                        </Text>
                    </View>
                    )
                }}
            />

            <Tabs.Screen
                name="support"
                options={{
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <View
                     style={{
                        justifyContent: "center",
                        alignItems: "center",
                     }}>
                        <MaterialCommunityIcons
                        name="face-agent"
                        size={35}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}>
                            Support
                        </Text>
                    </View>
                    )
                }}
            />

             <Tabs.Screen
                name="profile"
                options={{
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <View
                     style={{
                        justifyContent: "center",
                        alignItems: "center",
                     }}>
                        <MaterialCommunityIcons
                        name="account"
                        size={35} color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}>
                            Profile
                        </Text>
                    </View>
                    )
                }}
            />

        </Tabs>
        </>
        )
    }

const style = StyleSheet.create({
    tabIcon: {
       gap: 3,
        },
    text: {
        fontSize: 20
        }
    })
export default TabLayout