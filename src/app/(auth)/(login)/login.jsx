import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import TextBox from "react-native-password-eye";
import { Toast } from "react-native-toast-notifications";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const showToast = (message) => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email) {
      Toast.show("Please enter your email address.", { type: "error" });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show("Please enter a valid email address.", { type: "error" });
      return;
    }
    if (!password) {
      Toast.show("Please enter your password.", { type: "error" });
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      Toast.show("Login successful!", { type: "success" });
      await router.push("/(main)/(tabs)"); // Navigate to the main page
      setIsLoading(false);
    }, 1000); // Shortened the delay for smooth navigation
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            gap: 70,
          }}
          className="px-8 py-6"
        >
          {/* Header Section */}
          <View className="header flex flex-col items-center justify-center gap-4 mt-6">
            <Image className="w-16" source={imagePath.login} />
            <Text className="text-black text-center mt-4 font-bold text-3xl">
              Login to your Account
            </Text>
            <Text className="text-center text-[#61677D]">
              Log in with Google or Email address for quick and secure access!
            </Text>
          </View>

          {/* Login Options */}
          <View className="flex justify-center gap-4 items-center">
            <TouchableOpacity
              onPress={() => {
                router.push("/(main)");
              }}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.google}
              />
              <Text className="text-[#61677D] text-xl font-medium ">
                Google
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-lg font-medium text-gray-400">Or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Email Input */}
            <TextInput
              placeholder="Email Address"
              className="bg-[#2982dc23] w-full px-6 py-5 placeholder:opacity-70 rounded-lg text-gray-600"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextBox
              className="bg-[#2982dc14] w-full placeholder:font-medium px-6 rounded-lg text-gray-500 p-2"
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
            />

            {/* Forgot Password Link */}
            <Link
              className="font-medium text-start w-full px-2 text-[#2983DC]"
              href={"/forgatePass"}
            >
              Forget Password?
            </Link>
          </View>

          {/* Footer Section */}
          <View className="footer mb-0 bottom-0">
            <CustomeButton
              title={
                isLoading ? <ActivityIndicator color="#fff" /> : "Continue"
              }
              style="my-3"
              disabled={isLoading}
              onButtonPress={handleLogin}
            />

            <View className="mt-4">
              <Text className="text-center">
                Don't have an account?{" "}
                <Link
                  className="font-semibold text-lg text-[#2983DC]"
                  href={"/(signIn)"}
                >
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
