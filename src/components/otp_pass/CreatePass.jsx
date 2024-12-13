import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import TextBox from "react-native-password-eye";
import imagePath from "../../constants/imagePath";
import CustomeButton from "../buttons/CustomeButton";

const CreatePass = ({ buttonTittle, route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          className=""
        >
          <View className="px-8">
            <View className="header flex flex-col items-center gap-4 mt-6">
              <Image className="w-auto" source={imagePath.password} />
              <Text className="text-black text-center mt-4 font-bold text-3xl">
                Create new password
              </Text>
              <Text className="text-center text-[#61677D]">
                Set a strong password to secure your account and start building
                connections!
              </Text>
            </View>
            <View className="flex justify-start mt-10 gap-4 items-center">
              <TextBox
                className="bg-[#2982dc14] w-full placeholder:font-medium px-6 rounded-lg text-gray-500 p-2"
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={true}
                placeholder="New Password"
              />
              <TextBox
                className="bg-[#2982dc14] w-full placeholder:font-medium px-6 rounded-lg text-gray-500 p-2"
                onChangeText={(text) => setRepeatPassword(text)}
                secureTextEntry={true}
                placeholder="Repeat Password"
              />
            </View>
          </View>
        </ScrollView>
        <View className="footer px-8 mb-10">
          <CustomeButton
            title={buttonTittle}
            style="my-4"
            onButtonPress={() => {
              router.navigate(route);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePass;
