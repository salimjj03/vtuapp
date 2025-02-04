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
import Refresh from "@/components/refresh"

const Transactions = () => {

    const router = useRouter();
    const {user, setIsLogIn, setSingleTransaction} = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);
    const [searchValue, setSearchValue] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect( () => {

        const fetchData = async () => {
            if (!user) {
                return
                }
            setLoading(true)
            setError(false)
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


                } catch (err) {
                    if (err?.response?.status === 401) {
                        handleLogout(setIsLogIn)
                    }
                    //console.log(err)
                    //setError(true)
                    if (err?.response?.data?.message != "No transactions found") {
                        setError(true)
                    }
                    } finally {
                        setLoading(false)
                        }
        }
    fetchData()
    }, [user, refresh] )

    const onSearch = (query) => {
        setQuery(query)
        const filtered =  transactions?.filter(
            (item) => item.t_type.toLowerCase().includes(query.toLowerCase()) ||
            item.status.toLowerCase().includes(query.toLowerCase())

            )
        setSearchValue(filtered)
        }

  return (
    <SafeAreaView
    className="bg-background gap-4 my-4"
    style={styles.container}
    >

{/*        <View className="flex-1 w-[95vw] gap-3 my-4  items-center rounded-xl"> */}
           <View className="p-4 bg-white rounded-lg m-1 w-[90vw]">
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

            { (error || loading ) ?
            <View className="h-[80vh]">
            <Refresh
                loading={loading}
                setRefresh={setRefresh}
                error={error}
                setError={setError}
            />
            </View> :

            <View className="w-[90vw] flex-1 rounded-lg">
            { searchValue && searchValue.length == 0 ?
                <View className="h-[50] items-center bg-primary-200 justify-center rounded-xl">
                    <Text>No transaction found!</Text>
                </View>:
            <FlatList
                data={searchValue}
                renderItem={ ({item}) => (
                    <TouchableOpacity
                    onPress= {() => {
                        setSingleTransaction(item)
                        router.push(`/transaction/${item.id}`)
                        }}
                    className="m-1 bg-white rounded-xl"
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
                keyExtractor={ (item) => item?.id}
            />
            }
            </View>
            }
{/*        </View> */}
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
