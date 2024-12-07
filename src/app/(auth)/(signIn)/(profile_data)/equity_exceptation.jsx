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
import ReferalModel from "../../../../components/models/ReferalModel";
import { Ionicons } from "@expo/vector-icons";

const equity_expectation = () => {
  const [selectedOption, setSelectedOption] = useState("offer");
  const [minEquity, setMinEquity] = useState(1);
  const [maxEquity, setMaxEquity] = useState(50);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalVisibility = () => {
    setModalVisible((prevState) => !prevState);
  };

  const handleNextButtonPress = () => {
    setModalVisible(true);
  };

  // Determine if sliders are active (only for "custom" selection)
  const slidersActive = selectedOption === "custom";

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-4 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Equity Expectation</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">6/6</Text>
      </View>
      <View className="px-6 py-8 w-full flex-1">
        {/* Auto Select Options */}
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

        {/* Custom Equity Option */}
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setSelectedOption("custom")}
        >
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === "custom"
                ? "border-blue-600"
                : "border-gray-400"
            } flex items-center justify-center`}
          >
            {selectedOption === "custom" && (
              <View className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="ml-2 text-lg text-gray-700">Custom Equity</Text>
        </TouchableOpacity>

        {/* Custom Equity Sliders */}
        <View className="my-4">
          <Text className="text-base font-medium text-gray-950 mb-2">
            Minimum Equity
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={minEquity}
            onValueChange={(value) => setMinEquity(value)}
            disabled={!slidersActive}
            minimumTrackTintColor={slidersActive ? "#007BFF" : "#E2E8F0"}
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor={slidersActive ? "#007BFF" : "#E2E8F0"}
          />
          <Text className="text-base text-gray-700 mt-2">{minEquity}%</Text>
        </View>
        <View className="my-4">
          <Text className="text-base font-medium text-gray-950 mb-2">
            Maximum Equity
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={maxEquity}
            onValueChange={(value) => setMaxEquity(value)}
            disabled={!slidersActive}
            minimumTrackTintColor={slidersActive ? "#007BFF" : "#E2E8F0"}
            maximumTrackTintColor="#E2E8F0"
            thumbTintColor={slidersActive ? "#007BFF" : "#E2E8F0"}
          />
          <Text className="text-base text-gray-700 mt-2">{maxEquity}%</Text>
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
        routerToNextPage={() => {
          router.push("/(main)");
        }}
      />
    </SafeAreaView>
  );
};

export default equity_expectation;
