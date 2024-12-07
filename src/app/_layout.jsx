import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import "../../global.css";

export default function RootLayout() {
  const [isLogin, setisLogin] = useState(false);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      {isLogin ? <Redirect href={"/(main)"} /> : <Redirect href={"/(auth)"} />}
    </>
  );
}
