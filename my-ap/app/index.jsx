import React, { useContext} from "react";
import { View, Text, Image, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import {Colors} from "../constants/Colors"
import CustomButton from "../components/customButton"
import Web from "@/components/web"
import {StatusBar} from "expo-status-bar"
import {router, Redirect} from "expo-router"
import {GlobalContext} from "@/context/globalProvider"

function App() {

    const { isLogIn, isLoading } = useContext(GlobalContext);

    if (isLogIn && !isLoading) return <Redirect href="confirmLogin"/>

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                { Platform.OS !== "web"  ?
                <View style={styles.container}
                className="gap-20">

                   <Text className="font-psemibold text-xl">Hi, Welcome</Text>

                   <View className="justify-center items-center gap-5">
                    <Image
                        style={styles.logo}
                        source={images.logo}
                        resizeMode="contain"
                    />

                   </View>
{/*                     <Image */}
{/*                         style={styles.logoSmall} */}
{/*                         source={images.logoSmall} */}
{/*                     /> */}
                    <Text className="text-center w-[90vw] text-grady font-psemibold text-center">
                        The Best and Cheapest Application for your Data, Airtime, Electricity Bills,
                        Cable Subscriptions and other VTU Services
                   </Text>
{/*                     <Text className="text-center w-[90vw] text-gray font-pregular"> */}
{/*                         Buy Airtime, Top Up Data, Pay Bill or */}
{/*                         subscribe cables with ease and comfort.</Text> */}
                    <CustomButton
                    title="Continue to Sign-in"
                    containerStyle={`w-[90vw] bg-primary`}
                    onPress={() => { router.push("/signin")}}
                    />

                </View>
                :
                <View><Web /></View>}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "white",
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 65,
        shadowColor: Colors.primary.DEFAULT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Adds shadow effect for Android
    },
    logoSmall: {
        height: 180,
        width: 260,
    }
});

export default App;
