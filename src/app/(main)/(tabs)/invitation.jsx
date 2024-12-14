import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Send from "../../../components/invitation/Send";
import Saved from "../../../components/invitation/Saved";
import Invitation from "../../../components/invitation/Invitation";

const invitation = () => {
  const [activeTab, setActiveTab] = useState("invitation"); // To track active tab

  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen  flex-1 justify-between  items-center w-full ">
      <View className="bg-white px-4 pt-4 pb-4 border-b-[0.5px] border-gray-300  w-full">
        <View className="flex-row bg-[#F0F6FB]  rounded-full  justify-between items-center">
          {/* Invitation Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("invitation")}
            className={`py-3 px-6 w-1/3 rounded-full ${
              activeTab === "invitation" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg  text-center ${
                activeTab === "invitation"
                  ? "text-white font-semibold "
                  : "text-black"
              }`}
            >
              Invitation
            </Text>
          </TouchableOpacity>

          {/* Send Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("send")}
            className={`py-3 px-6 w-1/3 font-medium rounded-full ${
              activeTab === "send" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg text-center ${
                activeTab === "send" ? "text-white font-semibold" : "text-black"
              }`}
            >
              I've Send
            </Text>
          </TouchableOpacity>
          {/* Saved */}
          {/* Preview Profile Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("saved")}
            className={`py-3 px-6 w-1/3 font-medium rounded-full ${
              activeTab === "saved" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg text-center ${
                activeTab === "saved"
                  ? "text-white font-semibold"
                  : "text-black"
              }`}
            >
              I've Saved
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex-1 px-4  ">
        {activeTab === "send" ? (
          <Send />
        ) : activeTab === "saved" ? (
          <Saved />
        ) : (
          <Invitation />
        )}
      </View>
    </SafeAreaView>
  );
};

export default invitation;
