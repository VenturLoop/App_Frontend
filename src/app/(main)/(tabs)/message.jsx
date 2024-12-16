import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Importing useFocusEffect
import Request from "../../../components/message/Request";
import UserMessages from "../../../components/message/UserMessages";

const { width } = Dimensions.get("window"); // Get device width for swiping logic

const Message = () => {
  const [activeTab, setActiveTab] = useState("message"); // Default active tab
  const tabs = [
    { key: "message", label: "Messages", component: <UserMessages /> },
    { key: "request", label: "Requests", component: <Request /> },
  ];

  // Reset to "message" tab when the page is focused
  useFocusEffect(
    useCallback(() => {
      setActiveTab("message");
    }, [])
  );

  return (
    <SafeAreaView className="bg-[#F0F6FB] h-screen flex-1 w-full">
      {/* Header Tabs */}
      <View className="bg-white px-4 pt-4 pb-4 border-b border-gray-300 w-full">
        <View className="flex-row bg-[#F0F6FB] rounded-full justify-between items-center">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`py-3 px-6 w-1/2 rounded-full ${
                activeTab === tab.key ? "bg-[#2983DC]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-lg text-center ${
                  activeTab === tab.key
                    ? "text-white font-semibold"
                    : "text-black font-medium"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Swipable Content */}
      <FlatList
        data={tabs}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveTab(tabs[index].key); // Sync active tab with swipe
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>
            {item.component} {/* Render corresponding tab content */}
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        initialScrollIndex={tabs.findIndex((tab) => tab.key === "message")} // Start from "message" tab
      />
    </SafeAreaView>
  );
};

export default Message;
