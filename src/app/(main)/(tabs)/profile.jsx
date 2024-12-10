import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import PreviewProfile from "../../../components/profile/PreviewProfile";
import MyProfile from "../../../components/profile/MyProfile";

const profile = () => {
  const [activeTab, setActiveTab] = useState("myProfile"); // To track active tab

  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen  flex-1 justify-between  items-center w-full ">
      <View className="bg-white px-4 pt-4 pb-4 border-b-[0.5px] border-gray-300  w-full">
        <View className="flex-row bg-[#F0F6FB]  rounded-full  justify-between items-center">
          {/* My Profile Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("myProfile")}
            className={`py-3 px-6 w-1/2 rounded-full ${
              activeTab === "myProfile" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg font-medium text-center ${
                activeTab === "myProfile" ? "text-white" : "text-black"
              }`}
            >
              My Profile
            </Text>
          </TouchableOpacity>

          {/* Preview Profile Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("previewProfile")}
            className={`py-3 px-6 w-1/2 font-medium rounded-full ${
              activeTab === "previewProfile" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg text-center ${
                activeTab === "previewProfile" ? "text-white" : "text-black"
              }`}
            >
              Preview Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 items-center py-4 px-6">
        {activeTab === "previewProfile" ? <PreviewProfile /> : <MyProfile />}
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default profile;
