import { View, Text } from "react-native";
import useSetCurrentRoute from "../../hooks/useSetCurrentRoute";
// import useSetCurrentRoute from "../hooks/useSetCurrentRoute"; // Adjust the path

const Layout = ({ children }) => {
  useSetCurrentRoute(); // This will update the current route in Redux

  return (
    <View style={{ flex: 1 }}>
      <Text>Header Content</Text>
      <View style={{ flex: 1 }}>{children}</View>
      <Text>Footer Content</Text>
    </View>
  );
};

export default Layout;
