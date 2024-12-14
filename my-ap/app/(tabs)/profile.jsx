import React, {useRef} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import CustomBottom from "@/components/customBottomSheet"
import Pin from "@/components/pin"
import {SafeAreaView} from "react-native-safe-area-context"
import {BottomSheetView} from "@gorhom/bottom-sheet"


function Transactions(){

    const bottomSheetRef = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
            <View>

            <Text> {"Transactions"} </Text>
            <Text> {"Transactions"} </Text>
             <TouchableOpacity
                className="w-[120] h-[40] rounded-lg bg-green-500 items-center justify-center"
                onPress={ () => bottomSheetRef?.current.snapToIndex(0)}
                >
                    <Text className="text-lg text-white">Close</Text>
                </TouchableOpacity>
            </View>
            <CustomBottom
                ref={bottomSheetRef}
                components={<Pin/>}
            />
        </SafeAreaView>
        )
    }

export default Transactions