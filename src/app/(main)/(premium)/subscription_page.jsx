import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setPremium,
  resetSubscription,
} from "../../../redux/slices/subscriptionSlice";
import { router } from "expo-router";

const plans = [
  {
    title: "Starter",
    duration: "1 Week",
    price: "₹100.00",
    weeklyRate: "₹100/Week",
    features: [
      { feature: "Daily recommendation", free: "20", business: "Unlimited" },
      { feature: "Direct Connect", free: "2/Days", business: "10/Days" },
      { feature: "See all invitations", free: "-", business: "Unlimited" },
      { feature: "Premium Preferences", free: "-", business: "Yes" },
      { feature: "Save Profiles", free: "10", business: "Unlimited" },
      { feature: "Invitations", free: "10/Days", business: "Unlimited" },
      { feature: "Verified Badge", free: "-", business: "Yes" },
    ],
  },
  {
    title: "Recommended",
    duration: "1 Month",
    price: "₹200.00",
    weeklyRate: "₹50/Week",
    features: [
      { feature: "Daily recommendation", free: "20", business: "Unlimited" },
      { feature: "Direct Connect", free: "2/Days", business: "10/Days" },
      { feature: "See all invitations", free: "-", business: "Unlimited" },
      { feature: "Premium Preferences", free: "-", business: "Yes" },
      { feature: "Save Profiles", free: "10", business: "Unlimited" },
      { feature: "Invitations", free: "10/Days", business: "Unlimited" },
      { feature: "Verified Badge", free: "-", business: "Yes" },
    ],
  },
  {
    title: "Super Saver",
    duration: "3 Months",
    price: "₹500.00",
    weeklyRate: "₹41/Week",
    features: [
      { feature: "Daily recommendation", free: "20", business: "Unlimited" },
      { feature: "Direct Connect", free: "2/Days", business: "10/Days" },
      { feature: "See all invitations", free: "-", business: "Unlimited" },
      { feature: "Premium Preferences", free: "-", business: "Yes" },
      { feature: "Save Profiles", free: "10", business: "Unlimited" },
      { feature: "Invitations", free: "10/Days", business: "Unlimited" },
      { feature: "Verified Badge", free: "-", business: "Yes" },
    ],
  },
];

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const { isPremium, planNumber } = useSelector((state) => state.subscription);
  const [selectedPlan, setSelectedPlan] = useState(
    plans[planNumber] || plans[1]
  ); // Default to recommended

  useEffect(() => {
    // Update selected plan if `planNumber` changes in Redux
    if (planNumber !== null) {
      setSelectedPlan(plans[planNumber]);
    }
  }, [planNumber]);

  const handlePlanSelect = (planIndex) => {
    setSelectedPlan(plans[planIndex]);
  };

  const handleSubscribe = () => {
    const selectedIndex = plans.indexOf(selectedPlan); // Find index of selected plan
    if (selectedIndex !== -1) {
      dispatch(setPremium(selectedIndex)); // Set premium and plan number in Redux
      router.push("/(tabs)"); // Navigate to main page
    }
  };

  return (
    <EditLayout title="Business Class Membership">
      <View className="flex-1 justify-between gap-5">
        {/* Display Current Plan if Premium */}
        {isPremium ? (
          <View className="flex-row bg-[#F0F6FB] p-4 rounded-xl items-center justify-between">
            <View className="flex gap-2">
              <Text className="font-semibold">Current Plan</Text>
              <Text className="text-sm ">Validity</Text>
              <Text className="text-sm font-medium">
                1st December to 1st January
              </Text>
            </View>
            <View>
              <TouchableOpacity className="w-32 rounded-xl overflow-hidden border border-[#2983DC]">
                <View className="py-2 flex items-center justify-center bg-[#2983DC]">
                  <Text className="text-white font-semibold text-sm">
                    {selectedPlan.title}
                  </Text>
                </View>
                <View className="bg-[#F0F6FB] py-4 px-3 flex items-center">
                  <Text className="text-black font-bold text-lg mt-1">
                    {selectedPlan.price}/
                  </Text>
                  <Text className="text-gray-500 font-semibold text-sm mt-1">
                    Month
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex flex-row gap-4 items-start justify-center">
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePlanSelect(index)}
                className={`w-32 rounded-xl overflow-hidden ${
                  selectedPlan.title === plan.title
                    ? "border border-[#2983DC]"
                    : ""
                }`}
              >
                <View
                  className={`py-2 flex items-center justify-center ${
                    selectedPlan.title === plan.title
                      ? "bg-[#2983DC]"
                      : "bg-blue-300"
                  }`}
                >
                  <Text className="text-white font-semibold text-sm">
                    {plan.title}
                  </Text>
                </View>
                <View className="bg-[#F0F6FB] py-4 px-3 flex items-center">
                  <Text className="text-gray-600 font-medium text-sm">
                    {plan.duration}
                  </Text>
                  <Text className="text-black font-bold text-lg mt-1">
                    {plan.price}
                  </Text>
                  <Text className="text-gray-500 font-semibold text-sm mt-1">
                    {plan.weeklyRate}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Features Section */}
        <View className="flex flex-col gap-6 bg-[#F0F6FB] px-4 py-4">
          <View className="flex flex-row justify-between gap-1 items-center">
            <Text className="flex-1 font-bold text-gray-800">
              What's Included?
            </Text>
            <Text className="flex-1 text-center font-medium text-gray-800">
              Free
            </Text>
            <Text className="flex-1 text-center font-semibold text-gray-800">
              Business
            </Text>
          </View>
          {selectedPlan.features.map((item, index) => (
            <View
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <Text className="text-sm text-gray-800 flex-1">
                {item.feature}
              </Text>
              <Text className="text-sm font-semibold text-gray-800 text-center flex-1">
                {item.free}
              </Text>
              <Text className="text-sm text-[#2983DC] font-semibold text-center flex-1">
                {item.business === "Yes" ? (
                  <Ionicons
                    name="checkmark-done-outline"
                    color="#2983DC"
                    size={18}
                  />
                ) : (
                  item.business
                )}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer Section */}
        <View className="footer w-full">
          <CustomeButton
            background={isPremium}
            onButtonPress={handleSubscribe}
            title="Subscribe"
          />
        </View>
      </View>
    </EditLayout>
  );
};

export default SubscriptionPage;
