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
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setLogin, setUser, updateUser } from "../../../redux/slices/userSlice"; // Adjust import path as needed
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Toast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { userLogin } from "../../../api/profile";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.push(route);
    }, 100); // Add a small delay of 100ms
  };

  const handleLogin = async () => {
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

    try {
      const result = await userLogin(email, password);

      if (result.success) {
        // Update Redux state with login info
        dispatch(setLogin({ isLogin: true, loginToken: result.token }));
        dispatch(updateUser({ field: "userId", value: result.user.id }));
        dispatch(setUser(result.user));

        // Store token in SecureStore and AsyncStorage
        await SecureStore.setItemAsync("userToken", result.token);
        await AsyncStorage.setItem("userLocalToken", result.token);
        await AsyncStorage.setItem("userLocalId", result.user.id.toString());

        handleNavigation("/(tabs)");
        Toast.show("Login successful!", { type: "success" });
      } else {
        Toast.show(result.message, { type: "error" });
      }
    } catch (error) {
      Toast.show("Something went wrong. Please try again.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (input) => {
    // Remove spaces and trim the input
    const formattedEmail = input.trim();
    setEmail(formattedEmail);
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
            gap: 50,
          }}
          className="px-8 flex-1 py-6"
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

          {/* Login Inputs */}
          <View className="justify-start flex-1 gap-4">
            <TextInput
              placeholder="Email Address"
              className="bg-[#2982dc14] w-full px-6 py-5 font-medium text-lg rounded-lg text-slate-700"
              underlineColorAndroid={"transparent"}
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />

            {/* Password Input */}
            <View className="flex items-center justify-between ">
              <TextInput
                className="bg-[#2982dc14] text-lg w-full placeholder:font-medium px-6 py-5 rounded-lg text-slate-700"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                placeholder="Password"
                underlineColorAndroid={"transparent"}
                value={password}
              />
              <TouchableOpacity
                className="absolute right-4 py-1 px-3 top-4"
                onPress={() => setshowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={23}
                  color="#2983DC"
                />
              </TouchableOpacity>
            </View>

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
