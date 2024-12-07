import { View, Text, Modal, TouchableOpacity, Image, Pressable } from "react-native";
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
      {/* <View className="flex-1 justify-end bg-black bg-opacity-30"> */}
      <Pressable style={{height:550 , backgroundColor:"#DDD", opacity:.5}} onPress={handleModalVisibility} />
        <View className="w-full bg-white rounded-t-3xl   flex-1   px-8  py-4  items-center">
          {/* Buttons :Create Account*/}
          <CustomeButton
            onButtonPress={() => router.push("/(signIn)")}
            title="Create Account"
            style="my-5"
          />

          {/* Button : login */}
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="w-full border border-[#2983DC] rounded-xl py-4 mb-3"
          >
            <Text className="text-center  text-blue-500 font-medium  text-xl">
              Login
            </Text>
          </TouchableOpacity>

          {/* Button : Cancel */}
          <TouchableOpacity
            onPress={handleModalVisibility}
            className="w-full py-3"
          >
            <Text className="text-center text-xl text-gray-500 font-medium ">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      {/* </View> */}
    </Modal>
  );
};

export default LoginSignupModel;
