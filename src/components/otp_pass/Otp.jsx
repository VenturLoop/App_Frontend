import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import OTPInput from "@codsod/react-native-otp-input";
import CustomeButton from "../buttons/CustomeButton";
import imagePath from "../../constants/imagePath";

const Otp = () => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    setIsLoading(true); // Show loader
    try {
      const response = await fetch(
        "https://verturloop-server-v01.onrender.com/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      const result = await response.json();
      setIsLoading(false); // Hide loader

      if (response.ok) {
        Alert.alert("Success", "OTP verified successfully!");
        router.push("/add_basic_detail");
      } else {
        Alert.alert(
          "Error",
          result.message || "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      setIsLoading(false); // Hide loader
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <SafeAreaView className="py-6 px-8 bg-white h-screen pt-10 flex justify-between gap-5 flex-col">
      {/* Header Section */}
      <View className="header flex flex-col my-6 items-center justify-center gap-4">
        <Image className="w-16" source={imagePath.otpImage} />
        <Text className="text-black text-center mt-4 font-bold text-3xl">
          Enter OTP
        </Text>
        <Text className="text-center text-[#61677D]">
          Enter the OTP sent to your Email for secure verification!
        </Text>
      </View>

      {/* OTP Input Section */}
      <View className="flex justify-start mb-10 px-10 h-64 items-center">
        <OTPInput
          style={{ gap: 1 }}
          inputStyle={{
            borderColor: "#2983DC",
            borderRadius: 10,
            backgroundColor: "#EAF3FC",
            opacity: 20,
          }}
          length={6}
          onOtpComplete={(txt) => setOTP(txt)}
        />
      </View>

      {/* Footer Section */}
      <View className="footer flex">
        {isLoading ? (
          <ActivityIndicator size="large" color="#2983DC" />
        ) : (
          <CustomeButton title="Verify" onButtonPress={verifyOtp} />
        )}
        <View>
          <Text className="text-center">
            Didn’t get OTP?{" "}
            <Link className="font-semibold text-lg text-[#2983DC]" href={"/"}>
              Resend OTP
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
