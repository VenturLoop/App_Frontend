import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import ReferalPriceModel from "../../../../components/models/ReferalPriceModel";
import { submitInCompleteProfileData } from "../../../../redux/slices/profileSlice";
import { submitProfileApi } from "../../../../api/profile";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

const EquitySlider = ({ label, value, onValueChange, disabled }) => (
  <View style={{ marginVertical: 8 }}>
    <Text
      style={{ marginBottom: 4, fontSize: 16, opacity: disabled ? 0.5 : 1 }}
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
    <Text style={{ marginTop: 4, fontSize: 16 }}>{value}%</Text>
  </View>
);

const equity_exceptation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [equityRange, setEquityRange] = useState({ min: 0, max: 0 });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {
    skillSet,
    industries,
    priorStartupExperience,
    commitmentLevel,
    status,
  } = useSelector((state) => state.profile);
  const { userId } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile); // Get the user data from the Redux store

  console.log("profile: ", profile);

  const handleSaveProfile = async () => {
    if (!selectedOption) {
      Toast.show("Please select an option", { type: "danger" });
      return;
    }

    if (
      (selectedOption === "accept" || selectedOption === "offer") &&
      (equityRange.min === 0 || equityRange.max === 0)
    ) {
      Toast.show("Please set a valid equity range", { type: "danger" });
      return;
    }

    setLoading(true);

    try {
      const equityExpectationData =
        selectedOption === "accept" || selectedOption === "offer"
          ? `${equityRange.min}-${equityRange.max}%`
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

      console.log("Submitting profile with data:", payload);

      const response = await submitProfileApi({
        userId,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation: equityExpectationData,
        status,
      });

      if (response.success) {
        Toast.show("Data submitted successfully", { type: "success" });
        setModalVisible(true);
      } else {
        Toast.show(response.message || "Failed to save profile", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Toast.show("Error saving profile. Please try again later.", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (key, value) => {
    setEquityRange((prev) => ({ ...prev, [key]: value }));
  };

  const isCustomOption =
    selectedOption === "offer" || selectedOption === "accept";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: "#ddd",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Equity Expectation
        </Text>
        <Text style={{ fontSize: 18, color: "#2983DC" }}>6/6</Text>
      </View>

      {/* Body Section */}
      <View style={{ padding: 16, flex: 1 }}>
        {/* Options */}
        {["negotiable", "equal", "accept", "offer"].map((option) => (
          <TouchableOpacity
            key={option}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
            onPress={() => setSelectedOption(option)}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selectedOption === option ? "#2983DC" : "#ccc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedOption === option && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: "#2983DC",
                  }}
                />
              )}
            </View>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                textTransform: "capitalize",
              }}
            >
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

        {/* Sliders */}
        {isCustomOption && (
          <>
            <EquitySlider
              label="Minimum Equity"
              value={equityRange.min}
              onValueChange={(value) => handleSliderChange("min", value)}
              disabled={!isCustomOption}
            />
            <EquitySlider
              label="Maximum Equity"
              value={equityRange.max}
              onValueChange={(value) => handleSliderChange("max", value)}
              disabled={!isCustomOption}
            />
          </>
        )}
      </View>

      {/* Footer Section */}
      <View style={{ padding: 16 }}>
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

export default equity_exceptation;
