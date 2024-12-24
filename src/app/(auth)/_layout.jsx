import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 50,
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 50,
            },
          },
        },
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(signIn)" />
      <Stack.Screen name="(login)" />
    </Stack>
  );
};

export default AuthLayout;
