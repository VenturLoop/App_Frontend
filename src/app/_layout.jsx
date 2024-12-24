import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setLogin, setSignup } from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { ToastProvider } from "react-native-toast-notifications";
import CustomToast from "../components/ToastMessage/CustomToast";
import { setUserId } from "../redux/slices/profileSlice";

// Prevent auto-hiding the splash screen until the app is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ToastProvider
      placement="top"
      duration={2000}
      animationType="slide-in"
      renderToast={(toastOptions) => <CustomToast {...toastOptions} />}
    >
      <Provider store={store}>
        <AppInitializer />
      </Provider>
    </ToastProvider>
  );
}

function AppInitializer() {
  const dispatch = useDispatch();
  const { isLogin, isSignup } = useSelector((state) => state.user);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check login status
        const loginToken = await SecureStore.getItemAsync("userToken");
        dispatch(setLogin({ isLogin: !!loginToken, loginToken }));

        // Check signup status
        const signupToken = await SecureStore.getItemAsync("userSignupToken");
        dispatch(setSignup({ isSignup: !!signupToken, token: signupToken }));

        // const userIdSecure = await SecureStore.getItemAsync("userId");
        // dispatch(setUserId(userIdSecure));
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        // Mark the app as ready and hide the splash screen
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [dispatch]);

  // Wait for the app to be ready before rendering anything
  if (!isAppReady) {
    return null; // Optionally render a loading spinner or placeholder
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          transitionSpec: {
            open: { animation: "timing", config: { duration: 50 } },
            close: { animation: "timing", config: { duration: 50 } },
          },
        }}
      />
      {isLogin ? (
        <Redirect href="/(main)/(tabs)" />
      ) : isSignup ? (
        <Redirect href="\(auth)\(signIn)\(profile_data)" />
      ) : (
        <Redirect href="/(auth)" />
      )}
    </>
  );
}
