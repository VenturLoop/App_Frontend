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
import React, { useState, useEffect } from "react";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";
import { Toast } from "react-native-toast-notifications";
import { signInwithEmail } from "../../../api/profile";

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

  console.log(formData);

  const validateForm = () => {
    const { name, email } = formData;

    if (!name || !email) {
      Toast.show("Please fill in all fields.", { type: "error" });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show("Please enter a valid email address.", { type: "error" });
      return false;
    }

    if (!isChecked) {
      Toast.show("You must agree to the Terms of Service and Privacy Policy.", {
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (validateForm()) {
      setLoading(true); // Start the loading state
      try {
        const res = await signInwithEmail(formData);

        if (res.success) {
          handleNavigation("/(signIn)/otp");
          dispatch(updateUser({ field: "name", value: formData.name }));
          dispatch(updateUser({ field: "email", value: formData.email }));
          Toast.show(res.message, { type: "success" });
        } else {
          Toast.show(res.message, {
            type: "error",
          });
        }
      } catch (error) {
        Toast.show("Something went wrong. Please try again.", {
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // console.log(userInfo?.name);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          // extraScrollHeight={100}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 50,
          }}
          className="px-8 flex-1 py-6"
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
              // onPress={() => promptAsync()}
              className="border border-[#2983DC] rounded-xl w-full justify-center py-4 px-6 flex-row items-center"
            >
              <Image
                className="w-6 h-6 mr-3"
                resizeMode="contain"
                source={imagePath.google}
              />
              <Text className="text-[#61677D] font-medium text-lg">Google</Text>
            </TouchableOpacity>
            {/* <Auth /> */}
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
            {/* {errorMessage ? (
              <Text className="text-red-500 text-sm">{errorMessage}</Text>
            ) : null} */}
            <View className="flex flex-row gap-3 px-2 mt-4 justify-center">
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#2983DC" : undefined}
              />
              <Text>
                I agree to the{" "}
                <Link
                  className="font-semibold text-[#2983DC]"
                  href={
                    "https://venturloop.com/venturloopcom-terms-and-conditions-"
                  }
                >
                  Terms of Service{" "}
                </Link>
                and{" "}
                <Link
                  className="font-semibold text-[#2983DC]"
                  href={"https://venturloop.com/privacy-policy"}
                >
                  Privacy Policy{" "}
                </Link>
              </Text>
            </View>
          </View>

          {/* Footer Section */}
          <View className="footer mt-4">
            <CustomeButton
              title={loading ? <ActivityIndicator color="white" /> : "Continue"}
              style="my-3"
              onButtonPress={handleContinue}
            />

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
