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
      <Stack screenOptions={{ headerShown: false }} />

      {isLogin ? <Redirect href={"/(main)"} /> : <Redirect href={"/(auth)"} />}
    </>
  );
}
