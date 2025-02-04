import React, {useState, useEffect,
    useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import { handleLogout } from "@/components/logout"
import { config } from "../../config"
import {GlobalContext} from "@/context/globalProvider"
import CustomButton from "@/components/customButton"
import {Colors} from "@/constants/Colors"
import CustomAlert from "@/components/customAlert"
import Loading from "@/components/loading"
import Entypo from '@expo/vector-icons/Entypo';

const Commission = () => {

    const {user, setCommission, commission, setIsLogIn} = useContext(GlobalContext);
    const [response, setResponse] = useState(null);
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState()
    const handleAmount = (amount) => new Intl.NumberFormat("en-NG", {style: "currency", currency: "NGN"}).format(amount)
    let formatedBalance = handleAmount(commission);

    const handleCommission = async () => {
        if (!user) {
            return
            }
        setLoading(true)
        try{
              const [commissionData] = await Promise.all([
                    axios.post(`${config.API_URL}/commission`, {}, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                        }
                    })
                  ])
              setResponse(commissionData?.data)
              setCommission(0)

            } catch (err) {
                if (err?.response?.status === 401) {
                    handleLogout(setIsLogIn)
                }
                setResponse(err?.response?.data)

                } finally {
                    setLoading(false)
                    }
    }

    const handleClose = () => {
        setResponse(null)
        }

  return (
    <SafeAreaView
    className=" flex-1 items-center bg-background gap-4"
    >

        <View className="w-[90vw] h-[90] items-center flex-row p-3 mt-4
          bg-white gap-3 rounded-xl shadow-lg shadow-primary-100">
          {
           response && (
            <CustomAlert
            title={response?.status}
            response={response?.message}
            onClose={handleClose}
            />
            )
        }
             <View
                 style={{
                    shadowColor: Colors.primary.DEFAULT,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                     }}
                className="flex justify-center items-center
                rounded-full bg-primary w-[50] h-[50]"
            >
                <Text className="font-bold text-white text-4xl uppercase">
                    {user?.user_name[0]}
                </Text>
            </View>

           <View className="flex justify-between">
               <View className="flex-row items-center gap-2">
                   <Text className="font-pregular ">Commission</Text>
                   <TouchableOpacity
                      onPress={() => setIsVisible(i => !i)}
                   >
                       <Entypo
                       name={isVisible ? "eye" : "eye-with-line"}
                       size={24}
                       color={Colors.primary.DEFAULT}
                       />
                   </TouchableOpacity>
               </View>

           <View>
               <Text className="text-2xl font-semibold">
                   { isVisible ? `${formatedBalance}` : "*****"}
               </Text>
           </View>

           </View>
        </View>

        <CustomButton
           title="Withdraw"
           containerStyle="w-[90vw] bg-primary"
           onPress={handleCommission}
           />
          <Loading
           loading={loading}
           />
    </SafeAreaView>
  );
};


export default Commission;
