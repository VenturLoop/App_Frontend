import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import UserChat from "../../../components/message/UserChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Request = () => {
  return (
    <SafeAreaView className="flex-1  bg-white ">
      {/* Header */}
      <View className="header flex-row px-5  justify-between border-b border-gray-300 py-4 w-full items-center">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Requist</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" color="black" size={25} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="body w-full  py-3 flex-1 px-3 "></View>

      <View className="px-4">
        <View className="bg-[#2983DC1C]  flex items-center justify-center  gap-4  rounded-xl px-3 py-4">
          <Text className="font-semibold ">
            <Text className="text-lg font-bold">Smit Patel</Text> sent you a
            message Invite
          </Text>
          <View className="flex-row items-center gap-5">
            {/* Upgrade button */}
            <TouchableOpacity className=" bg-[#2983DC] px-3 py-1.5 rounded-xl">
              <Text className="text-lg tracking-widest text-white font-semibold">
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg tracking-wider text-[#2983DC] font-medium">
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* {buttonRoute && (
          <View className="footer px-5 w-full">
            <CustomeButton
              onButtonPress={() => {
                router.navigate(buttonRoute);
              }}
              title={buttonTitle}
            />
          </View>
        )} */}

        <View className="footer my-4   ">
          <View className=" flex-row border border-gray-400 rounded-full w-full justify-between py-1.5 px-6  items-center ">
            <TextInput className="" placeholder="Your Message" />
            <TouchableOpacity className="">
              <Text className="text-[#2983DC] font-semibold text-xl">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Request;
