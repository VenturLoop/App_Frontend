import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";

const plans = [
  {
    title: "Starter",
    duration: "1 Week",
    price: "₹100.00",
    weeklyRate: "₹100/Week",
    isRecommended: false,
    features: [
      { feature: "Priority Support", free: "-", business: "-" },
      { feature: "Unlimited Projects", free: "No", business: "Yes" },
      { feature: "Custom Domains", free: "No", business: "Yes" },
      { feature: "Advanced Analytics", free: "No", business: "Yes" },
      { feature: "Ad-Free Experience", free: "No", business: "Yes" },
      { feature: "Collaboration Tools", free: "No", business: "Yes" },
      { feature: "24/7 Support", free: "No", business: "Yes" },
    ],
  },
  {
    title: "Recommended",
    duration: "1 Month",
    price: "₹200.00",
    weeklyRate: "₹50/Week",
    isRecommended: true,
    features: [
      { feature: "Priority Support", free: "No", business: "Yes" },
      { feature: "Unlimited Projects", free: "No", business: "Yes" },
      { feature: "Custom Domains", free: "No", business: "Yes" },
      { feature: "Advanced Analytics", free: "No", business: "Yes" },
      { feature: "Ad-Free Experience", free: "-", business: "-" },
      { feature: "Collaboration Tools", free: "No", business: "Yes" },
      { feature: "24/7 Support", free: "No", business: "Yes" },
    ],
  },
  {
    title: "Super Saver",
    duration: "3 Months",
    price: "₹500.00",
    weeklyRate: "₹41/Week",
    isRecommended: false,
    features: [
      { feature: "Priority Support", free: "No", business: "Yes" },
      { feature: "Unlimited Projects", free: "No", business: "Yes" },
      { feature: "Custom Domains", free: "No", business: "Yes" },
      { feature: "Advanced Analytics", free: "No", business: "Yes" },
      { feature: "Ad-Free Experience", free: "No", business: "Yes" },
      { feature: "Collaboration Tools", free: "No", business: "Yes" },
      { feature: "24/7 Support", free: "-", business: "-" },
    ],
  },
];

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to "Recommended"

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <EditLayout
      buttonTitle="Subscribe"
      buttonRoute="/"
      title="Business Class Membership"
    >
      <View className="flex-1 pt-4 justify-between px-3 gap-5">
        {/* Pricing Plans */}
        <View className="flex flex-row gap-4 items-start justify-center">
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePlanSelect(plan)}
              className={`w-32 rounded-xl overflow-hidden  ${
                selectedPlan.title === plan.title
                  ? "border border-[#2983DC]"
                  : ""
              }`}
            >
              {/* Header Section */}
              <View
                className={`py-2 flex items-center justify-center ${
                  selectedPlan.title === plan.title
                    ? "bg-[#2983DC]"
                    : "bg-blue-300"
                }`}
              >
                <Text className="text-white  font-semibold text-sm">
                  {plan.title}
                </Text>
              </View>

              {/* Content Section */}
              <View className="bg-[#F0F6FB] py-4 px-3 flex items-center">
                <Text className="text-gray-600 font-medium text-sm">{plan.duration}</Text>
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

        {/* Features Section */}
        <View className="flex flex-col gap-6 bg-[#F0F6FB] px-2 py-4">
          <View className="flex flex-row justify-between  gap-1 items-center">
            <Text className="flex-1  font-bold text-gray-700">
              Whats Included?
            </Text>
            <Text className="flex-1 text-center font-medium text-gray-500">
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
              {/* Feature Name */}
              <Text className="text-sm text-gray-800 flex-1">
                {item.feature}
              </Text>

              {/* Free Plan Value */}
              <Text className="text-sm text-gray-800 text-center flex-1">
                {item.free}
              </Text>

              {/* Business Plan Value */}
              <Text className="text-sm text-[#2983DC] font-semibold text-center flex-1">
                {item.business}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer Section */}
        <View>
          <Text className="text-xs text-center text-gray-500 mt-4">
            By tapping subscribe, you will be charged. Your subscription will
            automatically renew for the same price and package length until you
            cancel via App Store/Play Store settings. By subscribing, you agree
            to our Terms & Conditions.
          </Text>
        </View>
      </View>
    </EditLayout>
  );
};

export default SubscriptionPage;
