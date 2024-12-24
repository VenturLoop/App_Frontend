import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { setStatus } from "../../../../redux/slices/profileSlice";
import { useDispatch } from "react-redux";

const EditStatus = () => {
  const [selectedLabel, setSelectedLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    "Looking for a co-founder",
    "Looking for team mates",
    "Looking for startups",
    "Looking for investors",
  ];

  const dispatch = useDispatch();

  const handleStatusSave = () => {
    if (!selectedLabel) return; // Prevent saving if nothing is selected

    setLoading(true);
    dispatch(setStatus(selectedLabel));
    router.back();
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-500 py-4 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            What are you looking for?
          </Text>
        </View>
      </View>

      <View className="body w-full flex-1">
        <View className="flex flex-col space-y-4 p-4">
          {options.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setSelectedLabel(label)}
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
              <Text className="text-lg tracking-wider text-black">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleStatusSave}
          title={loading ? <ActivityIndicator color="white" /> : "Save"}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditStatus;
