import { Redirect, Stack } from "expo-router";
import { useState } from "react";

export default function SignInLayout() {
  const [isLinkedIn, setisLinkedIn] = useState(false);

  if (isLinkedIn) {
    return <Redirect href="/(profile_data)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add_basic_details" />
      <Stack.Screen name="createPass" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
