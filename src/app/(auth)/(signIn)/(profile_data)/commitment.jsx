import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { setCommitmentLevel } from "../../../../redux/slices/profileSlice";
import { Toast } from "react-native-toast-notifications";

const Commitment = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Directly get the status (if necessary) from Redux store
  const profile = useSelector((state) => state.profile);
  const { status } = profile;

  // Commitment level options
  const options = [
    "Already full time in a startup",
    "Ready to go full-time with right co-founder",
    "Ready to go full time next year",
    "No specific startup plan",
    "No Preference",
  ];

  const handleCommitmentSave = () => {
    if (!selectedLabel) {
      Toast.show("Please select an option", { type: "error" });
      return;
    }

    setLoading(true);

    // Dispatch the selected label directly
    dispatch(setCommitmentLevel(selectedLabel));
    Toast.show("Commitment Saved!", { type: "success" });

    router.navigate("/prior_experience");
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      {/* Header */}
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-5 border-gray-300 w-full items-center">
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
          {options.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setSelectedLabel(label)} // Store the label directly
              className="flex py-3 flex-row items-center gap-3 space-x-2"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedLabel === label
                    ? "border-[#2983DC] bg-[#2983DC]"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {selectedLabel === label && (
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </View>
              <Text className="text-lg tracking-wide text-black">{label}</Text>
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

export default Commitment;
