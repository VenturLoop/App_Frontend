import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import PageLoading from "../loading/PageLoading"; // Ensure the PageLoading component is imported
import { Ionicons } from "@expo/vector-icons";

const InviteReferalModel = ({
  isModalVisible,
  handleModalVisibility,
  routerToNextPage,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [referal, setReferal] = useState(""); // Store referral code input

  // Function to handle the "Continue" button press
  const handleContinue = () => {
    setIsLoading(true); // Show loading screen
    // setTimeout(() => {
    //   setIsLoading(false); // Hide loading screen after 4000ms
    //   routerToNextPage(); // Navigate to the next page
    // }, 4000);
  };

  return (
    <Modal
      animationType="fade" // Smooth fade-in and fade-out animation
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleModalVisibility}
    >
      {/* Semi-transparent Background */}
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        }}
        className="flex-1  justify-end"
        onPress={handleModalVisibility}
      />
      {isLoading ? (
        <View className="bg-white rounded-t-2xl h-40 justify-center px-6 py-8 items-center">
          <PageLoading noLogo={true} smallLoading={true} />
        </View>
      ) : (
        <View className="bg-white rounded-t-2xl gap-5 px-6 py-8 items-center">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Copy referral code
          </Text>

          {/* Referral Input
          <TextInput
            placeholder="Referral Code"
            value="ASDFGHJKL123" // Set the value of the input field to referal state
            onChangeText={(text) => setReferal(text)} // Update the referal state on change
            /> */}
          <TouchableOpacity className="bg-[#2982dc11] flex flex-row justify-between  w-full tracking-widest px-8 py-5 text-lg text-gray-600  rounded-2xl">
            <Text className="text-xl tracking-wider ">ASDFGHJKL123</Text>
            <Ionicons name="copy-outline" size={25} color="#2983DC" />
          </TouchableOpacity>

          {/* Button Group */}
          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            {/* "Don't Have" Button */}
            <TouchableOpacity
              onPress={handleModalVisibility}
              className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
            >
              <Text className="text-center text-lg text-gray-700 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue} // Call handleContinue function
              className={`flex-1 w-2/3 rounded-lg py-3  bg-[#2983DC]
              `} // Disable button if no referral code
            >
              <Text className="text-center text-lg text-white font-medium">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default InviteReferalModel;
