import React from "react";
import {View, Platform, Text, StyleSheet, Image} from "react-native";
import {Tabs} from "expo-router";
import Icon from "../../constants/icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/HapticTab';
import {Colors} from "../../constants/Colors"



function TabLayout(){
    return (
        <Tabs
            //style={{ backgroundColor: "green" }}
            screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarStyle: {
                //alignSelf: 'center',
                height: 80,
                marginBottom: 5,
                backgroundColor: "#ffffff",
                width: "95%",
                marginHorizontal: "auto",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
                paddingBottom: 20
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
                    className=""
                     style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "200%",
                     }}>
                        <MaterialCommunityIcons
                        name={ focused ? "home-minus" : "home-minus-outline" }
                        size={30}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}
                        style={style.text}
                        >
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
                        height: "100%",
                        width: "200%"
                     }}>
                        <MaterialCommunityIcons
                        name={ focused ? "file-find" : "file-find-outline" }
                        size={30}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}
                        style={style.text}
                        >
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
                        height: "100%",
                        width: "200%"
                     }}>
                        <MaterialCommunityIcons
                        name="face-agent"
                        size={30}
                        color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT} />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700" } `}
                        style={style.text}
                        >
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
                        width: "200%"
                     }}>
                        <MaterialCommunityIcons
                        name="account"
                        size={30} color={focused ? Colors.primary.DEFAULT : Colors.gray.DEFAULT}
                        />
                        <Text
                        className={`${focused ? "font-psemibold text-primary" : "font-pregular text-gray-700 w-50" } `}
                        style={style.text}
                        >
                            Profile
                        </Text>
                    </View>
                    )
                }}
            />
        </Tabs>
        )
    }

const style = StyleSheet.create({
    tabIcon: {
       gap: 1,
        },
    text: {
        fontSize: 10
        }
    })
export default TabLayout