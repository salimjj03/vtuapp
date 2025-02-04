import React, {useContext} from "react";
import {View, Platform, Text, StyleSheet, Image} from "react-native";
import {Tabs, Redirect} from "expo-router";
import Icon from "../../constants/icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/HapticTab';
import {Colors} from "../../constants/Colors"
import {GlobalContext} from "@/context/globalProvider";
import images from "@/constants/images"


function TabLayout(){

    const { isLogIn, isLoading } = useContext(GlobalContext);
    if (!isLogIn && !isLoading) return <Redirect href="/signin"/>

    return (
        <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: "gray",
    headerShown: false,
    tabBarStyle: {
      height: 60,
      backgroundColor: Colors.primary.DEFAULT,
      paddingTop: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      position: 'absovlute',  // Ensure it overlaps correctly
    },
    tabBarShowLabel: false,
  }}
>
  <Tabs.Screen
    name="home"
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={focused ? "home-minus" : "home-minus-outline"}
            size={30}
            color={focused ? "white" : Colors.gray.DEFAULT}
          />
          <Text className={`${focused ? "font-psemibold text-white" : "font-pregular text-gray-200"}`} style={styles.text}>
            Home
          </Text>
        </View>
      ),
    }}
  />

  <Tabs.Screen
    name="transactions"
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={focused ? "file-find" : "file-find-outline"}
            size={30}
            color={focused ? "white" : Colors.gray.DEFAULT}
          />
          <Text className={`${focused ? "font-psemibold text-white" : "font-pregular text-gray-200"}`} style={styles.text}>
            History
          </Text>
        </View>
      ),
    }}
  />

  <Tabs.Screen
    name="more"
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View className="justify-center items-center" style={styles.floatingButton}>
          <MaterialCommunityIcons
            name="dots-horizontal-circle"
            size={63}  // Increase size for emphasis
            color={Colors.primary.DEFAULT}
            style={styles.shadow}
          />
        </View>
      ),
    }}
  />

  <Tabs.Screen
    name="support"
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View  style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="face-agent"
            size={30}
            color={focused ? "white" : Colors.gray.DEFAULT}
          />
          <Text className={`${focused ? "font-psemibold text-white" : "font-pregular text-gray-200"}`} style={styles.text}>
            Support
          </Text>
        </View>
      ),
    }}
  />

  <Tabs.Screen
    name="profile"
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account"
            size={30}
            color={focused ? "white" : Colors.gray.DEFAULT}
          />
          <Text className={`${focused ? "font-psemibold text-white" : "font-pregular text-gray-200"}`} style={styles.text}>
            Profile
          </Text>
        </View>
      ),
    }}
  />
</Tabs>

        )
    }

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 7,
  },
  floatingButton: {
    position: "absolute",
    bottom: 2, // Adjust to overlap tab bar
    alignSelf: "center",
    backgroundColor: Colors.primary.second,
    borderRadius: 50,
    padding: 2,
    height: "70",
    width: "70"
  },
  shadow1: {
    shadowCsolor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // For Android shadow
  },
});

export default TabLayout