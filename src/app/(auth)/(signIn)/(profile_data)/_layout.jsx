import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Easing } from "react-native-reanimated"; // Import Easing for custom easing curves

const ProfileDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom", // Use a modern fade-from-bottom transition
        transitionSpec: {
          open: {
            animation: "spring", // Use spring animation for natural bouncing effect
            config: {
              stiffness: 300, // Define stiffness for the spring (controls speed)
              damping: 30, // Controls how much the animation 'bounces'
              mass: 0.5, // Lighter mass for faster response
              overshootClamping: false, // Allow overshoot for a natural feel
              restDisplacementThreshold: 0.01, 
              restSpeedThreshold: 0.01,
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 200, // Slightly longer close for smooth exit
              easing: Easing.out(Easing.ease), // Smooth easing for closing
            },
          },
        },
        animationTypeForReplace: "push", // Push new screens with a smooth sliding animation
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0], // Slide in from the right
                }),
              },
              {
                scale: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1], // Subtle zoom effect during transition
                }),
              },
            ],
            opacity: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1], // Fade in effect
            }),
          },
        }),
        gestureEnabled: true, // Enable swipe gestures for smoother navigation
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
