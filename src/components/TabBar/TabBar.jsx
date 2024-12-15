import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  // Icons mapping based on route names
  const iconMap = {
    index: Feather, // Example route
    invitation: Feather,
    message: Feather,
    profile: Feather,
  };

  const iconNames = {
    index: "compass",
    invitation: "clipboard",
    message: "mail", // Consider updating the icon name
    profile: "user",
  };

  return (
    <View className="bg-[#F0F6FB] border-none ">
      <View className="flex-row bg-white rounded-xl shadow-lg mx-4 mb-3    py-3">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const IconComponent = iconMap[route.name];
          const iconName = iconNames[route.name];

          // Handlers for button presses
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 py-2 items-center justify-center"
            >
              {IconComponent && (
                <IconComponent
                  name={iconName}
                  size={24}
                  color={isFocused ? "#2983DC" : "#939393"}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
