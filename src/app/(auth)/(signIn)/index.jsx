import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, // Importing the loader
} from "react-native";
import React, { useState } from "react";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

const Index = () => {
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // State for loading
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Get the user data from the Redux store
  const [errorMessage, setErrorMessage] = useState("");

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.push(route);
    }, 100); // Add a small delay of 100ms
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const validateForm = () => {
    const { name, email } = formData;

    if (!name || !email) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!isChecked) {
      setErrorMessage(
        "You must agree to the Terms of Service and Privacy Policy."
      );
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (validateForm()) {
      setLoading(true); // Start the loading state

      try {
        // Wait for the Redux dispatch to complete
        await dispatch(updateUser({ field: "name", value: formData.name }));
        await dispatch(updateUser({ field: "email", value: formData.email }));

        // After dispatch completes, navigate
        handleNavigation("/createPass");
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // Stop the loading state
      }
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
          className="px-8 py-6"
        >
          {/* Header Section */}
          <View className="header flex flex-col items-center justify-center gap-4 mt-6">
            <Image className="w-16 h-16" source={imagePath.vector} />
            <Text className="text-black text-center mt-4 font-bold text-3xl">
              Create Account
            </Text>
            <Text className="text-center text-[#61677D]">
              Create Your Account – Sign Up with Google or Email for Quick
              Access!
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex flex-col gap-4">
            <TouchableOpacity
              onPress={() => handleNavigation("/(profile_data)")}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.google}
              />
              <Text className="text-[#61677D] font-medium text-lg">Google</Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-lg font-semibold text-gray-400">
                Or
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
            <TextInput
              placeholder="Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              className="bg-[#2982dc14] w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
            />
            <TextInput
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              className="bg-[#2982dc14] w-full placeholder:font-medium px-6 py-5 rounded-lg text-gray-500"
              keyboardType="email-address"
            />
            {errorMessage ? (
              <Text className="text-red-500 text-sm">{errorMessage}</Text>
            ) : null}
            <View className="flex flex-row gap-3 px-2 mt-4 justify-center">
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#2983DC" : undefined}
              />
              <Text>
                I agree to the{" "}
                <Link className="font-semibold text-[#2983DC]" href={"/"}>
                  Terms of Service{" "}
                </Link>
                and{" "}
                <Link className="font-semibold text-[#2983DC]" href={"/"}>
                  Privacy Policy{" "}
                </Link>
              </Text>
            </View>
          </View>

          {/* Footer Section */}
          <View className="footer mt-4">
            {loading ? (
              <ActivityIndicator size="large" color="#2983DC" /> // Loader shown while saving data
            ) : (
              <CustomeButton
                title="Continue"
                style="my-3"
                onButtonPress={handleContinue}
              />
            )}
            <View className="mt-4">
              <Text className="text-center">
                Do you have an account?{" "}
                <Link
                  className="font-semibold text-lg text-[#2983DC]"
                  href={"/login"}
                >
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;
