import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import { router } from "expo-router";

const UserModel = ({ isModalVisible, handleModalVisibility }) => {
  const translateY = React.useRef(new Animated.Value(300)).current; // Initial offset (off-screen)

  useEffect(() => {
    if (isModalVisible) {
      // Slide-up animation
      Animated.timing(translateY, {
        toValue: 0, // Bring modal to visible position
        duration: 100, // Animation duration
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    } else {
      // Slide-down animation
      Animated.timing(translateY, {
        toValue: 300, // Move modal off-screen
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

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
          {/* Setting Button */}
          <TouchableOpacity
            // onPress={() => handleNavigation("/setting")}
            className="w-full border border-gray-300 rounded-xl py-4 my-2"
          >
            <Text className="text-center text-gray-800 text-lg font-semibold">
              Block User
            </Text>
          </TouchableOpacity>

          {/* Share Profile Button */}
          <TouchableOpacity
            //   onPress={() => handleNavigation("/share")}
            className="w-full border border-red-500 rounded-xl py-4 my-2"
          >
            <Text className="text-center text-red-600 text-lg font-semibold">
              Report User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            //   onPress={() => handleNavigation("/share")}
            className="w-full border border-gray-300 rounded-xl py-4 my-2"
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
