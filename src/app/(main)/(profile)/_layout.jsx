import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
      <Stack.Screen name="edit_preferance" options={{ headerShown: false }} />
      <Stack.Screen name="referal_rewards" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
