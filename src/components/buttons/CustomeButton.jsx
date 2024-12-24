import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";

const CustomeButton = ({
  onButtonPress,
  title,
  style,
  background = false,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      className={` rounded-xl ${
        style ? style : "my-6"
      } w-full flex justify-center items-center py-4 ${
        background === true ? "bg-gray-500 opacity-50" : "bg-[#2983DC]"
      } text-center`}
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
