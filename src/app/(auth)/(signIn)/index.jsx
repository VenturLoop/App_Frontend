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
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";

const Index = () => {
  const [isChecked, setChecked] = useState(false);
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
            <Image className="w-16 h-16" source={imagePath.vector} />
            <Text className="text-black text-center mt-4 font-bold text-3xl">
              Create Account
            </Text>
            <Text className="text-center text-[#61677D]">
              Create Your Account – Sign Up with LinkedIn or Mobile for Quick
              Access!
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex flex-col gap-4">
            <TouchableOpacity
              onPress={() => {
                router.push("/(profile_data)");
              }}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.lingedInLogo}
              />
              <Text className="text-[#61677D] font-medium text-lg">
                LinkedIn
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-lg font-semibold text-gray-400">
                Or
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
            <TextInput
              placeholder="Name"
              className="bg-[#2982dc14] w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
            />
            <TextInput
              placeholder="Phone Number"
              className="bg-[#2982dc14] w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
              keyboardType="numeric"
            />
            <View className="flex flex-row  gap-3 mt-4 justify-center">
              <Checkbox className="bg-[#F5F9FE] " color="bg-#F5F9FE" value={isChecked} onValueChange={setChecked} />
              <Text className="">
                I'm agree to the{" "}
                <Link className="font-semibold text-[#2983DC]" href={"/"}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="font-semibold text-[#2983DC]" href={"/"}>
                  Privacy Policy
                </Link>
              </Text>
            </View>
          </View>

          {/* Footer Section */}
          <View className="footer mt-4">
            <CustomeButton
              title="Continue"
              style="my-3"
              onButtonPress={() => {
                router.navigate("/otp");
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;
