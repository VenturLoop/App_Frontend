import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
import { setLogin } from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { ToastProvider } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CustomToast from "../components/ToastMessage/CustomToast";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ToastProvider
      placement="top" // Position of the toast (top, bottom, etc.)
      duration={2000} // Toast duration in milliseconds
      animationType="slide-in" // Slide-in animation for better visuals
      renderToast={(toastOptions) => <CustomToast {...toastOptions} />}
    >
      <Provider store={store}>
        <AppInitializer />
      </Provider>
    </ToastProvider>
  );
}

// const CustomToast = ({ message, type }) => {
//   return (
//     <View
//       style={{
//         backgroundColor:
//           type === "success"
//             ? "#28a745"
//             : type === "danger"
//             ? "#dc3545"
//             : "#ffc107",
//         padding: 10,
//         borderRadius: 8,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Ionicons
//         name={
//           type === "success"
//             ? "checkmark-circle-outline"
//             : "close-circle-outline"
//         }
//         size={22}
//         color="#fff"
//       />
//       <Text style={{ color: "#fff", marginLeft: 8 }}>{message}</Text>
//     </View>
//   );
// };

// Component to initialize the app
function AppInitializer() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);

  console.log("isLogin " + isLogin);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulate checking SecureStore for token
      const token = await SecureStore.getItemAsync("userToken");
      const userId = await SecureStore.getItemAsync("userId");

      console.log("token: " + token);
      console.log("userId: " + userId);

      // if (token && userId) {
      //   // User is logged in, update Redux state
      //   dispatch(setLogin({ isLogin: true, token, userId }));
      // } else {
      //   // User is not logged in
      //   dispatch(setLogin({ isLogin: false }));
      // }

      // Hide splash screen after loading state
      SplashScreen.hideAsync();
    };

    checkLoginStatus();
  }, []);

  return (
    <>
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
      />
      {/* Redirect based on login state */}
      {isLogin ? (
        <Redirect href={"/(main)/(tabs)"} />
      ) : (
        <Redirect href={"/(auth)"} />
      )}
    </>
  );
}
