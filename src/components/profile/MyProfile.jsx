import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../constants/imagePath";
import ProfileModel from "../models/ProfileModel";
import { router } from "expo-router";

const users = [
  {
    name: "Souptik Das",
    status: "Looking for Co-founder",
    location: "Kolkata",
    mindset: "I want to build something in the transportation industry",
    experience: [
      {
        title: "Co-Founder",
        company: "Amachie",
        duration: "4 yrs 2 months",
        description: "Maternal Care Platform",
      },
      {
        title: "Corporate Lead",
        company: "Dibex",
        duration: "2 yrs 3 months",
        description: "Digital first business service provider.",
      },
    ],
    projects: ["Weather App", "Calculator", "To Do List"],
  },
];

const MyProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNext = () => {
    setModalVisible(false);
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route);
    }, 10); // Wait for modal close animation before routing
  };
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const currentUser = users[currentUserIndex];

  return (
    <>
      <View
        // style={{ paddingBottom: 80, gap: 20, paddingHorizontal: 10 }}
        className="flex-1 bg-[#F0F6FB] w-full px-1 pl-0.5 py-3  h-screen gap-7 items-center"
      >
        {/* user Info view */}
        <View className="   w-full px-2.5 gap-5">
          <View className=" flex flex-row  justify-between">
            <View className="flex flex-row  gap-4">
              <Image
                className="w-16 h-16 rounded-2xl "
                resizeMode="contain"
                source={imagePath.userImage2}
              />
              <View className="gap-1">
                <Text className="text-2xl font-semibold">
                  {currentUser.name || "Souptik Das"}
                </Text>
                <View className="bg-[#2983DC] py-1 rounded-full px-3">
                  <Text className="text-xs font-semibold text-white">
                    {currentUser.status}
                  </Text>
                </View>
              </View>
            </View>
            {/* Three dot view */}
            <TouchableOpacity onPress={handleNext}>
              <Ionicons name="ellipsis-horizontal" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* basic info */}
          <View className="bg-white w-full gap-2  rounded-xl px-4 py-3 ">
            <Text className="font-semibold text-sm">My Mindset</Text>
            <Text className="font-medium text-xl tracking-widest text-start">
              {currentUser.mindset}
            </Text>
          </View>
        </View>
        {/* Collection View */}
        <View className="w-full px-2.5 ">
          <Text className="text-sm font-medium">
            <Text className="font-semibold text-lg">500</Text> Connections
          </Text>
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-0.5 bg-[#2983DC]" />
          </View>
        </View>

        {/* Edit */}
        <View className="flex-1 px-2.5 ">
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
                  How you want your profile to be seen?
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>

          {/* Edit Preferences */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_preferance");
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
                  Edit Preferences
                </Text>
                <Text className="text-gray-500 text-sm">
                  Who do you want to see as potential matches?
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
              handleNavigation("/(profile)/referal_rewards");
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
          handleModalVisibility={handleNext}
        />
      </View>
    </>
  );
};

export default MyProfile;
