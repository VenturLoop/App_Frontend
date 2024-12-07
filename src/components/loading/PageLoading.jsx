import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import imagePath from "../../constants/imagePath";

const PageLoading = () => {
  return (
    <SafeAreaView className="h-screen w-full flex-1 justify-between items-center bg-white">
      <View className="h-1/2 flex-1 justify-center items-center">
        <Image
          className="w-48 h-48"
          source={imagePath.loading}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Image
        className="mb-5 w-20 h-20"
        contentFit="cover"
        source={imagePath.logoLoading}
      />
    </SafeAreaView>
  );
};

export default PageLoading;
