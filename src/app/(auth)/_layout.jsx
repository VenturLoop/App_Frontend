import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(signIn)" />
      <Stack.Screen name="(login)" />
    </Stack>
  );
};

export default AuthLayout;
