import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import {View, Text} from "react-native"
//import 'react-native-reanimated';
import "../global.css"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from "@/constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';

import GlobalProvider from "@/context/globalProvider";
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

      const [fontsLoaded, error] = useFonts({
      "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
      if (error) throw error;

      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
      return null;
    }


  return (
     <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auths)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(tabs)"
        options={{
            headerShown: false,
            headerStyle: {
                 //backgroundColor: Colors.gray.second, //
                 backgroundColor: 'transparent'
                },
            headerShadowVisible: false,
            headerLeft: () => (
                                <View className="flex flex-row gap-3 items-center w-[80vw]">
                                    <View className="flex justify-center items-center rounded-full bg-white w-[50] h-[50]">
                                        <Text className="font-bold text-2xl">t</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm">Hi,  "Salim" </Text>
                                        <Text className="text-xs">Welcome, let's make payments!</Text>
                                    </View>
                                </View>
                            ),
                            headerTitle: () => null,
                            headerRight: () => (
                                <Ionicons name="notifications-outline" size={24} color="black" />
                            )
                        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar
        backgroundColor="white"
      />
      </GlobalProvider>
  );
}
