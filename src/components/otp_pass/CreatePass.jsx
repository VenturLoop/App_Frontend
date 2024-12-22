import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import imagePath from "../../constants/imagePath";
import CustomeButton from "../buttons/CustomeButton";
import { Ionicons } from "@expo/vector-icons"; // For password visibility toggle icon
import { Toast } from "react-native-toast-notifications";

const CreatePass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [apiInProgress, setApiInProgress] = useState(false); // Flag for API progress

  const dispatch = useDispatch();

  // Disable back button functionality
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Toast.show("Back button is disable.", {
          type: "warning",
        });
        return true; // Prevent default back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.push(route);
    }, 100); // Add a small delay of 100ms
  };

  const validatePasswords = () => {
    let isValid = true;

    if (newPassword.length < 6) {
      Toast.show("Password must be at least 6 characters long.", {
        type: "danger",
      });
      isValid = false;
    }

    if (newPassword !== repeatPassword) {
      Toast.show("Passwords do not match.", {
        type: "danger",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleCreatePassword = async () => {
    if (apiInProgress) {
      Toast.show("Please wait for the current operation to complete.", {
        type: "warning",
      });
      return;
    }

    if (!validatePasswords()) return;

    setLoading(true);
    setApiInProgress(true); // Block further API calls

    try {
      // Simulate API delay or operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (newPassword !== "") {
        // Optimistically update the UI before dispatch
        // Toast.show("Password created successfully!", { type: "success" });

        // Dispatch action without interfering with UI animations
        setTimeout(() => {
          dispatch(updateUser({ field: "password", value: newPassword }));
          handleNavigation("/add_basic_details");
        }, 100); // Minimal delay to ensure smooth transition
      } else {
        Toast.show("Failed to create password.", {
          type: "error",
        });
      }
    } catch (error) {
      Toast.show("An error occurred. Please try again later.", {
        type: "error",
      });
    } finally {
      setLoading(false);
      setApiInProgress(false); // Allow further API calls
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Header Section */}
          <View className="px-8">
            <View className="header flex flex-col items-center gap-4 mt-6">
              <Image className="w-auto" source={imagePath.password} />
              <Text className="text-black text-center mt-4 font-bold text-3xl">
                Create new password
              </Text>
              <Text className="text-center text-[#61677D]">
                Set a strong password to secure your account and start building
                connections!
              </Text>
            </View>

            {/* Input Fields */}
            <View className="flex justify-start mt-10 gap-6">
              {/* New Password Input */}
              <View>
                <View className="flex items-center justify-between">
                  <TextInput
                    className="bg-[#2982dc14] text-lg w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry={!showNewPassword}
                    placeholder="New Password"
                    value={newPassword}
                  />
                  <TouchableOpacity
                    className="absolute right-4 py-1 px-3 top-4"
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <Ionicons
                      name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                      size={23}
                      color="#2983DC"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Repeat Password Input */}
              <View>
                <View className="flex items-center justify-between">
                  <TextInput
                    className="bg-[#2982dc14] text-lg w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
                    onChangeText={(text) => setRepeatPassword(text)}
                    secureTextEntry={!showRepeatPassword}
                    placeholder="Repeat Password"
                    value={repeatPassword}
                  />
                  <TouchableOpacity
                    className="absolute right-4 py-1 px-3 top-4"
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    <Ionicons
                      name={
                        showRepeatPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={23}
                      color="#2983DC"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View className="footer px-4 mb-4">
          <CustomeButton
            title={loading ? <ActivityIndicator color="white" /> : "Continue"}
            style="my-4"
            onButtonPress={handleCreatePassword}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePass;
