import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomToast = ({ message, type = "default", onDismiss = () => {} }) => {
  // Define colors and styles based on the toast type
  const colors = {
    success: {
      background: "bg-green-50",
      border: "border-green-500",
      iconBackground: "bg-green-100",
      iconColor: "text-green-500",
    },
    danger: {
      background: "bg-red-50",
      border: "border-red-500",
      iconBackground: "bg-red-100",
      iconColor: "text-red-500",
    },
    delete: {
      background: "bg-red-50",
      border: "border-red-500",
      iconBackground: "bg-red-100",
      iconColor: "text-red-500",
    },
    logout: {
      background: "bg-red-50",
      border: "border-red-500",
      iconBackground: "bg-red-100",
      iconColor: "text-red-500",
    },
    warning: {
      background: "bg-yellow-50",
      border: "border-yellow-500",
      iconBackground: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    error: {
      background: "bg-orange-50",
      border: "border-orange-500",
      iconBackground: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    save: {
      background: "bg-yellow-50",
      border: "border-yellow-500",
      iconBackground: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    info: {
      background: "bg-blue-50",
      border: "border-blue-500",
      iconBackground: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    default: {
      background: "bg-gray-50",
      border: "border-gray-300",
      iconBackground: "bg-gray-100",
      iconColor: "text-gray-500",
    },
  };

  const selectedColor = colors[type] || colors.default;

  const icon =
    type === "success"
      ? "checkmark-circle-outline"
      : type === "danger"
      ? "close-circle-outline"
      : type === "delete"
      ? "trash-outline"
      : type === "save"
      ? "refresh"
      : type === "logout"
      ? "log-out-outline"
      : type === "warning"
      ? "bookmark-outline"
      : type === "info"
      ? "information-circle-outline"
      : type === "error"
      ? "information-circle-outline"
      : "information-circle-outline"; // Default icon

  return (
    <View className="w-full flex items-center justify-s px-4 py-2">
      <View
        className={`flex-row items-center px-4 py-1.5 rounded-lg shadow-md ${selectedColor.background} ${selectedColor.border} border`}
        style={{
          maxWidth: "90%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View className="w-1 bg-green-600 rounded-l-md"></View>
        {/* Side border */}
        {/* Icon Section */}
        <View
          className={`rounded-full justify-center items-center ${selectedColor.iconBackground}`}
          style={{
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Ionicons
            name={icon}
            size={24}
            style={{ color: selectedColor.iconColor }}
          />
        </View>
        {/* Message Section */}
        <Text
          className="text-gray-700 text-sm font-medium"
          style={{ flex: 1, color: "#4a4a4a", fontSize: 16 }}
        >
          {message}
        </Text>
        {/* Close Button */}
      </View>
    </View>
  );
};

export default CustomToast;
