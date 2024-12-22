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
import CustomeButton from "../buttons/CustomeButton";

const AuthModel = ({
  isModalVisible,
  handleModalVisibility,
  handleSignup,
  handleLogin,
}) => {
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
          className="bg-white rounded-t-3xl gap-2 px-8 py-8 shadow-lg"
        >
          {/* Block User Button */}
          <CustomeButton
            onButtonPress={handleSignup}
            title="Create Account"
            style="my-2"
            className="w-full bg-[#2983DC] rounded-xl py-4 my-2"
            textClassName="text-white text-lg font-semibold"
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full border border-[#2983DC] rounded-xl py-4 my-2"
          >
            <Text className="text-center text-[#2983DC] text-lg font-semibold">
              Login
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

export default AuthModel;
