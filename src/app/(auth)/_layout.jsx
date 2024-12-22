import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setRoute } from "../../redux/slices/routeSlice"; // Assuming a Redux slice is defined

const AuthLayout = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const { currentRoute } = useSelector((state) => state.route); // Redux route state
  const { isLogin, isSignup } = useSelector((state) => state.user);

  // Save the current route to both Redux and AsyncStorage
  const saveRoute = useCallback(async () => {
    if (path && path !== currentRoute) {
      try {
        await AsyncStorage.setItem("lastVisitedRoute", path);
        dispatch(setRoute(path)); // Update Redux state
      } catch (error) {
        console.error("Error saving route:", error);
      }
    }
  }, [path, currentRoute, dispatch]);

  console.log("CurrentRoute", currentRoute);
  
  useEffect(() => {
    saveRoute();
  }, [path, saveRoute]);

  // Compare Redux route with AsyncStorage route and navigate if they match
  useEffect(() => {
    const navigateToLastRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem("lastVisitedRoute");
        console.log("SaveRoute:", saveRoute);
        if (
          savedRoute &&
          savedRoute === currentRoute &&
          !isLogin &&
          !isSignup
        ) {
          router.replace(savedRoute); // Navigate only if routes match
        }
      } catch (error) {
        console.error("Error retrieving last route:", error);
      }
    };

    navigateToLastRoute();
  }, [currentRoute, isLogin, isSignup, router]);

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
