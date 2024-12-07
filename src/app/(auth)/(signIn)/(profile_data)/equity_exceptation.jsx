import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import PageLoading from "../../../../components/loading/PageLoading";
import LoginSignupModel from "../../../../components/models/Login_Signup";
import { splashScreensWelcome } from "../../../../constants/splashScreen";
import ReferalModel from "../../../../components/models/ReferalModel";

const equity_exceptation = () => {
  const [selectedOption, setSelectedOption] = useState("offer");
  const [minEquity, setMinEquity] = useState(1);
  const [maxEquity, setMaxEquity] = useState(50);
  const swiperRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalVisibility = () => {
    setModalVisible((prevState) => !prevState);
  };

  const handleNextButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white  h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-4 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              className="w-8 h-4"
              source={imagePath.back}
            />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Equity Expectation</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">6/6</Text>
      </View>
      <View className="px-6 py-8 w-full flex-1">
        {/* Fully Negotiable */}
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setSelectedOption("negotiable")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "negotiable"
                ? "border-blue-600"
                : "border-gray-400"
            } flex items-center justify-center`}
          >
            {selectedOption === "negotiable" && (
              <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="ml-2 text-lg text-gray-700">Fully Negotiable</Text>
        </TouchableOpacity>

        {/* Equal Split */}
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setSelectedOption("equal")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "equal" ? "border-blue-600" : "border-gray-400"
            } flex items-center justify-center`}
          >
            {selectedOption === "equal" && (
              <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="ml-2 text-lg text-gray-700">Equal Split</Text>
        </TouchableOpacity>

        {/* Willing to accept a specific equity range */}
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setSelectedOption("accept")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "accept"
                ? "border-blue-600"
                : "border-gray-400"
            } flex items-center justify-center`}
          >
            {selectedOption === "accept" && (
              <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="ml-2 text-lg text-gray-700">
            Willing to accept a specific equity range
          </Text>
        </TouchableOpacity>

        {/* Willing to offer a specific equity range */}
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setSelectedOption("offer")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "offer" ? "border-blue-600" : "border-gray-400"
            } flex items-center justify-center`}
          >
            {selectedOption === "offer" && (
              <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="ml-2 text-lg text-gray-700">
            Willing to offer a specific equity range
          </Text>
        </TouchableOpacity>

        {/* Minimum Equity */}
        <View className="my-4">
          <View className=" justify-center items-start gap-2 mb-2">
            <Text className="text-base font-medium text-gray-950">
              Minimum Equity
            </Text>
            <Text className="text-base text-gray-700">{minEquity}%</Text>
          </View>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={minEquity}
            onValueChange={(value) => setMinEquity(value)}
            minimumTrackTintColor="#007BFF"
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor="#007BFF"
          />
        </View>

        {/* Maximum Equity */}
        <View className="my-4 py-4">
          <View className=" justify-center items-start gap-2 mb-2">
            <Text className="text-base font-medium text-gray-950">
              Maximum Equity
            </Text>
            <Text className="text-base text-gray-700">{maxEquity}%</Text>
          </View>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={maxEquity}
            onValueChange={(value) => setMaxEquity(value)}
            minimumTrackTintColor="#007BFF"
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor="#007BFF"
          />
        </View>
      </View>
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleNextButtonPress}
          title="Lets Jump In !"
        />
      </View>
      <ReferalModel
        isModalVisible={isModalVisible}
        handleModalVisibility={handleModalVisibility}
        routerToNextPage={()=>{
          router.push('/(main)')
        }}
      />
    </SafeAreaView>
  );
};

export default equity_exceptation;
