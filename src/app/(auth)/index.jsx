import { router, usePathname, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomeButton from "../../components/buttons/CustomeButton";
import { splashScreensWelcome } from "../../constants/splashScreen";
import LoginSignupModel from "../../components/models/Login_Signup";
import AuthModel from "../../components/models/AuthModel";

const Onboarding = () => {
  const swiperRef = useRef(null);
  // const path = usePathname();
  // console.log("router", path);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const isLastSlide = activeIndex === splashScreensWelcome.length - 1;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleNext = () => {
    if (isLastSlide) {
      toggleModal();
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  const handleNavigation = (route) => {
    if (isModalVisible) {
      setModalVisible(false);
      setTimeout(() => {
        router.push(route);
      }, 200); // Wait for modal close animation before routing
    }
  };

  const handleSignUpfunction = () => {
    handleNavigation("/(signIn)");
  };

  const handleLoginfunction = () => {
    handleNavigation("/login");
  };

  return (
    <SafeAreaView
      className={`flex-1 h-screen ${
        isModalVisible ? " rounded-t-3xl  " : ""
      } bg-white `}
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
        handleModalVisibility={() => {
          setModalVisible(false);
        }}
        handleLogin={handleLoginfunction}
        handleSignup={handleSignUpfunction}
      />
    </SafeAreaView>
  );
};

export default Onboarding;

// TODO: Add a other function which return the loading page with venturloop gif with animation
