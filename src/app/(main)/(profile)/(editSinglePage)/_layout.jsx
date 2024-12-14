import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const EditSinglePageLayout = () => {
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
      <Stack.Screen name="editSkillset" />
      <Stack.Screen name="editStatus" />
    </Stack>
  );
};

export default EditSinglePageLayout;
