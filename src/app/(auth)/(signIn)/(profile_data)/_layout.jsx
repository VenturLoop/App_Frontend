import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // Default animation for forward navigation
        gestureDirection: "horizontal", // Ensures back gesture slides to the left
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 100, // Adjust duration for smooth forward navigation
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 100, // Adjust duration for smooth back navigation
            },
          },
        },
        animationTypeForReplace: "push", // Ensure smooth transitions for screen replacements
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
