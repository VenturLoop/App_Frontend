import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomeButton from "../../../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCommitmentLevel } from "../../../../../redux/slices/profileSlice";
import { Toast } from "react-native-toast-notifications";

const user_commitment = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.profile);
  const profile = useSelector((state) => state.profile); // Get the user data from the Redux store

  console.log("profile: ", profile);

  console.log("Status:", status);

  const options = [
    { id: "1", label: "Already full time in a startup" },
    { id: "2", label: "Ready to go full-time with right co-founder" },
    { id: "3", label: "Ready to go full time next year" },
    { id: "4", label: "No specific startup plan" },
    { id: "5", label: "No Preference" },
  ];

  console.log("Selected Label:", selectedLabel);

  const handleCommitmentSave = () => {
    if (!selectedLabel) {
      Toast.show("Please select an option", { type: "error" });
      return;
    }

    setLoading(true);

    // Save the selected label to the Redux store
    dispatch(setCommitmentLevel(selectedLabel)); // Pass only the label
    Toast.show("Commitment Saved!", { type: "success" });

    router.back();
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      {/* Header */}
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-4 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Commitment Level</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">4/6</Text>
      </View>

      {/* Body */}
      <View className="body w-full flex-1">
        <View className="flex flex-col space-y-4 p-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedLabel(option.label)} // Store only the label
              className="flex py-3 flex-row items-center gap-3 space-x-2"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedLabel === option.label
                    ? "border-[#2983DC] bg-[#2983DC]"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {selectedLabel === option.label && (
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </View>
              <Text className="text-lg tracking-wide text-black">
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleCommitmentSave}
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
        />
      </View>
    </SafeAreaView>
  );
};

export default user_commitment;
