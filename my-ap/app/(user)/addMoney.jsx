import React, {useContext} from "react"
import {View, Text, ScrollView, TouchableOpacity} from "react-native"
import {GlobalContext} from "@/context/globalProvider"
import {SafeAreaView} from "react-native-safe-area-context"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Clipboard from "expo-clipboard"

const AddMoney = () => {
    const {user} = useContext(GlobalContext)

    const handleCopy = async (text) => {
        await Clipboard.setStringAsync(text)
        }
    return(
        <SafeAreaView
        className="flex-1 items-center bg-background"
        >
            <ScrollView
            contentContainerStyle={{
                flex: 1,
                gap: 15,
                marginTop: 15
                }}
            >
            {
                user?.accounts?.map( (item, i) => (
                    <View key={i} className="bg-primary-100 w-[90vw] p-4 rounded-xl h-[130] justify-center shadow-lg gap-2">
                        <Text className="font-psemibold text-xl text-black-100 " numberOfLines={1}>{item.bankName}</Text>
                        <Text className="font-pregular text-lg text-black-100">{item.accountName}</Text>
                        <View className="flex-row justify-between">
                            <Text className="font-pregular text-lg text-black-100">{item.accountNumber}</Text>
                            <TouchableOpacity
                                onPress={ () => handleCopy(item.accountNumber) }
                            >
                              <FontAwesome6 name="copy" size={24} color="" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    ) )
                }
            </ScrollView>
        </SafeAreaView>
        )
    }

export default AddMoney
