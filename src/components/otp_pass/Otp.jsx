import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
// import imagePath from "../../../constants/imagePath";
// import CustomeButton from "../../../components/buttons/CustomeButton";
import { Link, router } from "expo-router";
import OTPInput from "@codsod/react-native-otp-input";
import CustomeButton from "../buttons/CustomeButton";
import imagePath from "../../constants/imagePath";

const Otp = ({ buttonRoute, resentRoute }) => {
  const [otp, setOTP] = useState("");
  return (
    <SafeAreaView className="py-6 px-8 bg-white h-screen pt-10 flex justify-between gap-5 flex-col ">
      <View className="header flex flex-col my-6 items-center justify-center gap-4 ">
        <Image className="w-16" source={imagePath.otpImage} />
        <Text className="text-black text-center mt-4  font-bold text-3xl">
          Enter OTP
        </Text>
        <Text className="text-center text- text-[#61677D]">
          Enter the OTP sent to your mobile for secure verification!
        </Text>
      </View>
      <View className="flex justify-start mb-10 px-10 h-64  items-center">
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
      <View className="footer flex ">
        <CustomeButton
          title="Verify"
          onButtonPress={() => {
            router.navigate(buttonRoute);
          }}
        />
        <View className=" ">
          <Text className="text-center">
            Didn’t get OTP?{" "}
            <Link
              className="font-semibold text-lg text-[#2983DC]"
              // todo : add resent url
              href={"/"}
            >
              Resend OTP
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
