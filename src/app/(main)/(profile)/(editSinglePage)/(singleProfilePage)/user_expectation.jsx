import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { useDispatch } from "react-redux";
import { setEquityExpectation } from "../../../../../redux/slices/profileSlice";
import CustomeButton from "../../../../../components/buttons/CustomeButton";
import { Toast } from "react-native-toast-notifications";

const UserExpectation = () => {
  const dispatch = useDispatch();
  const [equityRange, setEquityRange] = useState({ min: 0, max: 100 });
  const [loading, setLoading] = useState(false);

  const handleNextButtonPress = () => {
    if (equityRange.min >= equityRange.max) {
      Toast.show("Minimum equity must be less than maximum equity", {
        type: "error",
      });
      return;
    }

    setLoading(true);

    // Format the equity range as a string and dispatch it
    const equityRangeString = `${equityRange.min}-${equityRange.max}`;

    // Save the formatted equity range to Redux store
    dispatch(setEquityExpectation(equityRangeString));

    Toast.show("Equity Expectation Saved!", { type: "success" });

    // Navigate back to the previous screen
    router.back();

    setLoading(false);
  };

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
              setEquityRange({
                ...equityRange,
                min: Math.min(value, equityRange.max),
              })
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
              setEquityRange({
                ...equityRange,
                max: Math.max(value, equityRange.min),
              })
            }
            minimumTrackTintColor="#2983DC"
            maximumTrackTintColor="#000000"
          />
        </View>

        {/* Next Button */}
        <CustomeButton
          title={loading ? "Saving..." : "Next"}
          onButtonPress={handleNextButtonPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserExpectation;
