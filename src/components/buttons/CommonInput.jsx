import { View, Text } from "react-native";
import React from "react";

const CommonInput = ({ value, placeholder, keyboardType, onChangeValue }) => {
  return (
    <TextInput
      className = ""
      onChangeText={onChangeValue}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

export default CommonInput;
