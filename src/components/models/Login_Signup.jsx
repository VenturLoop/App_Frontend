import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import CustomeButton from "../buttons/CustomeButton";
import { router } from "expo-router";

const LoginSignupModel = ({ isModalVisible, handleModalVisibility }) => {
  const create_account = () => {
    router.navigate("/create_account.jsx");
  };

  return (
    <Modal
      // animationType="slide"
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
        // className="flex-1 bg-black bg-opacity-50 justify-end"
        onPress={handleModalVisibility}
      />

      {/* Modal Content */}
      <View className="bg-white rounded-t-3xl px-6 py-8 items-center">
        {/* Create Account Button */}
        <CustomeButton
          onButtonPress={() => router.push("/(signIn)")}
          title="Create Account"
          style="w-full my-2"
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="w-full border border-blue-500 rounded-xl py-3 my-2"
        >
          <Text className="text-center text-blue-500 text-lg font-medium">
            Login
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity onPress={handleModalVisibility} className="mt-4">
          <Text className="text-center text-gray-500 text-lg font-medium">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LoginSignupModel;
