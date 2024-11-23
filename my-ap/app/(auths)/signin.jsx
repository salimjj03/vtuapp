import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import FormField from "@/components/formField"


function SignIn(){

    const [form, setForm] = useState(
        {
            user_name: "",
            password: ""
         }
        )

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView className="bg-red-500 ">
                <View className="bg-green-200 justify-center px-4 my-6  w-full min-h-[85]">
                    <FormField
                     title="UserName"
                     value={form.user_name}
                     placeholder="User name"
                     onChange={(e) => setForm({...form, user_name: e})}
                     />

                    <FormField
                     title="Password"
                     value={form.password}
                     placeholder="Password"
                     onChange={(e) => setForm({...form, password: e})}
                     />

                </View>
            </ScrollView>
        </SafeAreaView>
        )
    }

export default SignIn