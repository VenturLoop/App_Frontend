import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const ProfileNav = ({
  firstTab,
  secondTab,
  firstTabNavigation,
  setActiveTabNavigation,
}) => {
  const [activeTab, setActiveTab] = useState("myProfile"); // To track active tab

  return (
    <View className="bg-white px-4 pt-12 pb-5 border-b-[0.5px] border-gray-300  w-full">
      <View className="flex-row bg-[#F0F6FB]  rounded-full  justify-between items-center">
        {/* My Profile Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("myProfile")}
          className={`py-3 px-6 w-1/2 rounded-full ${
            activeTab === "myProfile" ? "bg-[#2983DC]" : "bg-transparent"
          }`}
        >
          <Text
            className={`text-lg text-center ${
              activeTab === "myProfile" ? "text-white" : "text-black"
            }`}
          >
            My Profile
          </Text>
        </TouchableOpacity>

        {/* Preview Profile Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab("previewProfile")}
          className={`py-3 px-6 w-1/2 rounded-full ${
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
  );
};

export default ProfileNav;
