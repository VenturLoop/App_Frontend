import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Image,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import imagePath from "../../constants/imagePath";
import { Ionicons } from "@expo/vector-icons";

const InviteReferalModel = ({
  isModalVisible,
  handleModalVisibility,
  nextPageRoute,
}) => {
  // const [isLoadi, setisLoadi] = useState(second)
  const [referal, setReferal] = useState(""); // Store referral code input
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
          className="bg-white rounded-t-3xl gap-6 px-6 py-8 items-center"
        >
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
              // onPress={handleContinue} // Call handleContinue function
              className={`flex-1 w-2/3 rounded-lg py-3  bg-[#2983DC]
              `} // Disable button if no referral code
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
