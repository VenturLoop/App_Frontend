import { Redirect, Stack } from "expo-router";
import { useState } from "react";

export default function SignInLayout() {
  const [isLinkedIn, setisLinkedIn] = useState(false);

  if (isLinkedIn) {
    return <Redirect href="/(profile_data)" />;
  }

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
      <Stack.Screen name="add_basic_details" />
      <Stack.Screen name="createPass" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
