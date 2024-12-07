import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import CustomeButton from "../buttons/CustomeButton";
import { router } from "expo-router";

const ReferalModel = ({
  isModalVisible,
  handleModalVisibility,
  routerToNextPage,
}) => {
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleModalVisibility}
    >
      {/* Semi-transparent background */}
      <Pressable
        style={{ height: 530, backgroundColor: "#DDD", opacity: 0.5 }}
        onPress={handleModalVisibility}
      />

      {/* <View className="flex-1 justify-end bg-black bg-opacity-30"> */}
      <View className="w-full bg-white rounded-t-3xl flex-1  gap-10  px-8  py-6  items-center">
        {/* Button : Cancel */}
        <Text className="text-xl font-semibold ">
          Do you have a referral code?
        </Text>
        <TextInput
          placeholder="Referral Code"
          className="bg-[#2982dc14]  w-full placeholder:font-medium px-6 py-5 text-lg  rounded-lg text-gray-500 p-2"
          // placeholderTextColor="#61677D"
        />
        <View className=" flex-row gap-3">
          <TouchableOpacity
            onPress={handleModalVisibility}
            className=" w-1/3 border border-gray-300 rounded-xl py-4"
          >
            <Text className=" text-center font-medium ">Don't have</Text>
          </TouchableOpacity>
          {/* Buttons :Create Account*/}
          <TouchableOpacity
            onPress={routerToNextPage}
            className=" bg-[#2983DC] rounded-xl w-2/3 py-4"
          >
            <Text className=" text-white font-medium text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default ReferalModel;
