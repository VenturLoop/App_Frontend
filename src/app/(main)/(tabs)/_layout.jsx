import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TabBar from "../../../components/TabBar/TabBar";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="invitation"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="cog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="envelope" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
      {/* <StatusBar style="dark" /> */}
    </>
  );
}
