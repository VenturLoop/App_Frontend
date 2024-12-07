import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Link, router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView className="py-6 px-8 bg-white pt-10 flex h-screen justify-between gap-5 flex-col ">
      <View className="header flex flex-col my-6 items-center justify-center gap-4 ">
        <Image className="w-16" source={imagePath.vector} />
        <Text className="text-black text-center mt-4  font-bold text-3xl">
          Create Account
        </Text>
        <Text className="text-center text- text-[#61677D]">
          Create Your Account – Sign Up with LinkedIn or Mobile for Quick
          Access!
        </Text>
      </View>
      <View className="flex justify-center gap-4 items-center">
        <TouchableOpacity onPress={()=>{router.push("/(profile_data)")}} className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center">
          {/* LinkedIn Logo */}
          <Image
            className="w-6 h-6 mr-3"
            resizeMode="contain"
            source={imagePath.lingedInLogo}
          />
          {/* LinkedIn Text */}
          <Text className="text-[#61677D] font-medium text-lg">LinkedIn</Text>
        </TouchableOpacity>
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2 text-lg text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>
        <TextInput
          placeholder="Name"
          className="bg-[#2982dc14]  w-full placeholder:font-medium px-6 py-5  rounded-lg text-gray-500 p-2"
          // placeholderTextColor="#61677D"
        />
        <TextInput
          placeholder="Phone Number"
          className="bg-[#2982dc14] w-full placeholder:font-medium px-6 py-5  rounded-lg text-gray-500 p-2"
          // placeholderTextColor="#61677D"
          keyboardType="numeric"
        />
        <View>
          <Text>
            I’m agree to The{" "}
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
      <View className="footer">
        <CustomeButton
          title="Continue"
          onButtonPress={() => {
            router.navigate("/otp");
          }}
        />
        <View className=" ">
          <Text className="text-center">
            Do you have account?{" "}
            <Link
              className="font-semibold text-lg text-[#2983DC]"
              href={"/login"}
            >
              Sign In
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
