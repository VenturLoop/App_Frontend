import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Importing useFocusEffect
import Send from "../../../components/invitation/Send";
import Saved from "../../../components/invitation/Saved";
import Invitation from "../../../components/invitation/Invitation";

const { width } = Dimensions.get("window");

const InvitationPage = () => {
  const [activeTab, setActiveTab] = useState("invitation"); // Default tab
  const tabs = ["invitation", "send", "saved"]; // Tab identifiers

  // Reset to Invitation tab when the page is focused
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab("invitation");
    }, [])
  );

  // Tab Components
  const renderContent = (tab) => {
    switch (tab) {
      case "send":
        return <Send />;
      case "saved":
        return <Saved />;
      case "invitation":
        return <Invitation />;
      default:
        return <Invitation />;
    }
  };

  return (
    <SafeAreaView className="bg-[#F0F6FB] h-screen flex-1 w-full">
      {/* Header with Tabs */}
      <View className="bg-white px-4 pt-4 pb-4 border-b border-gray-300 w-full">
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

      {/* Swipable Content */}
      <FlatList
        data={tabs}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          // Handle tab switching when swiping
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveTab(tabs[index]);
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>{renderContent(item)}</View>
        )}
        scrollEnabled
        contentContainerStyle={{ flexGrow: 1 }}
        initialScrollIndex={tabs.indexOf("invitation")} // Always start from the Invitation tab
      />
    </SafeAreaView>
  );
};

export default InvitationPage;
