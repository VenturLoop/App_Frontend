import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setLogin } from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { ToastProvider } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CustomToast from "../components/ToastMessage/CustomToast";
import { setCurrentRoute } from "../redux/slices/routeSlice";

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

// App initialization and route handling
function AppInitializer() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  console.log(isLogin);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Retrieve token and userId from SecureStore
        const token = await SecureStore.getItemAsync("userToken");
        // const userId = await SecureStore.getItemAsync("userId");

        if (token) {
          // User is logged in, update Redux state
          dispatch(setLogin({ isLogin: true, token, userId }));
        } else {
          // User is not logged in
          dispatch(setLogin({ isLogin: false }));
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        // Hide splash screen after determining login state
        SplashScreen.hideAsync();
      }
    };

    checkLoginStatus();
  }, [dispatch]);

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
          animationTypeForReplace: "pop",
        }}
      />
      {/* Conditional redirection based on login state */}
      {isLogin ? (
        <Redirect href="/(main)/(tabs)" />
      ) : (
        <Redirect href="/(auth)" />
      )}
    </>
  );
}
