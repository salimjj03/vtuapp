import React, {useState, useEffect, useRef,
    useContext, useMemo} from "react";
import {View, Text, Image, StyleSheet, FlatList,
    TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import { handleLogout } from "@/components/logout"
import { config } from "../../config"
import {GlobalContext} from "@/context/globalProvider"
import CustomBottomSheet from "@/components/customBottomSheet"
import images from "@/constants/images"
import CustomButton from "@/components/customButton"
import FormField from "@/components/formField"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import {Colors} from "@/constants/Colors"
import TransactionHistory from "@/components/transactionHistory"
import {useRouter} from "expo-router"



const Transactions = () => {

    const router = useRouter();
    const {user, setIsLogIn} = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);
    const [searchValue, setSearchValue] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect( () => {

        const fetchData = async () => {
            if (!user) {
                return
                }
            setLoading(true)
            try{
                  const [transactionsData] = await Promise.all([
                        axios.get(`${config.API_URL}/transactions`, {
                            headers: {
                            "Authorization": `Bearer ${user.token}`
                            }
                        })
                      ])

                  setTransactions(transactionsData?.data)
                  setSearchValue(transactionsData?.data)
                  console.log(transactionsData?.data)

                } catch (err) {
                    if (err?.response?.status === 401) {
                        handleLogout(setIsLogIn)
                    }
                    console.log(err)

                    } finally {
                        setLoading(false)
                        }
        }
    fetchData()
    }, [user] )

    const onSearch = (query) => {
        setQuery(query)
        const filtered =  transactions?.filter(
            (item) => item.t_disc.toLowerCase().includes(query.toLowerCase()) ||
            item.status.toLowerCase().includes(query.toLowerCase())

            )
        setSearchValue(filtered)
        }

  return (
    <SafeAreaView
    className="bg-background"
    style={styles.container}
    >

       <View className="flex-1 w-[95vw] gap-3 mt-4">
           <View className="p-4 bg-white rounded-lg m-1">
               <View className="h-8 flex-row justify-between">
                   <Text className="font-thin">Total</Text>
                   <Text className="font-semibold">{searchValue.length}</Text>
               </View>
               <FormField
                    placeholder={" Search Record..."}
                    value={query}
                    onChange={onSearch}
               />
           </View>

            <FlatList
                data={searchValue}
                renderItem={ ({item}) => (
                    <TouchableOpacity
                    onPress= {() => router.push(`/transaction/${item.id}`)}
                    className="m-1"
                    >
                        <TransactionHistory
                            amount={item?.amount}
                            description={item?.t_disc}
                            date={item?.t_date}
                            status={item?.status}
                            type={item?.t_type}
                        />
                    </TouchableOpacity>
                    )}
                keyExtractor={ (item) => item.id}
            />
       </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: "center",
      backgroundColor:
      Colors.background.DEFAULT
      },

});

export default Transactions;
