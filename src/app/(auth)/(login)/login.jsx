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
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import TextBox from "react-native-password-eye";
import PageLoading from "../../../components/loading/PageLoading";

const login = () => {
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = () => {
    setisLoading(true);
    setTimeout(() => {
      router.push("/(main)");
      setisLoading(false);
    }, 4000);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
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
              Log in with LinkedIn or mobile number for quick and secure access!
            </Text>
          </View>
          <View className="flex justify-center gap-4 items-center">
            <TouchableOpacity
              onPress={() => {
                router.push("/(main)");
              }}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              {/* LinkedIn Logo */}
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.lingedInLogo}
              />
              {/* LinkedIn Text */}
              <Text className="text-[#61677D] font-medium text-lg">
                LinkedIn
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-lg font-medium text-gray-400">Or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <TextInput
              placeholder="Phone Number"
              className="bg-[#2982dc23] w-full px-6 py-5 placeholder:opacity-70 rounded-lg text-gray-600"
              keyboardType="numeric"
            />
            <TextBox
              className="bg-[#2982dc14]  w-full placeholder:font-medium px-6    rounded-lg text-gray-500 p-2"
              onChangeText={(text) => console.log("onChangeText: ", text)}
              secureTextEntry={true}
              placeholder="Password"
            />
            <Link
              className="font-medium text-start w-full px-2 text-[#2983DC]"
              href={"/forgatePass"}
            >
              Forgate Password?
            </Link>
          </View>
          {/* Footer Section */}
          <View className="footer  mb-0 bottom-0">
            <CustomeButton
              title="Continue"
              style="my-3"
              onButtonPress={() => {
                handleLogin();
              }}
            />
            <View className="mt-4">
              <Text className="text-center">
                Do you have an account?{" "}
                <Link
                  className="font-semibold text-lg text-[#2983DC]"
                  href={"/login"}
                >
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
