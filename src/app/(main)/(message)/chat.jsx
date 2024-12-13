import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import UserChat from "../../../components/message/UserChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* Header */}
      <View className="header flex-row px-5  justify-between border-b border-gray-300 py-4 w-full items-center">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Chat</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" color="black" size={25} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="body w-full  py-3 flex-1 px-3 "></View>

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

      <View className="footer my-4  px-5 ">
        <View className=" flex-row border border-gray-400 rounded-full w-full justify-between py-2 px-6  items-center ">
          <TextInput className="" placeholder="Your Message" />
          <TouchableOpacity className="">
            <Text className="text-gray-900 font-semibold text-lg">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
