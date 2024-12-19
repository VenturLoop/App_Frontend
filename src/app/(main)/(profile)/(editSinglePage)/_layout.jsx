import { Stack } from "expo-router";
import React from "react";

const EditSinglePageLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Enable gestures for navigation
        gestureDirection: "horizontal", // Horizontal navigation gestures
        animation: "fade", // Enable basic fade animation
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Left-to-right for forward navigation
                  }),
                },
              ],
            },
          };
        },
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 400, // Smoother animation for opening
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 400, // Smoother animation for closing
            },
          },
        },
      }}
    >
      {/* Define stack screens */}
      <Stack.Screen name="editStatus" />
      <Stack.Screen name="(singlePreferance)" />
      <Stack.Screen name="(singleProfilePage)" />
    </Stack>
  );
};

export default EditSinglePageLayout;
