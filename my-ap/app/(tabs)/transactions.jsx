import React, {useState, useEffect, useRef,
    useContext, useMemo} from "react";
import {View, Text, Image, StyleSheet, FlatList} from "react-native";
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


const Transactions = () => {

    const {user, setIsLogIn} = useContext(GlobalContext)
    const [transactions, setTransactions] = useState(null);
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
        const filtered =  transactions.filter(
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

       <View className="flex-1 w-[90vw] gap-3 bg-red-500 mt-4">
           <FormField
                placeholder={"Search Record..."}
                value={query}
                onChange={onSearch}
           />
           <View>
                <FlatList
                    data={searchValue}
                    renderItem={ ({item}) => (
                        <TransactionHistory
                            amount={item?.amount}
                            description={item?.t_disc}
                            date={item?.t_date}
                            status={item?.status}
                        />
                        )}
                    keyExtractor={ (item) => item.id}
                />
           </View>
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
