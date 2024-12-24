import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../constants/imagePath"; // Ensure this path is correct
import ProfileModel from "../models/ProfileModel"; // Ensure the ProfileModel is correctly defined and imported
import { router } from "expo-router"; // Ensure expo-router is set up correctly
import { useSelector } from "react-redux";
import DataSkeleton from "../loading/DataSkeleton"; // Ensure DataSkeleton component exists and works

const MyProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.user); // Ensure that user object is available in Redux store
  // console.log("auth", user.profile.status); // You may want to remove this if it's not needed

  const handleNext = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route); // Ensure that router is correctly working with expo-router
    }, 10); // Wait for modal close animation before routing
  };

  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [PageLoading, setPageLoading] = useState(false);

  if (PageLoading || !user) {
    return <DataSkeleton />; // Ensure DataSkeleton works and handles loading state correctly
  }

  return (
    <>
      <View className="flex-1 bg-[#F0F6FB] w-full px-1 pl-0.5 py-3 h-screen gap-10 items-center">
        {/* user Info view */}
        <View className="w-full px-2.5 gap-5">
          <View className="flex flex-row justify-between">
            <View className="flex flex-row gap-4">
              <Image
                className="w-16 h-16 rounded-2xl"
                resizeMode="contain"
                source={imagePath.userImage} // Ensure imagePath is correctly defined
              />
              <View className="gap-1">
                <Text className="text-2xl font-semibold">
                  {user.name || "Souptik Das"}
                </Text>
                <View className="bg-[#2983DC] py-1 rounded-full px-3">
                  <Text className="text-xs capitalize font-semibold text-white">
                    {/* {user.profile.status} */}
                  </Text>
                </View>
              </View>
            </View>
            {/* Three dot view */}
            <TouchableOpacity onPress={handleNext}>
              <Ionicons name="ellipsis-horizontal" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Basic info */}
          <View className="bg-white w-full gap-2 rounded-xl px-4 py-3">
            <Text className="font-semibold text-sm">My Mindset</Text>
            <Text className="font-medium text-xl tracking-widest text-start">
              {user.profile.mindset || "There is no mindset"}
            </Text>
          </View>
        </View>

        {/* Edit */}
        <View className="flex-1 gap-2 px-2.5">
          {/* Edit Profile */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_profile");
            }}
            className="flex-row border px-4 py-5 bg-slate-50 border-[#2983DC] rounded-2xl shadow-sm items-center justify-between"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#2983DC] p-3 rounded-full">
                <Ionicons
                  resizeMode="contain"
                  name="person-outline"
                  size={20}
                  color="white"
                />
              </View>
              <View className="gap-1">
                <Text className="font-semibold text-lg text-[#3B4054]">
                  Edit Profile
                </Text>
                <Text className="text-gray-600 text-sm">
                  How do you want your profile to be seen?
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>

          {/* Edit Co-founder Preferences */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_preference"); // Typo fixed here: 'edit_preference' instead of 'edit_preferance'
            }}
            className="flex-row border px-4 py-5 bg-slate-50 border-[#2983DC] rounded-2xl shadow-sm items-center justify-between mt-4"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#2983DC] p-3 rounded-full">
                <Ionicons
                  resizeMode="contain"
                  name="options-outline"
                  size={20}
                  color="white"
                />
              </View>
              <View className="gap-1 w-72">
                <Text className="font-semibold text-lg text-[#3B4054]">
                  Edit Co-founder Preferences
                </Text>
                <Text className="text-gray-500 text-sm">
                  Who do you want to see as potential co-founders?
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>

          {/* Edit Investor Preferences */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_investor_preferences"); // Typo fixed here: 'edit_investor_preferences'
            }}
            className="flex-row border px-4 py-5 bg-slate-50 border-[#2983DC] rounded-2xl shadow-sm items-center justify-between mt-4"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#2983DC] p-3 rounded-full">
                <Ionicons
                  resizeMode="contain"
                  name="options-outline"
                  size={20}
                  color="white"
                />
              </View>
              <View className="gap-1 w-72">
                <Text className="font-semibold text-lg text-[#3B4054]">
                  Edit Investor Preferences
                </Text>
                <Text className="text-gray-500 text-sm">
                  Who do you want to see as potential investors?
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>

          {/* Referral Rewards */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/referral_rewards"); // Typo fixed here: 'referral_rewards' instead of 'referal_rewards'
            }}
            className="flex-row border px-4 py-5 bg-slate-50 border-[#2983DC] rounded-2xl shadow-sm items-center justify-between mt-4"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-[#2983DC] p-3 rounded-full">
                <Ionicons
                  resizeMode="contain"
                  name="ticket-outline"
                  size={20}
                  color="white"
                />
              </View>
              <View className="gap-1">
                <Text className="font-semibold text-lg text-[#3B4054]">
                  Referral Rewards
                </Text>
                <Text className="text-gray-500 text-sm">
                  Invite your friends to VenturLoop
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>
        </View>

        {/* Login/Signup Modal */}
        <ProfileModel
          isModalVisible={isModalVisible}
          handleModalVisibility={() => {
            setModalVisible(false);
          }}
        />
      </View>
    </>
  );
};

export default MyProfile;
