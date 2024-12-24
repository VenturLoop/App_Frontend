import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-native-toast-notifications";

const investor_preferance = () => {
  const [userRole, setuserRole] = useState("co-founder");
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const dispatch = useDispatch();

  // Access the isPremium state from Redux store
  const { isPremium } = useSelector((state) => state.subscription);

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route);
    }, 10); // Wait for modal close animation before routing
  };

  const handleSaveButton = () => {
    Toast.show("Preferance added successfully", {
      type: "success",
    });
    router.back();
  };

  return (
    <>
      <EditLayout
        continueRoute="/(tabs)/profile"
        title="Edit Preferance"
        // secondTitle="Clear all"
      >
        {/* Form Section */}
        <View
          className="bg-white gap-2 flex-1"
          // contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
        >
          {/* Basic preferance */}
          <View className=" gap-5  mt-2  ">
            {/* Header */}
            <View className="flex flex-col gap-5 mx-2 px-2">
              <Text className="text-xl font-semibold ">Basic Preference</Text>
            </View>
            {/* Preferances */}
            <View className=" flex flex-col gap-4">
              {/* Skill set */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/a_geography");
                }}
                className="border-y-[0.5px] border-gray-300 py-2 mx-2 px-2 flex flex-row justify-between items-center "
              >
                <View className="gap-1">
                  <Text className="font-semibold">Geography</Text>
                  <Text className="text-sm font-normal text-gray-500">
                    Open to all
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              {/* Interests */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/b_stage");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Stage</Text>
                  <Text className="text-sm text-gray-500">Idea, Series A</Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              {/* Distance */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/c_business_model");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Business Model</Text>
                  <Text className="text-sm font-normal text-gray-500">
                    B2B, B2C
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              {/* Commitment Level */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/d_contact_chanal");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Contact Channel</Text>
                  <Text className="text-sm font-normal text-gray-500">
                    Email, Online form
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Premium preferance */}
          <View className=" mx-2 mt-2 ">
            <Text className="text-xl py-5 px-2 font-semibold ">
              Premium Preference
            </Text>

            {/* Age Range */}
            <TouchableOpacity
              onPress={() => {
                {
                  isPremium
                    ? handleNavigation("/e_investor_type")
                    : setisPremiumModel(true);
                }
              }}
              className="border-y-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Investor type</Text>
                <Text className="text-sm font-normal text-gray-500">All</Text>
              </View>
              {!isPremium ? (
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#2983DC"
                />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              )}
            </TouchableOpacity>

            {/* P S Experience  */}
            <TouchableOpacity
              onPress={() => {
                {
                  isPremium
                    ? handleNavigation("/f_preferance_sector")
                    : setisPremiumModel(true);
                }
              }}
              className="border-b-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Preferred sector</Text>
                <Text className="text-sm font-normal text-gray-500">All</Text>
              </View>
              {!isPremium ? (
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#2983DC"
                />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              )}
            </TouchableOpacity>

            {/* Equity exchenge */}
            <TouchableOpacity
              onPress={() => {
                {
                  isPremium
                    ? handleNavigation("/g_check_size")
                    : setisPremiumModel(true);
                }
              }}
              className="border-b-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Check Size</Text>
                <Text className="text-sm font-normal text-gray-500">₹</Text>
              </View>
              {!isPremium ? (
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#2983DC"
                />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              )}
            </TouchableOpacity>
            {/* Equity exchenge */}
            <TouchableOpacity
              onPress={() => {
                {
                  isPremium
                    ? handleNavigation("/h_investor_head")
                    : setisPremiumModel(true);
                }
              }}
              className="border-b-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Investor Headquarter</Text>
                <Text className="text-sm font-normal text-gray-500">All</Text>
              </View>
              {!isPremium ? (
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#2983DC"
                />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row bg-white justify-between gap-3 w-full mt-6 mb-2 space-x-4">
          {/* "Don't Have" Button */}
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="flex-1 border w-1/3 border-gray-100 rounded-lg py-3"
          >
            <Text className="text-center text-lg text-gray-700 font-medium">
              Cancel
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleSaveButton} // Call handleContinue function
            className={`flex-1 w-2/3 rounded-lg py-3  bg-[#2983DC]
              `} // Disable button if no referral code
          >
            <Text className="text-center text-lg text-white font-medium">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </EditLayout>
      <SubscriptionModel
        isModalVisible={isPremiumModel}
        handleModalVisibility={() => {
          setisPremiumModel(!isPremiumModel);
        }}
      />
    </>
  );
};

export default investor_preferance;
