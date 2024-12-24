import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const DataSkeleton = () => {
  return (
    <View className="flex-row flex-wrap justify-center items-center p-4">
      <View className="w-full h-48 bg-gray-300 justify-center items-center rounded">
        <ActivityIndicator size={50} color="#E5E7EB" />
      </View>
      <View className="w-full pt-4">
        {/* Loading Skeleton Bars */}
        <View className="h-2.5 bg-gray-200 rounded-full mb-4 w-48" />
        <View className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-xs" />
        <View className="h-2 bg-gray-200 rounded-full mb-2.5" />
        <View className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-lg" />
        <View className="h-2 bg-gray-200 rounded-full mb-2.5 max-w-xl" />
        <View className="h-2 bg-gray-200 rounded-full max-w-sm" />
      </View>
      {/* Screen Reader Accessibility */}
      <Text className="absolute w-1 h-1 p-0 m-[-1] border-0 clip-rect-0 overflow-hidden">
        Loading...
      </Text>
    </View>
  );
};

export default DataSkeleton;
