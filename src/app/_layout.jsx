import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setLogin } from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { ToastProvider } from "react-native-toast-notifications";
import CustomToast from "../components/ToastMessage/CustomToast";

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
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        dispatch(setLogin({ isLogin: !!token, token }));
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
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
        }}
      />
      {isLogin ? (
        <Redirect href="/(main)/(tabs)" />
      ) : (
        <Redirect href="/(auth)" />
      )}
    </>
  );
}
