import React, {useState, useEffect, useRef,
    useContext, useMemo} from "react";
import {View, Text, Image, StyleSheet, ScrollView,
    TouchableOpacity, FlatList, ActivityIndicator, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import Entypo from '@expo/vector-icons/Entypo';
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
import Pin from "@/components/pin"
import CustomAlert from "@/components/customAlert"
import Contact from "@/components/contact"
import {Link, router} from "expo-router"

const App = () => {
    const [networks, setNetworks] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoadingRequest, setIsLoadingRequest] = useState(false)
    const [amount, setAmount] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [response, setResponse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility
    const [isVisible, setIsVisible] = useState(true);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(false);
    const [cable, setCable] = useState({})
    const [sameType, setSameType] = useState(null)

    const [loading, setLoading] = useState(false)
    const { user, setIsLogIn } = useContext(GlobalContext);
    const bottomSheetRef = useRef(null);
    const [refresh, setRefresh] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [isValidated, setIsValidated] = useState(false)
    const [name, setName] = useState("")
    const [plan, setPlan] = useState("")

    useEffect( () => {
        setSameType(s => cable[selectedValue])
        }, [selectedValue])

    useEffect( () => {
        setSameType(null)
        if (!user) {
            return
            } else {
            const fetchData = async () => {
                setLoading(true)
                setError(false)
                try{
                      const [cableData] = await Promise.all([
                            axios.get(`${config.API_URL}/cable`, {
                            headers: {
                                "Authorization": `Bearer ${user?.token}`
                                }
                            })
                          ])

                       setNetworks(Object.keys(cableData?.data?.cables).map((item) => (
                             <Picker.Item
                             key={item}
                             label={item.toUpperCase()}
                             value={item} />
                           ))
                       )

                      setBalance(cableData?.data?.balance)
                      if (Object.keys(cableData?.data?.cables).length > 0) {
                          setSelectedValue(Object.keys(cableData?.data?.cables)[0])
                          setSameType(cableData?.data?.cables[Object.keys(cableData?.data?.cables)[0]])
                          }
                      setCable(cableData?.data?.cables)

                    } catch (err) {
                        setError(true)
                        if (err?.response?.status === 401) {
                            handleLogout(setIsLogIn)
                        }
                        console.log(err)
                        } finally {
                            setLoading(false)
                            }
                }

                fetchData()
            }

    }, [user, refresh] )

    const handleFormatAmount = (amount) => {
        return new Intl.NumberFormat(
            "en-NG", {style: "currency", currency: "NGN"}).format(
                amount
                )
        }

    const handleValidate = (item) => {
        if(cardNumber === "") {
            setIsSubmitted(true)
            return
            }
        setAmount(item.amount)
        setPlan(item)
        setIsLoadingRequest(true)
        setIsVerified(true)
        bottomSheetRef?.current?.snapToIndex(0)

        const data = {
            cardNumber: cardNumber,
            planId: item.id
            //type: "prepaid"
            }

        axios.post(`${config.API_URL}/cable_validation`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( res => {
            if (res?.data?.error){
                setIsLoadingRequest(false)
                setIsVerified(false)
                setResponse({status: "error", message: res?.data?.desc})
                bottomSheetRef.current.close()
                return
                }
            setName(res?.data?.data?.name)
            setIsLoadingRequest(false)
            bottomSheetRef?.current?.snapToIndex(3)

            })
        .catch( err => {
            setIsLoadingRequest(false)
            setIsVerified(false)
            setResponse({status: "error", message: "Invalid entry or network error"})
            bottomSheetRef.current.close()
            })
        }

    const handleSuccessVerification = () => {
        bottomSheetRef.current.snapToIndex(0)
        setIsVerified(true)
        setIsLoadingRequest(true)
        const data = {
            cardNumber: cardNumber,
            planId: plan?.id,
            }

        axios.post(`${config.API_URL}/cable`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            setResponse(res?.data);
            bottomSheetRef.current.close()
            setIsLoadingRequest(false)
            setIsVerified(true)
            } )
        .catch( (err) => {
            if (err?.response?.status === 401) {
                handleLogout(setIsLogIn)
                } else {
                setResponse(err?.response?.data);
                bottomSheetRef.current.close()
                setIsLoadingRequest(false)
                setIsVerified(true)
                setIsSubmitted(false)
                }
            })
        }

    const handleClose = () => {
        bottomSheetRef.current.close()
        }

    const handleCloseResponse = () => {
        if (response?.status === true) {
            setRefresh((r) => !r)
            setCardNumber("")
            }
        setResponse(null)
        }

    const handleHome = () => {
        setResponse(null)
        router.replace("/home")
        }

  return (
    <SafeAreaView
    className="bg-background"
    style={styles.container}
    >
        <View
        className="flex-1 gap-3"
        >
         {
           response && (
            <CustomAlert
            title={response?.status}
            response={response?.message}
            onClose={handleCloseResponse}
            secondTitle="Home"
            secondOnClose= { handleHome }
            />
            )
        }
        <View className="w-[90vw] h-[90] items-center flex-row p-3
          bg-white gap-3 rounded-xl shadow-lg shadow-primary-100">

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
                { user?.user_name && (
                <Text className="font-bold text-white text-4xl uppercase">
                    {user?.user_name[0]}
                </Text>
                )}
            </View>

           <View className="flex justify-between">
               <View className="flex-row items-center gap-2">
                   <Text className="font-pregular ">Balance</Text>
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
                   { isVisible ? `${handleFormatAmount(balance)}` : "*****"}
               </Text>
           </View>

           </View>

       </View>

        <View className="flex-row items-center gap-4 p-3 w-[90vw] bg-white rounded-lg">
           <FormField
              otherStyles="w-[100%]"
              onChange={(e) => setCardNumber(e)}
              required={true}
              isSubmitted={isSubmitted}
              value={cardNumber}
              title={"Card Number:"}
              keyboardType={"phone-pad"}
              placeholder={" Card Number"}
           />
       </View>
       {loading || error ?
           <View className="w-[90vw] flex-row items-center mb-4 justify-center
            bg-white p-3 rounded-lg gap-3 flex-1">
            { error ?
                <View className="flex-col items-center">
                    <Text className="mb-2 font-pregular">Network problem</Text>
                    <CustomButton
                    title="Refresh"
                    onPress={ () => {
                        setError(false)
                        setRefresh( (r) => !r )
                        }}
                    containerStyle="bg-primary w-[100]"
                    />
                </View>:
            <ActivityIndicator
            size="large"
            color={Colors.primary.DEFAULT}
            />
            }
            </View> :

              <>
               <View className="w-[90vw] flex-row items-center
                bg-white p-3 rounded-lg gap-3">

                   <Image
                        source={
                            selectedValue == "MTN" ? images.mtn
                            : selectedValue == "AIRTEL" ? images.airtel
                            : selectedValue == "GLO" ? images.glo
                            : selectedValue == "9MOBILE" ? images.nmobile
                            : ""
                            }
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            }}
                        className="rounded-full "
                        />

               <View className="rounded-xl h-[50] w-[80%]"
               style={{overflow: 'hidden'}}
               >
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(s =>  itemValue)}
                    style={{ width: "100%", height: "100%",
                        backgroundColor: Colors.background.DEFAULT,
                        padding: 10,
                        //marginLeft: 10
                        }}
                  >
                    {
                        networks && networks.length > 0?
                        networks :
                        <Picker.Item
                        label={"No available Network"}
                        value={null}
                        />
                        }
                 </Picker>
                 </View>
               </View>
                  </>
                }


       { sameType && (
           <View className="w-[90vw] bg-white rounded-xl flex-1">
               { sameType && sameType.length > 0 ?
                <FlatList
                    data={sameType}
                    renderItem={ ({item}) => (
                        <TouchableOpacity
                         onPress={() => handleValidate(item)}
                         className="items-center justify-center
                         w-[40vw] bg-primary-200 m-2
                         shadow-lg shadow-primary rounded-lg min-h-[100]"
                         >
                            <Text className="font-psemibold text-center">
                                {item?.name}
                            </Text>

                            <Text className="my-2">Pay</Text>
                            <Text
                            className="font-psemibold"
                            >
                                {
                                    handleFormatAmount(item?.amount)
                                }
                                </Text>
                        </TouchableOpacity>
                        )}
                    keyExtractor={ (item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{
                        justifyContent: "center",
                        flexGrow: 1,
                        alignItems: "center",
                        backgroundColor: Colors.white,
                        padding: 15

                        }}

                /> :
                <View className="w-[90vw] bg-white rounded-lg h-[80] justify-center items-center">
                    <Text>No available Plan</Text>
                </View>
                }
           </View>
       )}



       </View>
       <CustomBottomSheet
        title={"Payment"}
        ref={bottomSheetRef}
        components={
            isVerified && isLoadingRequest ?
            <View className="mt-2 justify-center items-center">
                <ActivityIndicator
                    size="large"
                    color={Colors.primary.DEFAULT}
                />
            </View> :
            <View className="gap-4"
            style={{ flexGrow: 1}}
            >
                <View className="bg-white mt-4 p-4 rounded-lg">

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Name</Text>
                        <Text className="font-psemibold text-lg">
                            {name}
                        </Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Card Number</Text>
                        <Text className="font-psemibold text-lg">{cardNumber}</Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">amount</Text>
                        <Text className="font-psemibold text-lg">{handleFormatAmount(amount)}</Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Plan</Text>
                        <Text className="font-psemibold text-lg">
                            {plan?.name}
                        </Text>
                    </View>
                </View>
                <View className="bg-white rounded-lg">
                    <Pin
                        handleClose={handleClose}
                        handleSuccessVerification={handleSuccessVerification}
                        //title={`${plan?.network_id}  ${plan?.plan_name} to ${phone}`}
                    />
                </View>
            </View>
            }
        />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center",
      backgroundColor: Colors.background.DEFAULT },
  //label: { fontSize: 18, marginBottom: 10, backgroundColor: "red" },
  picker: {
      height: "100%", width: "100%", paddingLeft: 10,
      backgroundColor: Colors.background.DEFAULT
      },
  selectedText: { marginTop: 20, fontSize: 16 },
});

export default App;
