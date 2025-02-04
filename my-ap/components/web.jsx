import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from "react-native";
import images from "@/constants/images"
import CustomButton from "@/components/customButton"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from "@expo/vector-icons";
import {icons} from "@/constants";
import Icon from "@/components/icon"
import {Colors} from "@/constants/Colors"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios"
import { config } from "@/config"
import {router} from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Email from "@/components/email"
import Whatsapp from "@/components/whatsapp"
import PhoneCall from "@/components/phoneCall"
import WhatsAppCommunity from "@/components/whatsappcommunity"
import Animated, { FadeInUp, FadeInDown, SlideInLeft, SlideInRight, ZoomIn,
    ZoomOut, BounceIn, BounceOut } from "react-native-reanimated";


const { height, width } = Dimensions.get("window");


const HomePage = () => {
    const [homeData, setHomeData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");

  useEffect( () => {
      axios.get(`${config.API_URL}/get_data`)
      .then( res => {
          setHomeData(res?.data)
          console.log(res?.data)
          })
      .catch( err => {
          console.log(err?.response?.data)
          })

      }, [] )
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");


  const isMobile = width < 800; // Adjust the breakpoint as needed

  return (
    <View style={styles.container}>
      <View style={styles.header} className="bg-whdite">
          <View  className="w-[100%] flex-row items-center gap-4 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
                width: 60,
                height: 60
             }}
             className="rounded-full"
            />
            <Text style={styles.headerText}>JJ Vtu Network</Text>
          </View>
      </View>
      <ScrollView className="" style={styles.content}>
       <Animated.View entering={FadeInUp.duration(2000).delay(200)}>
        <ImageBackground
          source={images.home}
          resizeMode="stretch"
          blurRadius={0}
          imageStyle={{
              marginTop: 130,
              height: "50%",
              width: "60%",
              position: "absolute",
              marginLeft: "40%",
              alignSelf: "center"
               }}
          style={{
                 marginBottom: 20,
                 backgroundColor: "#fff",
                 padding: 20,
                 paddingLeft: 25,
                 borderRadius: 15,
                 shadowColor: "#000",
                 shadowOpacity: 0.2,
                 shadowRadius: 10,
                 //elevation: 5,
                 //alignItems: "center",
                 justifyContent: "center",
                 gap: 20,
                 height: 400

              }}
          >
          <View className="gap-4">
              <View>
              <Text style={styles.welcomeTitle}>Welcome to<br/>a New Experience!</Text>
              <Text className="text-grady font-pregular">
                The Best and Cheapest Application for your Data, Airtime, <br/>Electricity Bills,
                Cable Subscriptions and other VTU Services
              </Text>
              </View>
                <View className="gap-3">
                    <Animated.View entering={SlideInLeft.duration(2000).delay(300)}>
                   <TouchableOpacity
                   onPress = { () => router.push("/signup")}
                    className="bg-primary h-[40] items-center justify-center w-[120] rounded-xl">
                       <Text className="text-white">Create Account</Text>
                   </TouchableOpacity>
                   </Animated.View>

                    <Animated.View entering={SlideInLeft.duration(3000).delay(300)}>
                   <TouchableOpacity
                        onPress = { () => router.push("/signin")}
                        className="bg-primary h-[40] items-center justify-center w-[120] rounded-xl">
                       <Text className="text-white">Login</Text>
                   </TouchableOpacity>
                   </Animated.View>

                   <Animated.View entering={SlideInLeft.duration(4000).delay(300)}>
                   <TouchableOpacity  className="bg-primary h-[40] items-center justify-center w-[120] rounded-xl">
                       <Text className="text-white">Download App </Text>
                   </TouchableOpacity>
                   </Animated.View>

{/*                    <TouchableOpacity  className="bg-primary h-[40] items-center justify-center w-[120] rounded-xl"> */}
{/*                        <Text className="text-white">Create Account</Text> */}
{/*                    </TouchableOpacity> */}
                </View>
           </View>
          </ImageBackground>
        </Animated.View>

        <Animated.View entering={ZoomIn.duration(2000).delay(300)}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} >Awesome Features</Text>
          <View style={[styles.featuresGrid, isMobile && styles.featuresGridMobile]}>
            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>
                <Entypo name="cog" size={60} color={Colors.primary.DEFAULT} />
                <Text style={styles.featureTitle}>Automated Services</Text>
                <Text style={styles.featureDescription}>Our data delivery process is instant, ensuring you get connected without delays. Wallet funding is fully automated, allowing seamless transactions anytime. Experience speed, convenience, and reliability with every purchase.</Text>
            </View>

            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>
                <MaterialIcons name="security" size={60} color={Colors.primary.DEFAULT} />
                <Text style={styles.featureTitle}>Secure Platform</Text>
                <Text style={styles.featureDescription}>We implement advanced security protocols to safeguard all your transactions from unauthorized access. With end-to-end encryption and multi-layer protection, your data remains safe at all times. Rest assured, every purchase and payment you make is fully secured, giving you peace of mind.</Text>
            </View>

            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>
                <MaterialCommunityIcons name="email-fast" size={60} color={Colors.primary.DEFAULT} />
                <Text style={styles.featureTitle}>Fast Delivery</Text>
                <Text style={styles.featureDescription}>Our airtime top-up and data purchase services are designed for speed and reliability. The moment you place an order, our automated system processes it instantly, ensuring there are no delays. Whether you need data or airtime at any time of the day, you can count on us for fast and seamless delivery, keeping you connected without interruption.</Text>
            </View>

            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>
                <MaterialCommunityIcons name="face-agent" size={60} color={Colors.primary.DEFAULT} />
                <Text style={styles.featureTitle}>Customer Support</Text>
                <Text style={styles.featureDescription}>Our dedicated support team is always within reach, ready to assist you whenever you need help. With an advanced 90% automation system, most inquiries are resolved instantly, ensuring minimal wait times. For more complex issues, our responsive human support is available to provide personalized assistance, making sure you get the help you need without hassle.</Text>
            </View>
          </View>
        </View>
        </Animated.View>


        <ImageBackground
          sourcde={images.logoSmall}
          resizeMode="contain"
          blurRadius={3}
          imageStyle={{
              height: 300,
              width: "",
//                position: "absolute",
               // marginLeft: 20,
                alignSelf: "center"
               }}
          style={{
                 flexGrow: 1,
                 marginBottom: 20,
                 backgroundColor: "#fff",
                 padding: 20,
                // paddingLeft: 25,
                 borderRadius: 15,
                 shadowColor: "#000",
                 shadowOpacity: 0.2,
                 shadowRadius: 10,
                 //elevation: 5,
                 //alignItems: "rights",
                 //justifyContent: "cencter",
                 gap: 20,
                // height: 400

              }}
          >
          <View className="gap-4  w-[] justify-centers ">
              <View className="">
              <Text className="mb-4 text-center" style={styles.sectionTitle}>Services</Text>
              <View
                className="flex-1 py-4 text-white gap-4 rounded-xl"
                >
                    <View className="flexGrow-1 ">
                        <View className="flex-row items-center gap-4 x p-4">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <MaterialCommunityIcons
                                    name= "cellphone-nfc"
                                    size={60}
                                    color={ Colors.primary.DEFAULT }
                                 />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Data</Text>
                                <Text>Purchased data is credited immediately </Text>
                             </View>
                        </View>

                         <View className="flex-row items-center gap-4 p-4">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <FontAwesome5
                                    name="phone-square"
                                    size={60}
                                    color={ Colors.primary.DEFAULT }
                                    />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Airtime top-up</Text>
                                <Text>ensures seamless communication without running out of balance. </Text>
                             </View>
                        </View>

                        <View className="flex-row items-center gap-4 p-4">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <Foundation
                                    name= "lightbulb"
                                    size={60}
                                    color={ Colors.primary.DEFAULT }
                                 />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Bills</Text>
                                <Text>Pay your bills securely and effortlessly with our easy-to-use platform. </Text>
                             </View>
                        </View>

                        <View className="flex-row items-center gap-4  p-4">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <Ionicons
                                    name= "receipt"
                                    size={60}
                                    color={ Colors.primary.DEFAULT }
                                 />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Cable subscription</Text>
                                <Text>Stay connected with your favorite channels! Pay for your cable subscription quickly and securely through our platform. Just enter your details, select your plan, and enjoy uninterrupted entertainment. </Text>
                             </View>
                        </View>

                        <View className="flex-row items-center gap-4 p-4 ">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <MaterialCommunityIcons
                                     name="bank-transfer"
                                     size={60}
                                     color={Colors.primary.DEFAULT}
                                 />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Airtime To cash</Text>
                                <Text>Convert your airtime to cash instantly! Our platform offers fast and secure airtime-to-cash transactions at great rates </Text>
                             </View>
                        </View>

                        <View className="flex-row items-center gap-4 p-4">
                             <View className="rounded-full bg-primary-200 h-[100] w-[100] justify-center items-center">
                                <FontAwesome5 name="sms" size={60} color={Colors.primary.DEFAULT} />
                             </View>
                             <View className="bg-white rounded-xl p-3 shadow shadow-primary" style={{ maxWidth: "60%"}}>
                                <Text className="font-psemibold text-xl text-primary">Bulk SMS</Text>
                                <Text>Send bulk SMS quickly and affordably! Reach your audience with instant, reliable messaging for promotions, alerts, and more. Enjoy fast delivery and competitive rates.</Text>
                             </View>
                        </View>

                    </View>

                </View>
              </View>

           </View>
        </ImageBackground>


{/*         <Section title="Become An Agent" content="Join our network and start earning today!" /> */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Plan And Prices</Text>
          { homeData?.plans && (
          <View style={styles.networkSelector}>
            {Object.keys(homeData?.plans).map((network) => (
              <TouchableOpacity key={network} style={styles.networkButton} onPress={() => setSelectedNetwork(network)}>
                <Text style={styles.networkButtonText}>{network}</Text>
              </TouchableOpacity>
            ))}
          </View>
          )}
          {selectedNetwork && (
            <View style={styles.tableContainer}>
              <Text style={styles.tableHeader}>{selectedNetwork}</Text>
              <View style={styles.table}>
                {homeData?.plans[selectedNetwork].map((plan, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell} className="font-psemibold">{plan.type}</Text>
                    <Text style={styles.tableCell} className="font-psemibold" >{plan.name}</Text>
                    <Text style={styles.tableCell} className="font-psemibold">₦{plan.price}</Text>
                    <Text style={styles.tableCell} className="font-psemibold">{plan.validity} Days</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} >Contact Us</Text>
          <View style={[styles.featuresGrid, isMobile && styles.featuresGridMobile]}>
            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>
                <Text style={styles.sectionTitle} className="font-thin mt-2">Chart</Text>
                <View className=" rounded-xl bg-white p-2">

                    <Whatsapp />

                    <WhatsAppCommunity />
                </View>

            </View>

            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>

                <Text style={styles.sectionTitle} className="font-thin mt-2">Call</Text>
                 <View className="rounded-xl bg-white p-2">
                    <PhoneCall
                    phone="+234 803 376 0736"
                    />

                    <PhoneCall
                    phone="+234 902 093 4923"
                    />
                 </View>
            </View>

            <View style={[styles.featureCard, isMobile && styles.featureCardMobile]}>

                <Text style={styles.sectionTitle} className="font-thin mt-2">Email</Text>
                 <View className="rounded-xl bg-white p-2">
                    <Email/>
                 </View>
            </View>


          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 All Rights Reserved</Text>
      </View>
    </View>
  );
};

const Section = ({ title, content }) => (
  <View style={[styles.section, { height }]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Learn More</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: Colors.primary.DEFAULT, padding: 30, alignItems: "center", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowColor: Colors.primary.DEFAULT, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5, },
  headerText: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 20, backgroundColor: "#fff", padding: 20, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, elevation: 5, alignItems: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: Colors.primary.DEFAULT },
  sectionContent: { fontSize: 16, color: "#333", marginBottom: 10 },
  welcomeTitle: { fontSize: 32, fontWeight: "bold", color: Colors.primary.DEFAULT,  marginBottom: 15 },
  welcomeSubText: { fontSize: 18, color: "#333", marginBottom: 10 },
  welcomeTagline: { fontSize: 16, color: Colors.primary.DEFAULT, fontStyle: "italic", textAlign: "center", marginBottom: 20 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 },
  button: { backgroundColor: "#6200ea", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 5 },
  buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  footer: { backgroundColor: "#333", padding: 20, alignItems: "center", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  footerText: { fontSize: 16, color: "#fff" },
  networkSelector: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10, gap: 10 },
  networkButton: { backgroundColor: Colors.primary.DEFAULT, padding: 10, borderRadius: 10 },
  networkButtonText: { color: "#fff", fontWeight: "bold" },
  tableContainer: { marginTop: 10, alignItems: "center" },
  tableHeader: { fontSize: 18, fontWeight: "bold", color: Colors.primary.DEFAULT, marginBottom: 5 },
  table: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingLeft: 10, paddingRight: 10},
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, gap: 20, borderBottomColor: "#ccc", minWidth: "40vw", alignItems: "center", height: 70},
  tableCell: { fontSize: 16, fontWeight: "bold", color: "#333" },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 10, padding: 20 },
  featuresGridMobile: { flexDirection: "column", alignItems: "center" },
  featureCard: { width: "48%", backgroundColor: "#f0f0f0", padding: 15, borderRadius: 10, marginBottom: 40, alignItems: "center" },
  featureCardMobile: { width: "100%", marginBottom: 20 },
  featureIcon: { fontSize: 30, marginBottom: 10 },
  featureTitle: { fontSize: 18, fontWeight: "bold", color: Colors.primary.DEFAULT, marginBottom: 5 },
  featureDescription: { fontSize: 14, color: "#333", textAlign: "center" },
});

export default HomePage;
