import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import {Colors} from "@/constants/Colors"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Email from "@/components/email"
import Whatsapp from "@/components/whatsapp"
import PhoneCall from "@/components/phoneCall"
import WhatsAppCommunity from "@/components/whatsappcommunity"


export default function Support() {

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");

  return (
    <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.background.DEFAULT}}
    >
        <ScrollView
            showsVerticalScrollIndicator = {false}
            showsHorizontalScrollIndicator ={false}
            contentContainerStyle={{
            flexGrow: 1,
             gap: 15,
             padding: 15
             }}
        >
            <Text className="font-thin mt-2">Chart</Text>
            <View className=" rounded-xl bg-white p-2">

                <Whatsapp />

                <WhatsAppCommunity />
            </View>

             <Text className="font-thin mt-2">Call</Text>
             <View className="rounded-xl bg-white p-2">
                <PhoneCall
                phone="+234 803 376 0736"
                />

                <PhoneCall
                phone="+234 902 093 4923"
                />
             </View>

             <Text className="font-thin mt-2">Email</Text>
             <View className="rounded-xl bg-white p-2">
                <Email/>
             </View>
        </ScrollView>
    </SafeAreaView>
  );
}
