import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { Easing } from "react-native"; // Import Easing from react-native

export default function SignInLayout() {
  const { isSignup } = useSelector((state) => state.user);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom", // Use a modern animation type
          transitionSpec: {
            open: {
              animation: "spring",
              config: {
                stiffness: 300,
                damping: 30,
                mass: 0.5,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 150,
                easing: Easing.out(Easing.ease), // Use Easing correctly here
              },
            },
          },
          gestureEnabled: true, // Allow swipe-back gestures for fluid navigation
          animationTypeForReplace: "push", // Push new screens with smooth sliding
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Slide from right
                  }),
                },
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1], // Subtle zoom effect
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1], // Fade in
              }),
            },
          }),
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="add_basic_details" />
        <Stack.Screen name="createPass" />
        <Stack.Screen name="otp" />
      </Stack>
      {isSignup ? <Redirect href={"/(profile_data)"} /> : null}
    </>
  );
}
