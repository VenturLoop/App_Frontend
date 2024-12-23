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
import { referalCodeCheck } from "../../api/profile";
import { setLogin } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

const ReferalPriceModel = ({ isModalVisible, handleModalVisibility }) => {
  // const [isLoadi, setisLoadi] = useState(second)
  const [referal, setReferal] = useState(""); // Store referral code input
  const [isLoading1, setisLoading1] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const translateY = React.useRef(new Animated.Value(300)).current; // Initial offset (off-screen)
  const dispatch = useDispatch();
  const { signupToken } = useSelector((state) => state.user);

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

  // TODO Add validation for referal code that help user to put right referal

  const handleDontHaveReferal = async () => {
    setisLoading1(true);
    setTimeout(async () => {
      handleModalVisibility();
      router.navigate("/(main)/(tabs)");

      // Make chenges logic for current
      dispatch(setLogin({ isLogin: true, loginToken: signupToken }));
      // Navigate to the home page or dashboard
      await SecureStore.setItemAsync("userToken", signupToken);
      Toast.show("Account Created Successfully", { type: "success" });
    }, 2000);
  };

  const handleContinueReferal = async () => {
    setisLoading2(true);
    try {
      const result = await referalCodeCheck(referal);
      console.log(result);

      if (result.success) {
        Toast.show("Account Created Successfully", { type: "success" });
        handleModalVisibility();
        // Make chenges logic for current
        dispatch(setLogin({ isLogin: true, loginToken: signupToken }));
        // Navigate to the home page or dashboard
        await SecureStore.setItemAsync("userToken", signupToken);
        handleNavigation("/(main)/(tabs)");
      } else {
        Toast.show(result.message, { type: "error" });
      }
    } catch (error) {
      Toast.show("Something went wrong. Please try again.", {
        type: "error",
      });
    } finally {
      setisLoading2(false);
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
