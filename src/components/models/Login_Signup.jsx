import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import CustomeButton from "../buttons/CustomeButton";
import { router } from "expo-router";

const LoginSignupModel = ({ isModalVisible, handleModalVisibility }) => {
  const handleNavigation = (route) => {
    if (isModalVisible) {
      handleModalVisibility(); // Close modal after navigation
      setTimeout(() => {
        router.push(route);
      }, 100); // Wait for modal close animation before routing
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleModalVisibility}
    >
      {/* Semi-transparent background */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          justifyContent: "flex-end",
        }}
        onPress={handleModalVisibility}
      >
        {/* Modal Content */}
        <View className=" bg-white  rounded-t-3xl px-8 py-6 items-center shadow-lg">
          {/* Create Account Button */}
          <CustomeButton
            onButtonPress={() => handleNavigation("/(signIn)")}
            title="Create Account"
            style="my-2"
            className="w-full bg-[#2983DC] rounded-xl py-4 my-2"
            textClassName="text-white text-lg font-semibold"
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => handleNavigation("/login")}
            className="w-full border border-[#2983DC] rounded-xl py-4 my-2"
          >
            <Text className="text-center text-[#2983DC] text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity onPress={handleModalVisibility} className="mt-2">
            <Text className="text-center text-gray-500 text-lg font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default LoginSignupModel;
