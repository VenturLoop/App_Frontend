import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomeButton from "../../components/buttons/CustomeButton";
import { splashScreensWelcome } from "../../constants/splashScreen";
import { verticalScale, scale } from "react-native-size-matters";
import LoginSignupModel from "../../components/models/Login_Signup";

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const isLastSlide = activeIndex === splashScreensWelcome.length - 1;

  const handleModalVisibility = () => {
    setModalVisible((prevState) => !prevState);
  };

  const handleNextButtonPress = () => {
    if (isLastSlide) {
      handleModalVisibility();
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-8 w-full items-center bg-white">
      {/* Skip Button (Uncomment if needed) */}
      {/* <TouchableOpacity
        className="w-full justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-lg font-bold">Skip</Text>
      </TouchableOpacity> */}

      {/* Swiper Component */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-6 h-2 bg-[#CCE6FF] rounded-full mx-1" />}
        activeDot={<View className="w-12 h-2 bg-[#2983DC] rounded-full mx-1" />}
        className=" "
        onIndexChanged={setActiveIndex}
        // style={{ width: "100%" }} // Ensure Swiper takes full width
      >
        {splashScreensWelcome.map((item) => (
          <View
            key={item.id}
            className="flex-1 fixed w-auto mb-5 justify-center items-center "
          >
            <Image
              source={item.image}
              resizeMode="cover"
              className=" object-contain"
            />
            <View className="mt-10 gap-10">
              <Text className="text-3xl font-bold text-center text-[#454545]  mb-3">
                {item.title}
              </Text>
              <Text className="text-base text-center text-gray-500 mx-5">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Next or Get Started Button */}
      <CustomeButton
        onButtonPress={handleNextButtonPress}
        title={isLastSlide ? "Get Started" : "Next"}
      />
      <LoginSignupModel
        isModalVisible={isModalVisible}
        handleModalVisibility={handleModalVisibility}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
