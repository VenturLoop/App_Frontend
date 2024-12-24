import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { Toast } from "react-native-toast-notifications";
import { setStatus } from "../../../../redux/slices/profileSlice";

const WhatYourStatus = () => {
  const [selected, setSelected] = useState(""); // Track selected label
  const [loading, setLoading] = useState(false); // Track loading state
  const dispatch = useDispatch(); // Dispatch action to Redux

  // Options for status selection
  const options = [
    { label: "Looking for a co-founder" },
    { label: "Looking for team mates" },
    { label: "Looking for startups" },
    { label: "Looking for investors" },
  ];

  // Handle saving the selected status
  const handleStatusSave = async () => {
    if (!selected) {
      Toast.show("Please select an option", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      // Dispatch the status to Redux
      dispatch(setStatus(selected));

      // Show success message
      Toast.show("Status saved successfully!", { type: "success" });

      // Navigate to the next page
      router.navigate("/skillset");
    } catch (error) {
      Toast.show("Error saving status, please try again.", { type: "error" });
    } finally {
      setLoading(false); // Ensure loading is reset after the operation
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      {/* Header */}
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-500 py-5 w-full items-center">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            What are you looking for?
          </Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">1/6</Text>
      </View>

      {/* Body */}
      <View className="body pt-2 w-full flex-1 px-4">
        <View className="flex flex-col space-y-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.label} // Use label as the key
              onPress={() => setSelected(option.label)} // Set the selected label directly
              className="flex py-3 flex-row items-center gap-3"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selected === option.label
                    ? "border-[#2983DC] bg-[#2983DC]"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {selected === option.label && (
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </View>
              <Text className="text-lg tracking-wider text-black">
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleStatusSave}
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
          // style="mb-4"
        />
      </View>
    </SafeAreaView>
  );
};

export default WhatYourStatus;
