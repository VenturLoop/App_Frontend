import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Share,
} from "react-native";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

const UserModel = ({ isModalVisible, handleModalVisibility }) => {
  const translateY = React.useRef(new Animated.Value(300)).current; // Initial offset (off-screen)

  useEffect(() => {
    if (isModalVisible) {
      // Slide-up animation
      Animated.timing(translateY, {
        toValue: 0, // Bring modal to visible position
        duration: 200, // Animation duration for smoother effect
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

  const handleBlockUser = () => {
    handleModalVisibility();
    Toast.show("User blocked successfully", {
      type: "danger",
    });
  };

  const handleReportUser = () => {
    handleModalVisibility();
    Toast.show(" User reported successfully", {
      type: "danger",
    });
  };

  const shareProfile = async () => {

    try {
      await Share.share({
        message: "Check out this profile! [Insert Profile Link Here]", // Customize the message with the profile link
      });
    } catch (error) {
      alert("Failed to share profile");
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
          className="bg-white rounded-t-3xl px-8 py-6 shadow-lg"
        >
          {/* Block User Button */}
          <TouchableOpacity
            onPress={handleBlockUser}
            className="w-full border border-gray-300 rounded-xl py-4 my-2 "
          >
            <Text className="text-center text-gray-800 text-lg font-semibold">
              Block User
            </Text>
          </TouchableOpacity>

          {/* Report User Button */}
          <TouchableOpacity
            onPress={handleReportUser}
            className="w-full border border-red-500 rounded-xl py-4 my-2 "
          >
            <Text className="text-center text-red-600 text-lg font-semibold">
              Report User
            </Text>
          </TouchableOpacity>

          {/* Share Profile Button */}
          <TouchableOpacity
            onPress={shareProfile} // Call the shareProfile function
            className="w-full border border-gray-300 rounded-xl py-4 my-2 bg-white"
          >
            <Text className="text-center text-gray-800 text-lg font-semibold">
              Share Profile
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity onPress={handleModalVisibility} className="mt-3">
            <Text className="text-center text-gray-500 text-lg font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default UserModel;
