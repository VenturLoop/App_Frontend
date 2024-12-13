import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const MessageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="request" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MessageLayout;
