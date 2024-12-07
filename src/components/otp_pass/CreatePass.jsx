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
import OTPInput from "@codsod/react-native-otp-input";
import TextBox from "react-native-password-eye";
import imagePath from "../../constants/imagePath";
import CustomeButton from "../buttons/CustomeButton";
const CreatePass = ({ buttonTittle, route }) => {
  const [otp, setOTP] = useState("");
  return (
    <SafeAreaView className="py-6 px-8 bg-white h-screen pt-10 flex justify-between gap-5 flex-col ">
      <View className="header flex flex-col my-6 items-center justify-center gap-4 ">
        <Image className="w-auto" source={imagePath.password} />
        <Text className="text-black text-center mt-4  font-bold text-3xl">
          Create new password
        </Text>
        <Text className="text-center text- text-[#61677D]">
          Set a strong password to secure your account and start building
          connections!
        </Text>
      </View>
      <View className="flex justify-start mb-10  h-64 gap-4 items-center">
        <TextBox
          className="bg-[#2982dc14]  w-full placeholder:font-medium px-6   rounded-lg text-gray-500 p-2"
          onChangeText={(text) => console.log("onChangeText: ", text)}
          secureTextEntry={true}
          placeholder="New Password"
        />
        <TextBox
          className="bg-[#2982dc14]  w-full placeholder:font-medium px-6   rounded-lg text-gray-500 p-2"
          onChangeText={(text) => console.log("onChangeText: ", text)}
          secureTextEntry={true}
          placeholder="Repeat Password"
        />
      </View>
      <View className="footer flex ">
        <CustomeButton
          title={buttonTittle}
          onButtonPress={() => {
            router.navigate(route);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePass;
