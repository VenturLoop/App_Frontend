import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import PageLoading from "../loading/PageLoading"; // Ensure the PageLoading component is imported
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

const ReferalModel = ({
  isModalVisible,
  handleModalVisibility,
  // routerToNextPage,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [referal, setReferal] = useState(""); // Store referral code input

  // Function to handle the "Continue" button press
  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleNavigation("/(tabs)"); // Navigate to the next page
    }, 3000); // Shortened the delay for smooth navigation
  };

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

  const handleNotReferal = () => {
    setIsLoading(true);
    Toast.show("Account Created Successfully", { type: "success" });
    handleNavigation("/(tabs)"); // Navigate to the next page
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
        {isLoading ? (
          <View className="bg-white rounded-t-3xl h-40 justify-center px-6 py-8 items-center">
            <PageLoading noLogo={true} smallLoading={true} />
          </View>
        ) : (
          <Animated.View
            style={{ transform: [{ translateY }] }}
            className="bg-white rounded-t-2xl gap-6 px-6 py-8 items-center"
          >
            {/* Title */}
            <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
              Do you have a referral code?
            </Text>

            {/* Referral Input */}
            <View className="bg-[#2982dc11] w-full px-6 py-5 rounded-2xl flex-row items-center justify-between">
              <TextInput
                placeholder="Referral Code"
                value={referal} // Set the value of the input field to referal state
                onChangeText={(text) => setReferal(text)} // Update the referal state on change
                className="tracking-widest  text-lg text-gray-600  "
              />
              <View>
                {isLoading && <ActivityIndicator size={20} color="#2983DC" />}
              </View>
            </View>

            {/* Button Group */}
            <View className="flex-row justify-between gap-3 w-full mt-6 space-x-4">
              {/* "Don't Have" Button */}
              <TouchableOpacity
                onPress={handleNotReferal}
                className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
              >
                <Text className="text-center text-lg text-gray-700 font-medium">
                  Don't have
                </Text>
              </TouchableOpacity>

              {/* Continue Button */}
              <TouchableOpacity
                onPress={handleContinue} // Call handleContinue function
                className={`flex-1 w-2/3 rounded-lg py-3 ${
                  referal === "" ? "bg-blue-300  " : "bg-[#2983DC]"
                }`} // Disable button if no referral code
                disabled={referal === ""} // Disable the button if referral is empty
              >
                <Text className="text-center text-lg text-white font-medium">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Pressable>
    </Modal>
  );
};

export default ReferalModel;
