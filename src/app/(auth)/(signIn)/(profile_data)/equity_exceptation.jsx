import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ReferalModel from "../../../../components/models/ReferalModel";

// Reusable Slider Component
const EquitySlider = ({ label, value, onValueChange, disabled }) => {
  return (
    <View className="my-4">
      <Text
        className={`text-base font-medium mb-2 ${
          disabled ? "opacity-50" : "text-gray-950"
        }`}
      >
        {label}
      </Text>
      <Slider
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        minimumTrackTintColor={disabled ? "#E2E8F0" : "#007BFF"}
        maximumTrackTintColor="#E2E8F0"
        thumbTintColor={disabled ? "#E2E8F0" : "#007BFF"}
      />
      <Text className="text-base text-gray-700 mt-2">{value}%</Text>
    </View>
  );
};

const EquityExpectation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [minEquity, setMinEquity] = useState(0);
  const [maxEquity, setMaxEquity] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalVisibility = () => {
    setModalVisible((prevState) => !prevState);
  };

  const handleNextButtonPress = () => {
    setModalVisible(true);
  };

  const isCustomOption =
    selectedOption === "offer" || selectedOption === "accept";

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-4 items-center">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Equity Expectation</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">6/6</Text>
      </View>

      {/* Body Section */}
      <View className="px-6 py-8 w-full flex-1">
        {/* Option Selection */}
        {["negotiable", "equal", "accept", "offer"].map((option) => (
          <TouchableOpacity
            key={option}
            className="flex-row items-center mb-4"
            onPress={() => setSelectedOption(option)}
          >
            <View
              className={`h-5 w-5 rounded-full border-2 ${
                selectedOption === option
                  ? "border-[#2983DC]"
                  : "border-gray-400"
              } flex items-center justify-center`}
            >
              {selectedOption === option && (
                <View className="h-2.5 w-2.5 rounded-full bg-[#2983DC]" />
              )}
            </View>
            <Text className="ml-2 py-1 text-lg text-gray-700 capitalize">
              {option === "negotiable"
                ? "Fully Negotiable"
                : option === "equal"
                ? "Equal Split"
                : option === "accept"
                ? "Willing to accept a specific equity range"
                : "Willing to offer a specific equity range"}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Render Sliders Conditionally */}
        {isCustomOption && (
          <>
            <EquitySlider
              label="Minimum Equity"
              value={minEquity}
              onValueChange={setMinEquity}
              disabled={!isCustomOption}
            />
            <EquitySlider
              label="Maximum Equity"
              value={maxEquity}
              onValueChange={setMaxEquity}
              disabled={!isCustomOption}
            />
          </>
        )}
      </View>

      {/* Footer Section */}
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleNextButtonPress}
          title="Let’s Jump In!"
        />
      </View>

      {/* Modal Section */}
      <ReferalModel
        isModalVisible={isModalVisible}
        handleModalVisibility={handleModalVisibility}
        routerToNextPage={() => router.push("/(main)/(tabs)")}
      />
    </SafeAreaView>
  );
};

export default EquityExpectation;
