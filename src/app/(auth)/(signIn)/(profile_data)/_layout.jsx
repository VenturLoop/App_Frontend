import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade", // Use a simple fade animation for transitions
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 50, // Fast animation for opening
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 50, // Fast animation for closing
            },
          },
        },
        animationTypeForReplace: "pop", // Quick replace animation
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="commitment" />
      <Stack.Screen name="equity_exceptation" />
      <Stack.Screen name="prior_experience" />
      <Stack.Screen name="skillset" />
      <Stack.Screen name="what_your_status" />
      <Stack.Screen name="your_intrest" />
    </Stack>
  );
};

export default ProfileDetailLayout;
