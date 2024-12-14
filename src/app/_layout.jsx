import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

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
      />

      {isLogin ? (
        <Redirect href={"/(main)/(tabs)"} />
      ) : (
        <Redirect href={"/(auth)"} />
      )}
    </>
  );
}
