import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard, TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/formField";
import CustomButton from "@/components/customButton";
import images from "@/constants/images";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { config } from "@/config";
import CustomAlert from "@/components/customAlert";
import { GlobalContext } from "@/context/globalProvider";
import { setItem } from "@/components/localStorage";
import Loading from "@/components/loading";

function SignUp() {
  const router = useRouter();
  const { setUser, setIsLogIn } = useContext(GlobalContext);

  const [form, setForm] = useState({
    full_name: "",
    user_name: "",
    email: "",
    phone_no: "",
    ref_no: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const required = ["password", "user_name", "email", "phone_no", "full_name"];

  function submitLogging() {
    let error = false;
    setIsSubmitted(true);
    for (let i of required) {
      if (!form[i].trim()) {
        error = true;
        return;
      }
    }
    if (error) {
      return;
    }
    setIsSubmitted(false);
    setIsLoading(true);

    axios
      .post(`${config.API_URL}/add_user`, form)
      .then((res) => {
        setIsLoading(false);
        setResponse(res?.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setResponse(err?.response?.data);
      });
  }

  const handleCloseError = () => {
    setResponse(null);
  };

  const handleClose = () => {
    setResponse(null);
    setForm({
      full_name: "",
      user_name: "",
      email: "",
      phone_no: "",
      ref_id: "",
      password: "",
    });
  };

  const handleLogin = () => {
    setLoading(true);
    setResponse(null);
    axios
      .post(`${config.API_URL}/login`, {
        username: form.user_name,
        password: form.password,
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data);
        setItem("userData", JSON.stringify(res.data));
        setIsLogIn(true);
        router.replace("/home");
      })
      .catch((err) => {
        setLoading(false);
        router.replace("/signin");
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
{/*         <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              paddingBottom: 20,
            }}
          >
             <TouchableOpacity
                onPress={ () => router.push("/")}
                className="m-4">
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
            </TouchableOpacity>

            {response && (
              <CustomAlert
                title={response?.status}
                response={response?.message}
                onClose={() =>
                  response?.status === "error" ? handleCloseError() : handleClose()
                }
                secondTitle="Login"
                secondOnClose={handleLogin}
              />
            )}

            <Text className="font-pbold text-3xl w-[85vw]">Sign Up</Text>
            <View
              className="bg-white pt-2 justify-center rounded-xl px-4 w-[90vw]"
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
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, full_name: e })}
                required={true}
                isSubmitted={isSubmitted}
                labelShow={true}
              />
              <FormField
                title="UserName"
                value={form.user_name}
                placeholder="User name"
                onChange={(e) => setForm({ ...form, user_name: e })}
                required={true}
                isSubmitted={isSubmitted}
                labelShow={true}
              />
              <FormField
                title="Email"
                value={form.email}
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e })}
                required={true}
                isSubmitted={isSubmitted}
                keyboardType="email-address"
                labelShow={true}
              />
              <FormField
                title="Phone"
                value={form.phone_no}
                placeholder="Phone"
                onChange={(e) => setForm({ ...form, phone_no: e })}
                required={true}
                isSubmitted={isSubmitted}
                keyboardType="phone-pad"
                labelShow={true}
              />
              <FormField
                title="Referral (Optional)"
                value={form.ref_id}
                placeholder="Referral"
                onChange={(e) => setForm({ ...form, ref_id: e })}
                isSubmitted={isSubmitted}
                labelShow={true}
              />
              <FormField
                title="Password"
                value={form.password}
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e })}
                required={true}
                isSubmitted={isSubmitted}
                labelShow={true}
              />

              <CustomButton
                containerStyle="my-5 bg-primary"
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
{/*         </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
      <Loading loading={loading} />
    </SafeAreaView>
  );
}

export default SignUp;