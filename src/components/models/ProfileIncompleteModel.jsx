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

const ProfileIncompleteModel = ({
  isModalVisible,
  handleModalVisibility,
  completionPercentage,
}) => {
  const translateY = React.useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const handleContinue = () => {
    handleModalVisibility(); // Close modal first
    setTimeout(() => {
      router.push("/edit_profile"); // Redirect after modal close animation
    }, 150); // Ensure enough delay for smooth animation
  };

  return (
    <Modal animationType="none" transparent={true} visible={isModalVisible}>
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={handleModalVisibility}
      >
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-3xl gap-6 px-6 py-8 items-center"
        >
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Your Profile is Incomplete
          </Text>

          <Text className="text-lg text-gray-600 mb-4 text-center">
            Complete your profile to access the matching results
          </Text>
          <View className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <View
              className="bg-[#2983DC] h-2 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </View>
          <Text className="text-center text-sm text-gray-600">
            Profile completion: {completionPercentage}%
          </Text>

          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            <TouchableOpacity
              onPress={handleContinue} // Call the refined handler
              className="flex-1 w-2/3 rounded-lg py-3 bg-[#2983DC]"
            >
              <Text className="text-center text-lg text-white font-medium">
                Complete Profile
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ProfileIncompleteModel;
