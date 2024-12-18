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
    const [networksData, setNetworksData] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)
    const [isVerified, setIsVerified] = useState(false);
    const [isLoadingRequest, setIsLoadingRequest] = useState(false)
    const [plan, setPlan] = useState(null);
    const [validator, setValidator] = useState(true);
    const [phone, setPhone] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [response, setResponse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [balance, setBalance] = useState(null);
    const [selectedPlanAmount, setSelectedPlanAmount] = useState(0);
    const [selectedPlanName, setSelectedPlanName] = useState(null);

    const [planTypes, setPlanType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const sameType = useMemo( () => {
        const filterTypes = planTypes?.filter(
            (item) => item.network_id == selectedValue
             )
        setSelectedType(s => filterTypes[0]?.id || null)
        return filterTypes
        }, [selectedValue] )
    const [openType, setOpenType] = useState(false);
    const [typeValue, setTypeValue] = useState(null)

    const [plans, setPlans] = useState(null);
    const samePlans = useMemo( () => {
        const filterPlans = plans?.filter(
            (item) => item.plan_t == selectedType
             )
        return filterPlans
        }, [selectedType, selectedValue] )
    const [loading, setLoading] = useState(false)
    const { user, setIsLogIn } = useContext(GlobalContext);
    const bottomSheetRef = useRef(null);
    const networksRef = useRef(52)

    let formatedBalance = new Intl.NumberFormat(
        "en-NG",
        {style: "currency", currency: "NGN" })
        .format(balance)

    useEffect( () => {
        if (networks && phone.length >= 4) {
            for (const network of networksData) {
                if (JSON.parse(network?.network_codes)?.codes?.includes(phone.slice(0, 4))) {
                    setSelectedValue(network?.network_id)
                    return
                    }
                }
            }
        }, [phone])

    useEffect( () => {

        if (!user) {
            return
            } else {
            const fetchData = async () => {
                setLoading(true)
                try{
                      const [networkData, typeData, planData, userBalance] = await Promise.all([
                            axios.get(`${config.API_URL}/networks`, {
                                headers: {
                                "Authorization": `Bearer ${user.token}`
                                }
                            }),

                            axios.get(`${config.API_URL}/add_plan_type`, {
                                headers: {
                                "Authorization": `Bearer ${user.token}`
                                }
                            }),

                            axios.get(`${config.API_URL}/add_plan`, {
                                headers: {
                                "Authorization": `Bearer ${user.token}`
                                }
                            }),

                            axios.get(`${config.API_URL}/balance`, {
                                headers: {
                                "Authorization": `Bearer ${user?.token}`
                                }
                            })

                          ])

                      setNetworksData(networkData.data)
                       setNetworks(networkData?.data?.map((item) => (
                             <Picker.Item
                             key={item.id}
                             label={item.name}
                             value={item.network_id} />
                           ))
                       )

                      setBalance(userBalance?.data?.balance)
                      setSelectedValue(networkData?.data[0]?.network_id)

                      setPlanType(typeData.data)

                      setPlans(planData.data)
                      console.log(planData)
                      console.log(typeData)
                      console.log(networkData)
                      console.log(userBalance)

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
            }

    }, [user] )

    const handleDataPurchase = (plan) => {
        if(phone === "") {
            setIsSubmitted(true)
            return
            }
        setPlan(plan)
        setSelectedPlanAmount(
            new Intl.NumberFormat(
                "en-NG", {style: "currency", currency: "NGN"}).format(
                plan[`user${user.type[user.type.length - 1]}_price`])
            )
        setSelectedPlanName(plan?.plan_name)
        bottomSheetRef.current.snapToIndex(2)
        }

    const handleSuccessVerification = () => {
        bottomSheetRef.current.snapToIndex(0)
        setIsVerified(true)
        setIsLoadingRequest(true)
        const data = {
            network_id: plan.net_id,
            type: plan.plan_t,
            plan_id: plan.plan_id,
            validator: validator,
            phone: phone
            }

        axios.post(`${config.API_URL}/buy_data`, data, {
            headers: {
                "Authorization": `Bearer ${user?.token}`
                }
            })
        .then( (res) => {
            setResponse(res?.data);
            bottomSheetRef.current.close()
            setIsLoadingRequest(false)
            setIsVerified(true)
            setPlan(null)
            //router("/home")
            } )
        .catch( (err) => {
            if (err?.response?.status === 401) {
                handleLogout(setIsLogIn)
                } else {
                setResponse(err?.response?.data);
                bottomSheetRef.current.close()
                setIsLoadingRequest(false)
                setIsVerified(true)
                setPlan(null)
                }
            })

        console.log(data)

        }

    const handleClose = () => {
        setPlan(null)
        bottomSheetRef.current.close()
        }

    const handleCloseResponse = () => {
        if (response?.status === "success"){
            setResponse(null)
            router.push("/home")
            }
        setResponse(null)
        }


  return (
    <SafeAreaView
    className="bg-background"
    style={styles.container}
    >
        <ScrollView
        showsVerticalScrollIndicator = {false}
        showsHorizontalScrollIndicator ={false}
        contentContainerStyle={{
            flexGrow: 1,
             gap: 10
             }}
        >
         {
           response && (
            <CustomAlert
            title={response?.status}
            response={response?.message}
            onClose={handleCloseResponse}
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
                <Text className="font-bold text-white text-4xl uppercase">
                    {user?.user_name[0]}
                </Text>
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
                   { isVisible ? `${formatedBalance}` : "*****"}
               </Text>
           </View>

           </View>

       </View>

        <View className="flex-row items-center gap-4 p-3 w-[90vw] bg-white rounded-lg">
           <FormField
              otherStyles="w-[80%]"
              onChange={(e) => setPhone( (p) => e.trim()
                .replace(/\s+/g, "")
                .replace(/^\+234/, "0"))
                }
              required={true}
              isSubmitted={isSubmitted}
              value={phone}
              title={"Phone number:"}
              keyboardType={"phone-pad"}
              placeholder={" Phone number"}
           />

           <Contact
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              selectedPhoneNumber={phone}
              setSelectedPhoneNumber={setPhone}
              />
       </View>

       <View className="w-[90vw] flex-row items-center
        bg-white p-3 rounded-lg gap-3">

           <Image
                source={
                    selectedValue == 1 ? images.mtn
                    : selectedValue == 2 ? images.airtel
                    : selectedValue == 3 ? images.glo
                    : selectedValue == 4 ? images.nmobile
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

       { selectedValue && (
           <View className="p-3 w-[90vw] bg-white rounded-lg"
           >
           <View className="rounded-xl h-[50]"
           style={{overflow: 'hidden'}}
           >
            <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) => setSelectedType( s => itemValue)}
                style={styles.picker}
              >
                {
                    sameType && sameType.length > 0 ?
                    sameType?.map((item) => (
                            <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item.id}
                            />
                          )
                      ) :
                   <Picker.Item
                    label={"No available plan Type"}
                    value={null}
                    />
                    }
             </Picker>
             </View>
           </View>
       )}

       { selectedType && (
           <View className="w-[90vw] bg-white rounded-lg">
               { samePlans && samePlans.length > 0 ?
                <FlatList
                    data={samePlans}
                    renderItem={ ({item}) => (
                        <TouchableOpacity
                         onPress={() => handleDataPurchase(item)}
                         className="items-center justify-center
                         w-[23vw] h-[100] bg-primary-200 m-2
                         shadow-lg shadow-primary rounded-lg"
                         >
                            <Text className="font-pextrabold">{item.plan_name}</Text>
                            <Text>{`${item.validity_days} Days`}</Text>
                            <Text>@</Text>
                            <Text className="font-psemibold">{`${new Intl.NumberFormat(
                                "en-NG", {style: "currency", currency: "NGN"}).format(
                                    item[`user${user.type[user.type.length - 1]}_price`])}`}</Text>
                        </TouchableOpacity>
                        )}
                    keyExtractor={ (item) => item.id}
                    numColumns={3}
                    contentContainerStyle={{
                        justifyContent: "center",
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

       </ScrollView>
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
                        <Text className="font-pthin text-lg">Phone Number</Text>
                        <Text className="font-psemibold text-lg">{phone}</Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Network</Text>
                        <Text className="font-psemibold text-lg">{plan?.network_id}</Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Plan</Text>
                        <Text className="font-psemibold text-lg">{selectedPlanName}</Text>
                    </View>

                    <View className="flex-row justify-between width-[100%]">
                        <Text className="font-pthin text-lg">Amount</Text>
                        <Text className="font-psemibold text-lg">{selectedPlanAmount}</Text>
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
