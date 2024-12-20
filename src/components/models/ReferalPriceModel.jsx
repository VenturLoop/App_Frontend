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
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import imagePath from "../../constants/imagePath";
import { Toast } from "react-native-toast-notifications";

const ReferalPriceModel = ({ isModalVisible, handleModalVisibility }) => {
  // const [isLoadi, setisLoadi] = useState(second)
  const [referal, setReferal] = useState(""); // Store referral code input
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
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

  const handleDontHaveReferal = () => {
    setisLoading1(true);
    setTimeout(() => {
      handleModalVisibility();
      router.navigate("/(main)/(tabs)");
      Toast.show("Account Created Successfully", { type: "success" });
    }, 3000);
  };

  const handleContinueReferal = () => {
    setisLoading2(true);
    setTimeout(() => {
      handleModalVisibility();
      router.navigate("/(main)/(tabs)");
      Toast.show("Account Created Successfully", { type: "success" });
    }, 3000);
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
          <Text className="text-2xl font-bold text-gray-800 text-center my-4">
            Do you have a referral code?
          </Text>

          <TextInput
            placeholder="Referral Code"
            value={referal} // Set the value of the input field to referal state
            onChangeText={(text) => setReferal(text)} // Update the referal state on change
            className="bg-[#2982dc11] w-full tracking-widest px-6 py-5 text-lg text-gray-600  rounded-2xl"
          />

          {/* Referral Input */}
          {/* Button Group */}
          <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
            {/* "Don't Have" Button */}
            <TouchableOpacity
              onPress={handleDontHaveReferal}
              className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
            >
              {isLoading1 ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text className="text-center text-lg  text-black font-medium">
                  Don't have
                </Text>
              )}
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinueReferal} // Call handleContinue function
              className={`flex-1 w-2/3 items-center  rounded-lg py-3 ${
                referal === "" ? "bg-blue-300  " : "bg-[#2983DC]"
              }`} // Disable button if no referral code
              disabled={referal === ""} // Disable the button if referral is empty
            >
              {isLoading2 ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-center text-lg text-white font-medium">
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ReferalPriceModel;
