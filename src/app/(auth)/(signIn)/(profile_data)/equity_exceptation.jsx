import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import ReferalPriceModel from "../../../../components/models/ReferalPriceModel";
import { submitProfileApi } from "../../../../api/profile";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

const EquityExpectation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [equityRangePageFromUser, setequityRangePageFromUser] = useState({
    min: "",
    max: "",
  });
  const [values, setValues] = React.useState([50]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    userId,
    skillSet,
    industries,
    priorStartupExperience,
    commitmentLevel,
    status,
  } = useSelector((state) => state.profile);

  const handleSaveProfile = async () => {
    if (!selectedOption) {
      Toast.show("Please select an option", { type: "danger" });
      return;
    }

    // Ensure both min and max equity are provided and valid for specific options
    if (
      (selectedOption === "accept" || selectedOption === "offer") &&
      (equityRangePageFromUser.min === "" || equityRangePageFromUser.max === "")
    ) {
      Toast.show("Please set both min and max equity values", {
        type: "danger",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare equity expectation data
      const equityExpectationData =
        selectedOption === "accept"
          ? `Accept:${equityRangePageFromUser.min}-${equityRangePageFromUser.max}%`
          : selectedOption === "offer"
          ? `Offer:${equityRangePageFromUser.min}-${equityRangePageFromUser.max}%`
          : selectedOption === "negotiable"
          ? "Fully Negotiable"
          : "Equal Split";

      const payload = {
        userId,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation: equityExpectationData,
        status,
      };

      const response = await submitProfileApi(payload);

      if (response.success) {
        Toast.show("Data submitted successfully", { type: "success" });
        setModalVisible(true);
      } else {
        Toast.show(response.message || "Failed to save profile", {
          type: "danger",
        });
      }
    } catch (error) {
      Toast.show("Error saving profile. Please try again later.", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(userId);

  const handleInputChange = (field, value) => {
    if (/^\d*$/.test(value)) {
      setequityRangePageFromUser((prev) => ({
        ...prev, // Ensures previous state is copied
        [field]: value, // Update the specific field (min or max)
      }));
    }
  };

  const optionLabels = {
    negotiable: "Fully Negotiable",
    equal: "Equal Split",
    accept: "Willing to accept a specific equity range",
    offer: "Willing to offer a specific equity range",
  };

  const isCustomOption =
    selectedOption === "offer" || selectedOption === "accept";

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      {/* Header */}
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-5 border-gray-300 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Equity Expectation</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">6/6</Text>
      </View>

      {/* Body */}
      <View className="body w-full flex-1 px-5">
        <View className="flex flex-col space-y-4">
          {["negotiable", "equal", "accept", "offer"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSelectedOption(option)}
              className="flex py-3 flex-row items-center gap-3 space-x-2"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === option
                    ? "border-[#2983DC] bg-[#2983DC]"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {selectedOption === option && (
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </View>
              <Text className="text-lg tracking-wider text-black">
                {optionLabels[option]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Inputs for Custom Option */}
        {isCustomOption && (
          <View className="flex-row gap-6 w-full">
            {/* Minimum Equity Field */}
            <View className="flex-1 my-2">
              <Text className="mb-1 text-base font-semibold text-gray-700">
                Minimum Equity
              </Text>
              <TextInput
                value={equityRangePageFromUser.min}
                onChangeText={(value) => handleInputChange("min", value)}
                keyboardType="numeric"
                placeholder="Enter min equity"
                className="px-4 py-3 border border-gray-300 rounded-md text-lg font-medium text-gray-800 focus:border-[#2983DC] focus:ring-2 focus:ring-[#2983DC] focus:outline-none transition duration-200"
              />
            </View>

            {/* Maximum Equity Field */}
            <View className="flex-1 my-2">
              <Text className="mb-1 text-base font-semibold text-gray-700">
                Maximum Equity
              </Text>
              <TextInput
                value={equityRangePageFromUser.max}
                onChangeText={(value) => handleInputChange("max", value)}
                keyboardType="numeric"
                placeholder="Enter max equity"
                className="px-4 py-3 border border-gray-300 rounded-md text-lg font-medium text-gray-800 focus:border-[#2983DC] focus:ring-2 focus:ring-[#2983DC] focus:outline-none transition duration-200"
              />
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleSaveProfile}
          title={
            loading ? <ActivityIndicator color="white" /> : "Let’s Jump In!"
          }
        />
      </View>

      {/* Modal */}
      <ReferalPriceModel
        isModalVisible={isModalVisible}
        handleModalVisibility={() => setModalVisible(!isModalVisible)}
      />
    </SafeAreaView>
  );
};

export default EquityExpectation;
