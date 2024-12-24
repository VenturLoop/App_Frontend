import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import imagePath from "../../constants/imagePath";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const TopNavar = () => {
  const [notificationCount, setnotificationCount] = useState(1);

  return (
    <View className="flex-row bg-white  px-6 py-3 flex w-full justify-between border-b-[0.5px] pb-3 border-gray-300 items-center">
      <TouchableOpacity
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Image
          resizeMode="contain"
          className="w-12 h-12"
          source={imagePath.homeAppLOgo}
        />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-5">
        <TouchableOpacity
          className="p-3"
          onPress={() => {
            router.push("/notification");
          }}
          style={{ position: "relative" }}
        >
          <FontAwesome6 size={24} color="#2983DC" name="bell" />

          {notificationCount > 0 && (
            <View
              style={{
                position: "absolute",
                right: 4,
                top: 4,
                backgroundColor: "#2983DC",
                borderRadius: 10,
                width: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
              >
                {notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/subscription_page");
          }}
          className="border-[0.5px] border-gray-400 rounded-full p-3"
        >
          <Image
            resizeMode="contain"
            className="w-6 h-6  "
            source={imagePath.current}
          />
          {/* <Ionicons name="flash" size={20} color="#2983DC" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavar;
