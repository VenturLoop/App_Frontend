import React from "react";
import { SafeAreaView, View, Image, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native"; // Import Lottie
import imagePath from "../../constants/imagePath"; // Assuming this holds the path

const PageLoading = () => {
  return (
    <SafeAreaView className="h-screen w-full flex-1 justify-between items-center bg-white">
      {/* Upper loading Lottie Animation */}
      <View className="h-1/2 flex-1 justify-center items-center">
        <LottieView
          source={require("../../assets/animation/loading.json")} // Reference the Lottie JSON file
          autoPlay
          loop
          style={{ width: 192, height: 192 }} // Adjust size as needed
        />
      </View>

      {/* Bottom Logo */}
      <View className="mb-5">
        <Image
          className="w-28 h-28"
          source={imagePath.logoLoading} // Reference the logo from the assets folder
          style={{ width: 120, height: 120 }} // Adjust logo size
          resizeMode="contain"
        />
      </View>

      {/* Optional: Add an Activity Indicator to show a spinning loader
      <ActivityIndicator size="large" color="#0000ff" /> */}
    </SafeAreaView>
  );
};

export default PageLoading;
