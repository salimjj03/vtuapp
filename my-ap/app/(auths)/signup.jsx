import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView,
    Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import FormField from "@/components/formField"
import CustomButton from "@/components/customButton"
import images from "@/constants/images"
import {Colors} from "@/constants/Colors"
import {Link} from "expo-router"


function SignUp(){

    const [form, setForm] = useState(
        {
            full_name: "",
            user_name: "",
            email: "",
            phone: "",
            ref_id: "",
            password: ""
         }
        )
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const [error, setError] = useState(false)

    const required = ["password", "user_name"];

    function submitLogging(){
        let error = false
        setIsSubmitted(true);
        for(let i of required) {
            if (!form[i].trim()) {
                error = true
                return
                }
            }
        if (error) {
            return
            }
        setIsLoading(true)
        console.log(form)
        }

    return (
        <SafeAreaView className="h-full">
            <ScrollView
            contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                gap: 15,
                paddingTop: 20,
                paddingBottom: 20,
                }}>
                {/* <View >
                <Image
                source={images.logo}
                style={{

                    width: 100,
                    height: 100,
                    shadowColor: Colors.primary.DEFAULT,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    }}
                className="rounded-full"
                resizeMode="contain"
                />
                </View>
 */}
                <Text className="font-pbold text-3xl w-[85vw]">Sign Up</Text>
                <View className="bg-white pt-2 justify-center
                rounded-xl px-4  w-[90vw] "
                style={{
                    shadowColor: Colors.primary.DEFAULT,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    }}
                >
                    <FormField
                     title="Full Name"
                     value={form.full_name}
                     placeholder=" Full Name"
                     onChange={(e) => setForm({...form, full_name: e})}
                     required={true}
                     isSubmitted={isSubmitted}
                     labelShow={true}
                     />

                     <FormField
                     title="UserName"
                     value={form.user_name}
                     placeholder=" User name"
                     onChange={(e) => setForm({...form, user_name: e})}
                     required={true}
                     isSubmitted={isSubmitted}
                     labelShow={true}
                     />

                     <FormField
                     title="email"
                     value={form.email}
                     placeholder=" Email"
                     onChange={(e) => setForm({...form, email: e})}
                     otherStyles=""
                     required={true}
                     isSubmitted={isSubmitted}
                     keyboardType="email-address"
                     labelShow={true}
                     />

                     <FormField
                     title="phone"
                     value={form.phone}
                     placeholder=" phone"
                     onChange={(e) => setForm({...form, phone: e})}
                     otherStyles=""
                     required={true}
                     isSubmitted={isSubmitted}
                     keyboardType="phone-pad"
                     labelShow={true}
                     />

                     <FormField
                     title="ref_id (optional)"
                     value={form.ref_id}
                     placeholder=" ref_id"
                     onChange={(e) => setForm({...form, ref_id: e})}
                     otherStyles=""
                     required={true}
                     isSubmitted={isSubmitted}
                     labelShow={true}
                     />

                    <FormField
                     title="Password"
                     value={form.password}
                     placeholder=" Password"
                     onChange={(e) => setForm({...form, password: e})}
                     required={true}
                     isSubmitted={isSubmitted}
                     labelShow={true}
                     />

                     <CustomButton
                     containerStyle="my-5"
                     title="Create"
                     onPress={submitLogging}
                     isLoading={isLoading}
                     />
                </View>

                <View>
                    <Text className="font-psemibold text-xl">
                        <Link href="/signin">
                            <Text className="text-black-200">Login </Text>
                        </Link>
                         |
                         <Link href="/">
                            <Text className="text-primary"> Home</Text>
                         </Link>
                    </Text>
                </View>


            </ScrollView>
        </SafeAreaView>
        )
    }

export default SignUp