// utils/toastConfig.js
import React, { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

const toastConfig = {
  slidingToast: ({ text1, text2 }) => {
    // Initialize slide animation value
    const slideAnim = useRef(new Animated.Value(500)).current; // Start far right of the screen

    useEffect(() => {
      // Slide in from right to left with smooth and fast animation
      Animated.timing(slideAnim, {
        toValue: 0, // Final position (visible on screen)
        duration: 250, // Animation duration in milliseconds
        useNativeDriver: true, // Optimize animation
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }], // Apply animation to slide from right to left
        }}
        className="bg-green-500 p-4 rounded-lg shadow-lg mx-auto mt-4 max-w-xs w-full"
      >
        <Text className="text-white text-lg font-semibold">{text1}</Text>
        {text2 && <Text className="text-white text-sm mt-1">{text2}</Text>}
      </Animated.View>
    );
  },
};

export default toastConfig;
