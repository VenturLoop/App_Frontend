import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

import Request from "../../../components/message/Request";
import UserMessages from "../../../components/message/UserMessages";
const message = () => {
  const [activeTab, setActiveTab] = useState("message"); // To track active tab

  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen  flex-1 justify-between  items-center w-full ">
      <View className="bg-white px-4 pt-4 pb-4 border-b-[0.5px] border-gray-300  w-full">
        <View className="flex-row bg-[#F0F6FB]  rounded-full  justify-between items-center">
          {/* My Profile Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("message")}
            className={`py-3 px-6 w-1/2 rounded-full ${
              activeTab === "message" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg  text-center ${
                activeTab === "message" ? "text-white font-semibold" : "text-black"
              }`}
            >
              Messages
            </Text>
          </TouchableOpacity>

          {/* Preview Profile Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("request")}
            className={`py-3 px-6 w-1/2 font-medium rounded-full ${
              activeTab === "request" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg text-center ${
                activeTab === "request" ? "text-white font-semibold" : "text-black"
              }`}
            >
              Requests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex-1 px-4 pt-4 ">
        {activeTab === "request" ? <Request /> : <UserMessages />}
      </View>
    </SafeAreaView>
  );
};

export default message;
