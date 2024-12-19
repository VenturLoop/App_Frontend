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
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
// import imagePath from "../../constants/imagePath";
// import CustomeButton from "../buttons/CustomeButton";
import { Ionicons } from "@expo/vector-icons"; // For password visibility toggle icon
import { Toast, useToast } from "react-native-toast-notifications";
import CustomeButton from "../../../components/buttons/CustomeButton";
import imagePath from "../../../constants/imagePath";

const CreatePass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Retrieve name and email from Redux
  const { name, email } = useSelector((state) => state.user);
  const toast = useToast();

  const validatePasswords = () => {
    let isValid = true;

    if (newPassword.length < 6) {
      toast.show("Password must be at least 6 characters long.", {
        type: "danger",
      });
      isValid = false;
    }

    if (newPassword !== repeatPassword) {
      toast.show("Passwords do not match.", {
        type: "danger",
      });
      isValid = false;
    }

    return isValid;
  };
  const handleCreatePassword = async () => {
    if (!validatePasswords()) return;

    setLoading(true);

    // Trim values to remove leading/trailing spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = newPassword.trim();

    console.log("Name: " + trimmedName, "Type:", typeof trimmedName);
    console.log("Email: " + trimmedEmail, "Type:", typeof trimmedEmail);
    console.log(
      "Password: " + trimmedPassword,
      "Type:",
      typeof trimmedPassword
    );

    try {
      const response = await fetch(
        "https://verturloop-server-v01.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        router.push("/login"); // Navigate to the OTP page
      } else {
        Toast.show("Failed to create password.", {
          type: "error",
        });
      }
    } catch (error) {
      toast.show("Something went wrong. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const dummyPass = () => {
    if (!validatePasswords()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
      Toast.show("Password reset successfully!", { type: "success" });
    }, 2000);
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
                <View className="flex items-center  justify-between ">
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
                <View className="flex items-center justify-between ">
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
            onButtonPress={() => {
              // handleCreatePassword();
              dummyPass();
              // router.push("/add_basic_details");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePass;
