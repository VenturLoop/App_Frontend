import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import imagePath from "../../constants/imagePath";
import { FontAwesome } from "@expo/vector-icons";

const TopNavar = () => {
  return (
    <View className="flex-row bg-white px-4 flex w-full justify-between border-b-[0.5px] pb-3 border-gray-300 items-center">
      <TouchableOpacity>
        <Image
          resizeMode="contain"
          className="w-12 h-12"
          source={imagePath.homeAppLOgo}
        />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-10">
        <TouchableOpacity>
          <FontAwesome size={24} color="#2983DC" name="sliders" />
        </TouchableOpacity>
        <TouchableOpacity className="border-[0.5px] border-gray-400 rounded-full p-3">
          <Image
            resizeMode="contain"
            className="w-6 h-6  "
            source={imagePath.current}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavar;
