import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GlobalContext } from "@/context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function Home() {
    const { user } = useContext(GlobalContext);

    return (
        <SafeAreaView
        className="items-center"
        style={{ flex: 1, paddingTop: 0 }}
        // className="bg-green-500"
        >
         <View
            className="flex flex-row items-center justify-between
             fixed548 top-0 left-0 z-10 w-[95vw] my-3 p-2"
             >
               <View className="flex flex-row gap-3 items-center justify-between">
                    <View className="flex justify-center items-center rounded-full bg-white w-[50] h-[50]">
                        <Text className="font-bold text-2xl">t</Text>
                    </View>
                    <View>
                        <Text className="text-sm font-pmedium">Hi,  "Salim" </Text>
                        <Text className="text-xs font-pregular">Welcome, let's make payments!</Text>
                    </View>
               </View>

               <Ionicons
                name="notifications-outline"
                size={24}
                color="black"
                />

            </View>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    //justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    margin: 2,
                    gap: 15
                }}
            >

                <View className="w-[95vw] text-white bg-primary-200 h-[130] rounded-xl">
                   <View className="w-[95vw] flex flex-col text-white p-5 bg-primary h-[95] gap-1 rounded-xl">

                       <View className="flex justify-between flex-row">
                           <Text className="font-pregular text-white">Available Balance</Text>
                           <Text className="bg-white w-30 text-primary font-semibold rounded-xl text-center p-2 h-[35]">Add Money</Text>
                       </View>

                       <View>
                           <Text className="text-2xl font-semibold text-white">200,255.15</Text>
                       </View>

                   </View>

                   <View className="p-2">
                       <Text className="text-xs font-pregular">All notifications from admin appear here!</Text>
                   </View>

                </View>

                <View className="w-[95vw] text-white py-4 justify-center gap-2 bg-white rounded-xl">
                    <View className="flex flex-row  justify-around">
                        <View className="flex justify-centergap-3 items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>

                        <View className="flex justify-center items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>

                         <View className="flex justify-center items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>
                    </View>

                    <View className="flex flex-row  justify-around ">
                        <View className="flex justify-center  gap-3 items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>

                        <View className="flex justify-center items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>

                         <View className="flex justify-center items-center">
                            <View className="w-[50] h-[50] bg-primary-200 rounded-2xl"></View>
                            <Text> Data </Text>
                        </View>
                    </View>



                </View>

                <View className="w-[95vw] text-white bg-white h-[130] rounded-xl">
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
