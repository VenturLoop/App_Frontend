import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Clipboard,
  Share,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const InviteReferalModel = ({
  isModalVisible,
  handleModalVisibility,
  nextPageRoute,
}) => {
  const [referal, setReferal] = useState("ASDFGHJKL123"); // Store the default referral code
  const [isCopied, setIsCopied] = useState(false); // Track if referral code is copied
  const translateY = React.useRef(new Animated.Value(300)).current; // Initial offset (off-screen)

  useEffect(() => {
    if (isModalVisible) {
      // Slide-up animation
      Animated.timing(translateY, {
        toValue: 0, // Bring modal to visible position
        duration: 200, // Slightly longer animation duration for smoother effect
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    } else {
      // Slide-down animation
      Animated.timing(translateY, {
        toValue: 300, // Move modal off-screen
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const handleNavigation = (route) => {
    if (isModalVisible) {
      handleModalVisibility(); // Close modal after navigation
      setTimeout(() => {
        router.push(route);
      }, 200); // Wait for modal close animation before routing
    }
  };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(referal); // Copy referral code to clipboard
      setIsCopied(true); // Show "Copied" text
      setTimeout(() => setIsCopied(false), 2000); // Hide "Copied" text after 2 seconds
    } catch (error) {
      alert("Failed to copy referral code"); // Handle error
    }
  };

  const shareReferralCode = async () => {
    try {
      await Share.share({
        message: `Use my referral code: ${referal} to get benefits!`, // The message to share
      });
    } catch (error) {
      alert("Failed to share referral code"); // Handle error
    }
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
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Copy Referral Code
          </Text>

          {/* Referral Code Input */}
          <TouchableOpacity
            onPress={copyToClipboard}
            className="bg-[#E1F3FF] flex flex-row justify-between w-full tracking-widest px-8 py-5 text-lg text-gray-600 rounded-2xl"
          >
            <Text className="text-xl tracking-wider">{referal}</Text>
            {/* Copied Text */}
            {isCopied ? (
              <Text className="text-green-500 text-lg text-center font-semibold ">
                Copied!
              </Text>
            ) : (
              <Ionicons name="copy-outline" size={23} color="#2983DC" />
            )}
          </TouchableOpacity>

          {/* Button Group */}
          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={handleModalVisibility}
              className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
            >
              <Text className="text-center text-lg text-gray-700 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity
              onPress={shareReferralCode} // Call the shareReferralCode function
              className="flex-1 w-2/3 rounded-lg py-3 bg-[#2983DC]"
            >
              <Text className="text-center text-lg text-white font-medium">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default InviteReferalModel;
