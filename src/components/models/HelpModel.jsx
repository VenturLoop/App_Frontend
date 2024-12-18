import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Linking,
} from "react-native";

const HelpModel = ({ isModalVisible, handleModalVisibility }) => {
  const translateY = useRef(new Animated.Value(300)).current; // Initial offset (off-screen)

  useEffect(() => {
    const animateModal = (toValue) => {
      Animated.timing(translateY, {
        toValue,
        duration: 300, // Adjusted for smoother animation
        useNativeDriver: true,
      }).start();
    };

    // Trigger slide-up or slide-down animation based on visibility
    isModalVisible ? animateModal(0) : animateModal(300);
  }, [isModalVisible]);

  const handleCallSupport = () => {
    const supportNumber = "tel:7603037718"; // Updated with the provided number
    Linking.openURL(supportNumber).catch((err) =>
      console.error("Failed to open dialer:", err)
    );
  };

  return (
    <Modal
      animationType="none" // Disable default animations to apply custom ones
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleModalVisibility}
    >
      {/* Semi-transparent background */}
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={handleModalVisibility}
      >
        {/* Modal Content */}
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-3xl gap-6 px-6 py-8 items-center"
        >
          {/* Title */}
          {/* <Ionicons name="call-outline" color="#2983DC" size={40} /> */}

          {/* <Image source={imagePath.delete} className="w-20 h-20" /> */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Need Help? contact us
          </Text>
          <Text className="text-center px-4 text-gray-500  font-medium">
            we are available 24/7 to help you with all your quries
          </Text>

          {/* Referral Input */}
          {/* Button Group */}
          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            {/* "Don't Have" Button */}
            <TouchableOpacity
              onPress={handleModalVisibility}
              className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
            >
              <Text className="text-center text-lg text-[#] font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleCallSupport}
              className={`flex-row items-center gap-2 justify-center  w-2/3 px-2 rounded-lg py-3 
                         bg-[#2983DC]
                       `} // Disable button if no referral code
              // Disable the button if referral is empty
            >
              <Text className="text-center text-lg text-white font-medium">
                Call us
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default HelpModel;
