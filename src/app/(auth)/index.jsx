import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomeButton from "../../components/buttons/CustomeButton";
import { splashScreensWelcome } from "../../constants/splashScreen";
import AuthModel from "../../components/models/AuthModel";
import { router } from "expo-router";

// Custom loading screen component with animation
const LoadingScreen = () => (
  <SafeAreaView className="flex-1 justify-center items-center bg-white">
    <ActivityIndicator size="large" color="#2983DC" />
    <Text className="text-lg mt-4 text-[#2983DC]">Loading...</Text>
  </SafeAreaView>
);

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const isLastSlide = activeIndex === splashScreensWelcome.length - 1;

  // Toggle modal visibility
  const toggleModal = () => setModalVisible(!isModalVisible);

  // Handle next button click
  const handleNext = () => {
    if (isLastSlide) {
      toggleModal();
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  // Handle navigation after modal closes
  const handleNavigation = (route) => {
    if (isModalVisible) {
      setModalVisible(false);
      setTimeout(() => {
        router.push(route); // Navigate after modal close
      }, 200);
    }
  };

  // Handle sign-up and login navigation
  const handleSignUp = () => handleNavigation("/(signIn)");
  const handleLogin = () => handleNavigation("/login");

  // Simulate loading state for onboarding screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Simulating 2-second load
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className={`flex-1 h-screen ${
        isModalVisible ? "rounded-t-3xl" : ""
      } bg-white`}
    >
      {/* Swiper Component */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-6 h-2 bg-[#CCE6FF] rounded-full mx-1" />}
        activeDot={<View className="w-16 h-2 bg-[#2983DC] rounded-full mx-1" />}
        className="flex-1"
        onIndexChanged={setActiveIndex}
      >
        {splashScreensWelcome.map((item) => (
          <View
            key={item.id}
            className="flex-1 justify-center items-center p-6"
          >
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-72 h-1/2"
            />
            <View className="mt-8 text-center gap-6 items-center space-y-4">
              <Text className="text-3xl text-center font-semibold text-[#454545]">
                {item.title}
              </Text>
              <Text className="text-base text-center text-gray-600 px-4">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Action Button */}
      <View className="px-8 items-center justify-center ">
        <CustomeButton
          onButtonPress={handleNext}
          title={isLastSlide ? "Get Started" : "Next"}
          className={`py-4 rounded-lg ${
            isLastSlide ? "bg-[#2983DC]" : "bg-gray-300"
          }`}
          textClassName="text-white text-lg font-bold"
        />
      </View>

      {/* Login/Signup Modal */}
      <AuthModel
        isModalVisible={isModalVisible}
        handleModalVisibility={() => setModalVisible(false)}
        handleLogin={handleLogin}
        handleSignup={handleSignUp}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
