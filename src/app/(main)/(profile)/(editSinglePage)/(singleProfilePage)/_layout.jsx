import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SingleProfilePagePageLayout = () => {
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
      <Stack.Screen name="user_commitment" />
      <Stack.Screen name="user_expe" />
      <Stack.Screen name="user_expectation" />
      <Stack.Screen name="user_intrest" />
      <Stack.Screen name="user_skillset" />
    </Stack>
  );
};

export default SingleProfilePagePageLayout;
