import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "../../../../constants/imagePath";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Toast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { setSignup } from "../../../../redux/slices/userSlice";
import { setUserId } from "../../../../redux/slices/profileSlice";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const { signupToken, isSignup } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = useSelector((state) => state.profile);

  // Utility function to handle logout
  const handleLogout = async () => {
    setLoading(true); // Set loading to true when starting the logout process
    try {
      // Remove the user token from secure storage
      await SecureStore.deleteItemAsync("userSignupToken");

      // Dispatch action to update the Redux state
      dispatch(setSignup({ isSignup: false, signupToken: "" }));
      // Show a Toast message to inform the user

      Toast.show("You have successfully logged out. Change Account", {
        type: "error",
      });

      // Redirect to the sign-in page
      router.push("/(auth)"); // Use router.push to navigate
    } catch (error) {
      console.error("Error during logout:", error);
      Toast.show("Failed to log out. Please try again.", {
        type: "error",
      });
    } finally {
      setLoading(false); // Set loading back to false after the logout process is completed
    }
  };
  console.log(userId);

  // useEffect(async () => {
  //   if (userId === "") {
  //     const signupToken = await SecureStore.getItemAsync("userId");
  //     dispatch(setUserId(signupToken));
  //   }
  // }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <ImageBackground
        className="flex-1 h-screen px-4 justify-between items-center"
        source={imagePath.splashScreen5}
        resizeMode="cover"
      >
        {/* Change Account Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="absolute top-6 right-4 px-4 py-2 hover:bg-[#2983DC] border-[1px] border-white rounded-xl shadow-lg flex-row items-center"
          style={{ elevation: 5 }} // Additional shadow for Android
        >
          <View className=" flex-row gap-1">
            <Ionicons size={20} name="person-circle-outline" color="white" />
            <Text className="text-white text-base font-semibold">
              Change Account
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-1/2 pt-40 flex items-center justify-center my-20">
          <Text className="text-white text-start tracking-wider  text-5xl font-bold">
            Add what you are looking for, your{" "}
            <Text className="text-[#2983DC]">skillset interests</Text>,{" "}
            <Text className="text-[#2983DC]">commitments</Text>, and prior{" "}
            <Text className="text-[#2983DC]">experience</Text> for better
            recommendations
          </Text>
        </View>

        <CustomeButton
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
          onButtonPress={() => {
            router.push("/what_your_status"); // Use router.push for navigation to next page
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Index;
