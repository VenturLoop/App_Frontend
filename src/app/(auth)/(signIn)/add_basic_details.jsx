import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";

const add_basic_details = () => {
  const [otp, setOTP] = useState("");
  return (
    <SafeAreaView className="py-6 px-8 h-screen  flex justify-between gap-5 flex-col ">
      <View className="header flex flex-col  items-start justify-start gap-4 ">
        <Text className="text-[#21262E]  mt-4  font-bold text-3xl">
          Add your basic Details
        </Text>
        <Text className="text-start text-lg  text-[#61677D]">
          Provide your basic details to complete your profile and unlock
          personalised opportunities!
        </Text>
        <View className="flex-row items-center my-4 ">
          <View className="flex-1 h-px  bg-gray-300" />
        </View>
      </View>
      <View className="flex justify-start mb-10   gap-4 items-center">
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Email</Text>
          <TextInput
            inputMode="email"
            placeholder="you@example.com"
            className="bg-[#2982dc14] w-full  placeholder:text-[#7C8BA0] px-6 py-5  rounded-lg  p-2"
            // placeholderTextColor="#61677D"
            keyboardType="numeric"
          />
        </View>
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Birthday</Text>
          <View className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-sm   placeholder:text-[#7C8BA0] px-6   rounded-lg  p-2">
            <TextInput
              // inputMode="calendarEvent"
              dataDetectorTypes="calendarEvent"
              placeholder=""
              className="placeholder:text-sm'"
              // placeholderTextColor="#61677D"
              keyboardType="numeric"
            />
            <Image source={imagePath.calender}  />
          </View>
        </View>{" "}
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Location</Text>
          <View className="bg-[#2982dc14] w-full flex flex-row items-center justify-between   placeholder:text-[#7C8BA0] px-6   rounded-lg  p-2">
            <TextInput
              // inputMode="calendarEvent"
              dataDetectorTypes="calendarEvent"
              placeholder="Search Location"
              // placeholderTextColor="#61677D"
              keyboardType="numeric"
            />
            <Image source={imagePath.location} className="" />
          </View>
        </View>{" "}
      </View>
      <View className="footer flex ">
        <CustomeButton
          title="Continue"
          // onButtonPress={() => {
          //   router.navigate("/add_basic_details");
          // }}
        />
      </View>
    </SafeAreaView>
  );
};

export default add_basic_details;
