import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen name="(message)" options={{ headerShown: false }} />
        <Stack.Screen name="invitation" options={{ headerShown: false }} />
        <Stack.Screen name="message" options={{ headerShown: false }} />
        <Stack.Screen name="(premium)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
