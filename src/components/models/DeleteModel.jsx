import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import PageLoading from "../loading/PageLoading"; // Ensure the PageLoading component is imported
import imagePath from "../../constants/imagePath";

const DeleteModel = ({
  isModalVisible,
  handleModalVisibility,
  routerToNextPage,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [referal, setReferal] = useState(""); // Store referral code input

  // Function to handle the "Continue" button press
  const handleContinue = () => {
    setIsLoading(true); // Show loading screen
    setTimeout(() => {
      setIsLoading(false); // Hide loading screen after 4000ms
      routerToNextPage(); // Navigate to the next page
    }, 4000);
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
        className="flex-1 justify-end"
        onPress={handleModalVisibility}
      />
      {isLoading ? (
        <View className="bg-white rounded-t-2xl h-40 justify-center px-6 py-8 items-center">
          <PageLoading noLogo={true} smallLoading={true} />
        </View>
      ) : (
        <View className="bg-white rounded-t-2xl gap-6 px-6 py-8 items-center">
          {/* Title */}
          <Image source={imagePath.delete} className="w-20 h-20" />
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Are you sure you want to delete?
          </Text>

          {/* Referral Input */}

          {/* Button Group */}
          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            {/* "Don't Have" Button */}
            <TouchableOpacity
              onPress={routerToNextPage}
              className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
            >
              <Text className="text-center text-lg text-[#2983DC] font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              // onPress={handleContinue} // Call handleContinue function
              className={`flex-1 w-2/3 rounded-lg py-3 
                bg-[#2983DC]
              `} // Disable button if no referral code
              // Disable the button if referral is empty
            >
              <Text className="text-center text-lg text-white font-medium">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default DeleteModel;
