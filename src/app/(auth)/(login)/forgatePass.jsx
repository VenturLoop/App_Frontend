import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { Toast, useToast } from "react-native-toast-notifications";
import { ForgotPassword } from "../../../api/profile";
import { updateUser } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const forgatePass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.push(route);
    }, 100); // Add a small delay of 100ms
  };

  const handleForfateEmail = async () => {
    if (!email) {
      Toast.show("Please enter your email address.", { type: "error" });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show("Please enter a valid email address.", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      const result = await ForgotPassword(email);
      console.log(result);

      if (result.success) {
        dispatch(updateUser({ field: "forgateMail", value: email }));
        handleNavigation("/forgateOtp");
        Toast.show(result.message, { type: "success" });
      } else {
        Toast.show(result.message, { type: "error" });
      }
    } catch (error) {
      Toast.show("Something went wrong. Please try again.", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="py-6 px-8 bg-white h-screen pt-10 flex justify-between gap-5 flex-col ">
      <View className="header flex flex-col my-6 items-center justify-center gap-4 ">
        <Image className="w-auto" source={imagePath.forgatePass} />
        <Text className="text-black text-center mt-4  font-bold text-3xl">
          Forget Password
        </Text>
        <Text className="text-center text- text-[#61677D]">
          Forgot your password? No worries! Simply add your connected Email to
          reset your account quickly and securely.
        </Text>
      </View>
      <View className="flex justify-start mb-20  h-64 items-center">
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          className="bg-[#2982dc23] w-full px-6 py-5 placeholder:opacity-70 rounded-lg text-lg tracking-widest text-gray-600 p-2"
          keyboardType="email-address"
        />
      </View>
      <View className="footer mb-3 flex">
        <CustomeButton
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
          style="my-6"
          onButtonPress={handleForfateEmail}
        />
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="w-full"
        >
          <Text className="text-center text-xl text-gray-500 font-medium ">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default forgatePass;
