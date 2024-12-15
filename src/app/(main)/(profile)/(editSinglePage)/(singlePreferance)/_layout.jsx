import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SinglePreferancePageLayout = () => {
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
      <Stack.Screen name="editIntrest" />
      <Stack.Screen name="distance" />
      <Stack.Screen name="commitment_level" />
      <Stack.Screen name="skillset" />
      <Stack.Screen name="age_range" />
      <Stack.Screen name="p_equity_expectation" />
      <Stack.Screen name="p_experience" />
    </Stack>
  );
};

export default SinglePreferancePageLayout;
