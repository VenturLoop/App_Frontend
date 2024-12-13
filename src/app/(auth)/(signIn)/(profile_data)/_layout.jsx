import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none", // Default to no animation
        // gestureDirection: "horizontal", // Ensures back gesture slides horizontally
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 300, // Forward navigation duration (sliding to the right)
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 300, // No animation for back navigation
            },
          },
        },
        animationTypeForReplace: "push", // For screen replacements
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
