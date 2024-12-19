import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-native-toast-notifications";

const edit_preferance = () => {
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
        secondTitle="Clear all"
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
              <View className="flex flex-col gap-2">
                <View className="flex mt-1 flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => {
                      setuserRole("co-founder");
                    }}
                    className={`${
                      userRole === "co-founder"
                        ? "bg-[#2983DC]"
                        : "bg-[#c0c0c033]"
                    } px-4  py-1.5 rounded-full `}
                  >
                    <Text
                      className={`${
                        userRole === "co-founder"
                          ? "text-white"
                          : "text-gray-600"
                      } font-medium `}
                    >
                      Co-Founder
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setuserRole("team-mates");
                    }}
                    className={`${
                      userRole === "team-mates"
                        ? "bg-[#2983DC]"
                        : "bg-[#c0c0c033]"
                    } px-4  py-1.5 rounded-full `}
                  >
                    <Text
                      className={`${
                        userRole === "team-mates"
                          ? "text-white"
                          : "text-gray-600"
                      } font-medium `}
                    >
                      Team Mates
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View className="flex  flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => {
                      setuserRole("start-up");
                    }}
                    className={`${
                      userRole === "start-up"
                        ? "bg-[#2983DC]"
                        : "bg-[#c0c0c033]"
                    } px-4  py-1.5 rounded-full `}
                  >
                    <Text
                      className={`${
                        userRole === "start-up" ? "text-white" : "text-gray-600"
                      } font-medium `}
                    >
                      Startup
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setuserRole("investor");
                    }}
                    className={`${
                      userRole === "investor"
                        ? "bg-[#2983DC]"
                        : "bg-[#c0c0c033]"
                    } px-4  py-1.5 rounded-full `}
                  >
                    <Text
                      className={`${
                        userRole === "investor" ? "text-white" : "text-gray-600"
                      } font-medium `}
                    >
                      Investor
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
            {/* Preferances */}
            <View className=" flex flex-col gap-4">
              {/* Skill set */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/skillset");
                }}
                className="border-y-[0.5px] border-gray-300 py-2 mx-2 px-2 flex flex-row justify-between items-center "
              >
                <View className="gap-1">
                  <Text className="font-semibold">Skill Set</Text>
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
                  handleNavigation("/editIntrest");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Interests</Text>
                  <Text className="text-sm text-gray-500">
                    AR/VR, Advertising
                  </Text>
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
                  handleNavigation("/distance");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Distance</Text>
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
              {/* Commitment Level */}
              <TouchableOpacity
                onPress={() => {
                  handleNavigation("/commitment_level");
                }}
                className=" border-b-[0.5px] border-gray-300 mx-2 px-2 flex flex-row justify-between items-center pb-2"
              >
                <View className="gap-1">
                  <Text className="font-semibold">Commitment Level</Text>
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
                    ? handleNavigation("/age_range")
                    : setisPremiumModel(true);
                }
              }}
              className="border-y-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Age Range</Text>
                <Text className="text-sm font-normal text-gray-500">
                  Open to all
                </Text>
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
                    ? handleNavigation("/p_experience")
                    : setisPremiumModel(true);
                }
              }}
              className="border-b-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Prior startup Experience</Text>
                <Text className="text-sm font-normal text-gray-500">
                  Open to all
                </Text>
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
                    ? handleNavigation("/p_equity_expectation")
                    : setisPremiumModel(true);
                }
              }}
              className="border-b-[0.5px] border-gray-300 py-3  px-2 flex flex-row justify-between items-center "
            >
              <View className="gap-1">
                <Text className="font-semibold">Equity expectation</Text>
                <Text className="text-sm font-normal text-gray-500">
                  Open to all
                </Text>
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

export default edit_preferance;
