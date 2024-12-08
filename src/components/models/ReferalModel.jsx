import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

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
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          justifyContent: "flex-end",
        }}
        // className="flex-1 bg-black bg-opacity-50 justify-end"
        onPress={handleModalVisibility}
      />

      {/* Modal Content */}
      <View className="w-full bg-white rounded-t-3xl px-6 py-8 items-center">
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Do you have a referral code?
        </Text>

        {/* Referral Input */}
        <TextInput
          placeholder="Referral Code"
          className="bg-[#2982dc14]  w-full placeholder:font-medium px-6 py-5 text-lg  rounded-lg text-gray-500 p-2"
          // placeholderTextColor="#61677D"
        />

        {/* Button Group */}
        <View className="w-full flex-row justify-between mt-6">
          {/* Don't Have Button */}
          <TouchableOpacity
            onPress={handleModalVisibility}
            className="flex-1 border border-gray-300 rounded-lg py-3 mr-2"
          >
            <Text className="text-center text-lg text-gray-700 font-medium">
              Don't have
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={routerToNextPage}
            className="flex-1 bg-blue-500 rounded-lg py-3 ml-2"
          >
            <Text className="text-center text-lg text-white font-medium">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReferalModel;
