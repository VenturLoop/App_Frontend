import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

export default function SignInLayout() {
  // Access SignUpToken from Redux state
  const { isSignup } = useSelector((state) => state.user);

  // if (isSignup) {
  //   return <Redirect href={"/(profile)"} />;
  // }

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
        <Stack.Screen name="index" />
        <Stack.Screen name="add_basic_details" />
        <Stack.Screen name="createPass" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="(profile)" />
      </Stack>
      {/* {isSignup ? <Redirect href={"/(profile)"} /> : null} */}
    </>
  );
}
