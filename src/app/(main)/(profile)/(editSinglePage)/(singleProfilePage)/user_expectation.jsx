import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../../../components/buttons/CustomeButton";

const UserExpectation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [equityRange, setEquityRange] = useState({ min: 0, max: 100 });

  const handleNextButtonPress = () => {
    // Save the changes or move to the next step
    router.back();
  };

  const isCustomOption =
    selectedOption === "offer" || selectedOption === "accept";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-8 py-5">
        <Text className="text-2xl font-bold mb-4">User Expectation</Text>

        {/* Slider Section */}
        <View className="w-full mb-4">
          <Text className="text-lg mb-2">Equity Range</Text>
          <View className="flex-row justify-between mb-2">
            <Text>{equityRange.min}%</Text>
            <Text>{equityRange.max}%</Text>
          </View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={equityRange.min}
            onValueChange={(value) =>
              setEquityRange({ ...equityRange, min: value })
            }
            minimumTrackTintColor="#2983DC"
            maximumTrackTintColor="#000000"
          />
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={equityRange.max}
            onValueChange={(value) =>
              setEquityRange({ ...equityRange, max: value })
            }
            minimumTrackTintColor="#2983DC"
            maximumTrackTintColor="#000000"
          />
        </View>

        {/* Next Button */}
        <CustomeButton title="Next" onButtonPress={handleNextButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default UserExpectation;
