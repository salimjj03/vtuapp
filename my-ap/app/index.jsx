import React, { useContext} from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import {Colors} from "../constants/Colors"
import CustomButton from "../components/customButton"
import {StatusBar} from "expo-status-bar"
import {router, Redirect} from "expo-router"
import {GlobalContext} from "@/context/globalProvider"

function App() {

    const { isLogIn, isLoading } = useContext(GlobalContext);

    if (isLogIn && !isLoading) return <Redirect href="home"/>

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}
                className="gap-5">
                   <View className="justify-center items-center gap-5">
                    <Image
                        style={styles.logo}
                        source={images.logo}
                        resizeMode="contain"
                    />

                    <Text className="font-psemibold text-xl">Transact with Ease</Text>
                   </View>
                    <Image
                        style={styles.logoSmall}
                        source={images.logoSmall}
                    />
                    <Text className="text-2xl font-pbold w-[90vw]">Digital Connectivity in your fingertip!</Text>
                    <Text className="text-center w-[90vw] text-gray font-pregular">
                        Buy Airtime, Top Up Data, Pay Bill or
                        subscribe cables with ease and comfort.</Text>
                    <CustomButton
                    title="Continue to Sign-in"
                    containerStyle={`w-[90vw]`}
                    onPress={() => { router.push("/signin")}}
                    />

                </View>

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
        //gap: 10, // Gap is not supported in older React Native versions. Use margins or paddings if necessary.
        flex: 1,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 65, // Rounded full requires half of the width or height for the border radius
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
