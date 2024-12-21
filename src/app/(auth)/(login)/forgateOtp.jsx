import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { OtpInput } from "react-native-otp-entry";

const ForgateOtp = () => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);

      if (response.ok) {
        Toast.show("OTP verified successfully!", { type: "success" });
        router.push("/forgateCreatePass");
      } else {
        Toast.show("Invalid OTP. Please try again.", { type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again later.", {
        type: "error",
      });
    }
  };

  const handleResentOtp = () => {
    Toast.show("OTP has been resent to your email.", { type: "success" });
    setTimer(20);
  };

  return (
    <SafeAreaView className="flex-1 gap-16 justify-between bg-white p-8">
      {/* Header Section */}
      <View className="flex items-center mb-10">
        <Image source={imagePath.otpImage} className="w-16 mb-4" />
        <Text className="text-black text-center font-bold text-3xl mb-2">
          Enter OTP
        </Text>
        <Text className="text-[#61677D] text-center">
          Enter the OTP sent to your Email for secure verification!
        </Text>
      </View>

      {/* OTP Input Section */}
      <View className="flex-1 ">
        <View className="flex justify-center mb-12 px-10">
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setOTP(text)} // Store OTP
            theme={{
              containerStyle: {
                justifyContent: "center",
                alignItems: "center",
              },
              pinCodeContainerStyle: {
                borderColor: "#2983DC",
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#EAF3FC",
                // width: 50,
                // height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              },
              pinCodeTextStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#000",
              },
              focusedPinCodeContainerStyle: {
                borderColor: "#2983DC",
                borderWidth: 2,
                backgroundColor: "#fff",
              },
              // filledPinCodeContainerStyle: {
              //   backgroundColor: "#2983DC",
              // },
              placeholderTextStyle: {
                fontSize: 20,
              },
            }}
          />
        </View>
      </View>

      {/* Footer Section */}
      <View className="flex items-center">
        {isLoading ? (
          <ActivityIndicator size="large" color="#2983DC" />
        ) : (
          <CustomeButton
            title="Verify"
            style="mb-3"
            onButtonPress={verifyOtp}
          />
        )}
        <View className="flex-row items-center gap-2">
          <Text className="text-center">Didn’t get OTP? </Text>
          {timer > 0 ? (
            <Text className="text-gray-500 text-lg">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResentOtp}>
              <Text className="font-semibold text-lg text-[#2983DC]">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgateOtp;
