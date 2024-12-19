import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import OTPInput from "@codsod/react-native-otp-input";
import CustomeButton from "../buttons/CustomeButton";
import imagePath from "../../constants/imagePath";
import { Toast } from "react-native-toast-notifications";

const Otp = () => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(20); // Initial timer value

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
        Toast.show("OTP verified successfully!", { type: "success" });
        router.push("/createPass"); // Navigate to the create password page
      } else {
        Toast.show("Invalid OTP. Please try again.", {
          type: "error",
        });
      }
    } catch (error) {
      setIsLoading(false); // Hide loader
      Toast.show("Something went wrong. Please try again later.", {
        type: "error",
      });
    }
  };

  const dumiVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/createPass");
      Toast.show("OTP verified successfully!", { type: "success" });
    }, 2000);
  };

  const handleResentOtp = () => {
    Toast.show("OTP has been resent to your email.", { type: "success" });
    setTimer(20); // Reset the timer
  };

  return (
    <SafeAreaView className="py-6 px-4 bg-white h-screen pt-10 flex justify-between gap-5 flex-col">
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
      <View className="footer w-full  flex">
        <CustomeButton
          title={isLoading ? <ActivityIndicator color="white" /> : "Verify"}
          style="mb-1"
          onButtonPress={dumiVerify}
        />

        <View className="flex-row justify-center items-center gap-2 mt-4">
          <Text className="text-center">Didn’t get OTP? </Text>
          {timer > 0 ? (
            <Text className="font-semibold text-center text-lg text-gray-500">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResentOtp}>
              <Text className="font-semibold text-center text-lg text-[#2983DC]">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
