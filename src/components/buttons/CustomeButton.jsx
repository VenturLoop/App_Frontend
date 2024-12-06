import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";

const CustomeButton = ({ onButtonPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      className={` rounded-xl ${
        style ? style : "my-10"
      } w-full flex justify-center items-center py-4 bg-[#2983DC] text-center`}
      accessibilityRole="button"
    >
      <Text
        className={textStyle ? textStyle : `text-white font-medium text-xl`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;
