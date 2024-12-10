import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomeButton from "../buttons/CustomeButton";

const EditLayout = ({
  title,
  secondTitle,
  children,
  buttonRoute,
  buttonTitle,
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white ">
        {/* Header */}
        <View className="header flex-row px-5  justify-between border-b border-gray-300 py-4 w-full items-center">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">{title}</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-xl font-semibold text-[#2983DC]">
              {secondTitle}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View className="body w-full  py-3 flex-1 px-3 ">{children}</View>

        {buttonRoute && (
          <View className="footer px-5 w-full">
            <CustomeButton
              onButtonPress={() => {
                router.navigate(buttonRoute);
              }}
              title={buttonTitle}
            />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default EditLayout;
