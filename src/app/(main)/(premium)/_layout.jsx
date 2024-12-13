import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PremiumLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="subscription_page" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PremiumLayout;
