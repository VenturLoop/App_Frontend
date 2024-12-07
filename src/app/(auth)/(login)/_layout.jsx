import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgatePass" />
      <Stack.Screen name="forgateOtp" />
      <Stack.Screen name="forgateCreatePass" />
    </Stack>
  );
};

export default LoginLayout;
