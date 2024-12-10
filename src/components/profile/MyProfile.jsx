import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../constants/imagePath";
import ProfileModel from "../models/ProfileModel";
import { router } from "expo-router";

const MyProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNext = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route);
    }, 10); // Wait for modal close animation before routing
  };

  return (
    <>
      <View className="flex-1 gap-7 items-center">
        {/* user Info view */}
        <View className=" flex w-full gap-5">
          <View className=" flex flex-row  justify-between">
            <View className="flex flex-row  gap-4">
              <Image
                className="w-16 h-16 rounded-2xl "
                resizeMode="contain"
                source={imagePath.userImage}
              />
              <View className="gap-1">
                <Text className="text-2xl font-semibold">Souptik Das</Text>
                <View className="bg-[#2983DC] py-1 rounded-full px-3">
                  <Text className="text-xs font-semibold text-white">
                    Looking for Co-founder
                  </Text>
                </View>
              </View>
            </View>
            {/* Three dot view */}
            <TouchableOpacity onPress={handleNext}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={28}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full ">
            <View className="bg-white w-full gap-2  rounded-xl px-4 py-3 ">
              <Text className="font-semibold text-sm">My Mindset</Text>
              <Text className="font-medium text-xl tracking-widest text-start">
                I want to build something in the transportation industry
              </Text>
            </View>
          </View>
        </View>
        {/* Collection View */}
        <View className="w-full ">
          <Text className="text-sm font-medium">
            <Text className="font-semibold text-lg">500</Text> Connections
          </Text>
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-0.5 bg-[#2983DC]" />
          </View>
        </View>
        {/* Edit and referal view */}
        <View className="flex-1 gap-5  px-6">
          {/* Edit Profile */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_profile");
            }}
            className=" flex   flex-row border px-3  py-6  bg-gray-100  border-[#2983DC] shadow-sm rounded-2xl items-center gap-4"
          >
            <View className=" bg-[#2983DC] p-3 rounded-full ">
              <Ionicons
                resizeMode="contain"
                className="p-1 border  border-white rounded-lg"
                name="person-outline"
                size={12}
                color="white"
              />
            </View>
            <View className="gap-1">
              <Text className="font-semibold text-lg">Edit Profile</Text>
              <Text className="text-gray-600 text-md font-normal">
                How you want your profile to be seen?
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>
          {/* Edit preferances */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/edit_preferance");
            }}
            className=" flex   flex-row border px-3 justify-between  py-4  bg-gray-100  border-[#2983DC] shadow-sm rounded-2xl items-center  "
          >
            <View className="flex flex-row justify-center items-center gap-4">
              <View className=" bg-[#2983DC] items-center justify-center p-3 rounded-full  ">
                <Ionicons
                  resizeMode="contain"
                  className=" "
                  name="options-outline"
                  size={20}
                  color="white"
                />
              </View>
              <View className="gap-1 w-72  ">
                <Text className="font-semibold text-lg">Edit Preference</Text>
                <Text className="text-gray-600   font-normal">
                  Who do you want to see as potensial candidates
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#2983DC"
            />
          </TouchableOpacity>
          {/* Referal rewarads */}
          <TouchableOpacity
            onPress={() => {
              handleNavigation("/(profile)/referal_rewards");
            }}
            className=" flex   flex-row border px-3  py-6  bg-gray-100  border-[#2983DC] shadow-sm rounded-2xl items-center gap-4"
          >
            <View className=" bg-[#2983DC] p-3 rounded-full ">
              <Ionicons
                resizeMode="contain"
                name="ticket-outline"
                size={20}
                color="white"
              />
            </View>
            <View className="gap-1">
              <Text className="font-semibold text-lg">Referral Rewards</Text>
              <Text className="text-gray-600 text-md font-normal">
                Invite your friends to Tinder for startup
              </Text>
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
