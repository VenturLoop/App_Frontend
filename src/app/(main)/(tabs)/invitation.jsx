import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Send from "../../../components/invitation/Send";
import Saved from "../../../components/invitation/Saved";
import Invitation from "../../../components/invitation/Invitation";

const { width } = Dimensions.get("window");

const InvitationPage = () => {
  const [activeTab, setActiveTab] = useState("invitation");
  const tabs = ["invitation", "send", "saved"];
  const flatListRef = useRef(null); // Ref for FlatList

  // Reset to Invitation tab when the page is focused
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab("invitation");
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }, [])
  );

  // Handle tab change by clicking
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update active tab
    const index = tabs.indexOf(tab);
    flatListRef.current?.scrollToIndex({ index, animated: true }); // Scroll FlatList to the correct index
  };

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
        <View className="flex-row bg-[#F0F6FB] rounded-full justify-between items-center">
          {/* Invitation Tab */}
          <TouchableOpacity
            onPress={() => handleTabChange("invitation")}
            className={`py-3 px-6 w-1/3 rounded-full ${
              activeTab === "invitation" ? "bg-[#2983DC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-lg text-center ${
                activeTab === "invitation"
                  ? "text-white font-semibold"
                  : "text-black"
              }`}
            >
              Invitation
            </Text>
          </TouchableOpacity>

          {/* Send Tab */}
          <TouchableOpacity
            onPress={() => handleTabChange("send")}
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

          {/* Saved Tab */}
          <TouchableOpacity
            onPress={() => handleTabChange("saved")}
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
        ref={flatListRef} // Attach FlatList ref
        data={tabs}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveTab(tabs[index]); // Update activeTab when swiped
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>{renderContent(item)}</View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        initialScrollIndex={tabs.indexOf("invitation")}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

export default InvitationPage;
