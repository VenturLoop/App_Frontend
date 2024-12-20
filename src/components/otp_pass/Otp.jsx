import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OTPInput from "@codsod/react-native-otp-input";
import CustomeButton from "../buttons/CustomeButton";
import imagePath from "../../constants/imagePath";
import { Toast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";

const Otp = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(20); // Initial timer value
  const { email } = useSelector((state) => state.user);
  const router = useRouter();

  // Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [timer]);

  // Verify OTP
  const verifyOtp = async () => {
    if (verificationCode.length !== 6) {
      Toast.show("Please enter a valid 6-digit OTP.", { type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backend-v2-osaw.onrender.com/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode }),
        }
      );
      console.log(verificationCode);
      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        Toast.show(result.message, { type: "success" });
        router.push("/createPass"); // Navigate to the next page
      } else {
        Toast.show(result.message || "Invalid OTP. Please try again.", {
          type: "error",
        });
      }
    } catch (error) {
      Toast.show("Failed to verify OTP. Please try again later.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backend-v2-osaw.onrender.com/auth/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok && result.success) {
        Toast.show("OTP has been resent to your email.", { type: "success" });
        setTimer(20); // Reset the timer
      } else {
        Toast.show(result.message || "Failed to resend OTP.", {
          type: "error",
        });
      }
    } catch (error) {
      Toast.show("Failed to resend OTP. Please try again later.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
          Enter the OTP sent to your email for secure verification!
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
          }}
          length={6}
          onOtpComplete={setVerificationCode}
        />
      </View>

      {/* Footer Section */}
      <View className="footer w-full flex">
        <CustomeButton
          title={isLoading ? <ActivityIndicator color="white" /> : "Verify"}
          style="mb-1"
          onButtonPress={!isLoading ? verifyOtp : null}
          disabled={isLoading}
        />

        <View className="flex-row justify-center items-center gap-2 mt-4">
          <Text className="text-center">Didn’t get OTP? </Text>
          {timer > 0 ? (
            <Text className="font-semibold text-center text-lg text-gray-500">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={!isLoading ? handleResendOtp : null}>
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
