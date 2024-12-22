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
import { setLogin } from "../../../redux/slices/userSlice"; // Adjust import path as needed
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import TextBox from "react-native-password-eye";
import { Toast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { userLogin } from "../../../api/profile";
// import Auth from "../../../components/auth/Auth";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

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
        // Navigate to the home page or dashboard
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
          <View className=" justify-start flex-1 gap-4">
            {/* <Auth/> */}

            {/* <TouchableOpacity
              // onPress={() => handleNavigation("/(profile_data)")}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.google}
              />
              <Text className="text-[#61677D] font-medium text-lg">Google</Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-lg font-semibold text-gray-400">
                Or
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View> */}
            <TextInput
              placeholder="Email Address"
              className="bg-[#2982dc14] w-full px-6 py-5  font-medium text-lg rounded-lg text-slate-700"
              underlineColorAndroid={"transparent"}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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
