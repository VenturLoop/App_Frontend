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
import { ResentOPT, SentOPT } from "../../../api/profile";
import { useSelector } from "react-redux";

const ForgateOtp = () => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(20);

  const { forgateMail } = useSelector((state) => state.user);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Toast.show("Please enter a valid 6-digit OTP.", { type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const result = await SentOPT(forgateMail, otp);
      console.log(result);

      if (result.success) {
        Toast.show(result.message, { type: "success" });
        router.push("/forgateCreatePass"); // Navigate to the next page
      } else {
        Toast.show("Invalid OTP. Please try again.", {
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
      const res = await ResentOPT(forgateMail);

      console.log(res);

      if (res.success) {
        Toast.show("OTP has been resent to your email.", { type: "success" });
        setTimer(20); // Reset the timer
      } else {
        Toast.show(res.message || "Failed to resend OTP.", {
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
        <CustomeButton
          title={
            isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Verify"
            )
          }
          style="mb-3"
          onButtonPress={verifyOtp}
        />

        <View className="flex-row items-center gap-2">
          <Text className="text-center">Didn’t get OTP? </Text>
          {timer > 0 ? (
            <Text className="text-gray-500 text-lg">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
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
