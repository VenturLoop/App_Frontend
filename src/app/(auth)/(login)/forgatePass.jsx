import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import {  useToast } from "react-native-toast-notifications";

const forgatePass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSendOtp = async () => {
    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      toast.show("OTP sent successfully", { type: "success" });
      router.navigate("/forgateOtp");
    }, 2000);
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
          className="bg-[#2982dc23] w-full  px-6 py-5 placeholder:opacity-70 rounded-lg text-lg tracking-widest text-gray-600 p-2"
          // placeholderTextColor="#61677D"
          keyboardType="numeric"
        />
      </View>
      <View className="footer mb-3 flex ">
        <CustomeButton
          title="Continue"
          style="my-6"
          onButtonPress={handleForfateEmail}
        />
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="w-full "
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
