import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../../../components/ModelLayoul/EditLayout";
import CustomeButton from "../../../../../components/buttons/CustomeButton";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

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
      <Text className="text-base text-gray-700 mt-2">{value} KM</Text>
    </View>
  );
};

const distance = () => {
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

  const isCustomOption = selectedOption === "custome";
  return (
    <EditLayout title="Distance">
      {/* Body Section */}
      <View className="px-4 py- w-full flex-1">
        {/* Option Selection */}
        {["negotiable", "equal", "accept", "custome"].map((option) => (
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
                ? "In my country (India)"
                : option === "equal"
                ? "In my region (South Asia)"
                : option === "accept"
                ? "No Preferance"
                : "Custom Distance"}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Render Sliders Conditionally */}
        {isCustomOption && (
          <>
            <EquitySlider
              // label="Minimum Equity"
              value={minEquity}
              onValueChange={setMinEquity}
              disabled={!isCustomOption}
            />
           
          </>
        )}
      </View>

      {/* Footer Section */}
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={() => {
            router.back();
          }}
          title="Save"
        />
      </View>
    </EditLayout>
  );
};

export default distance;
