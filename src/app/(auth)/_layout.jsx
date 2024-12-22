import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
  const router = useRouter();
  const path = usePathname();
  const { isLogin, isSignup } = useSelector((state) => state.user);

  // Save the current path to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCurrentRoute = async () => {
      if (path) {
        try {
          await AsyncStorage.setItem("lastVisitedRoute", path);
        } catch (error) {
          console.error("Error saving route:", error);
        }
      }
    };

    saveCurrentRoute();
  }, [path]);

  // Retrieve the last visited route on app load and navigate
  useEffect(() => {
    const navigateToLastRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem("lastVisitedRoute");
        if (savedRoute && !isLogin && !isSignup) {
          router.push(savedRoute);
          console.log(savedRoute);
        }
      } catch (error) {
        console.error("Error retrieving last route:", error);
      }
    };

    navigateToLastRoute();
  }, [isLogin, isSignup, router]);
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
      <Stack.Screen name="(signIn)" />
      <Stack.Screen name="(login)" />
    </Stack>
  );
};

export default AuthLayout;
