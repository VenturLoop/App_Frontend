import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import imagePath from "../../constants/imagePath";
import UserModel from "../models/UserModel";

// Sample Data for multiple users
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

const ProfilePage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const currentUser = users[currentUserIndex];
  const [isHomeModel, setisHomeModel] = useState(false);

  return (
    <>
      <View className=" h-screen  bg-[#F0F6FB] items-center w-full">
        {/* Profile Section */}
        <View className=" items-center  border-b-[0.5px] border-gray-300">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // width: full,
              paddingBottom: 80,
              gap: 20,
              paddingHorizontal: 10,
            }}
            className="w-full pt-3"
          >
            <View className=" flex  w-full gap-5">
              <View className=" flex flex-row  justify-between">
                <View className="flex flex-row  gap-4">
                  <Image
                    className="w-16 h-16 rounded-2xl "
                    resizeMode="contain"
                    source={imagePath.userImage2}
                  />
                  <View className="gap-1">
                    <Text className="text-2xl font-semibold">
                      {currentUser.name}
                    </Text>
                    <View className="bg-[#2983DC] py-1 rounded-full px-3">
                      <Text className="text-xs font-semibold text-white">
                        {currentUser.status}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Three dot view */}
              </View>

              {/* basic info */}
              <View className="bg-white w-full gap-2  rounded-xl px-4 py-3 ">
                <Text className="font-semibold text-sm">My Mindset</Text>
                <Text className="font-medium text-xl tracking-widest text-start">
                  {currentUser.mindset}
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl w-full  px-2 overflow-hidden">
              {/* Top Section: Age and Location */}
              <View className="flex-row border-b  border-gray-200">
                {/* Age */}
                <View className="flex-1 flex-row items-center  w-auto   justify-center border-r border-gray-200 py-3 gap-2">
                  <FontAwesome6 name="cake-candles" size={15} color="#6B7280" />
                  <Text className="text-gray-700 text-base font-semibold">
                    23
                  </Text>
                </View>
                {/* Location */}
                <View className=" w-2/3 flex-row items-center justify-start px-5 py-3 gap-2">
                  <Ionicons name="location" size={18} color="black" />
                  <Text className="text-gray-700 text-base font-medium">
                    {currentUser.location || "Kolkata"}
                  </Text>
                </View>
              </View>

              {/* Ready to go full time */}
              <View className="flex-row items-center border-b border-gray-200 py-4 px-5 gap-4">
                <Ionicons name="walk-outline" size={22} color="#6B7280" />
                <Text className="text-gray-700 text-sm font-medium leading-snug">
                  Ready to go full time with the right co-founder
                </Text>
              </View>

              {/* Worked in a startup */}
              <View className="flex-row items-center border-b border-gray-200 py-4 px-5 gap-4">
                <Ionicons name="briefcase-outline" size={22} color="#6B7280" />
                <Text className="text-gray-700 text-sm font-medium leading-snug">
                  Worked in a startup
                </Text>
              </View>

              {/* Fully Negotiable */}
              <View className="flex-row items-center py-4 px-5 gap-4">
                <Ionicons
                  name="accessibility-outline"
                  size={22}
                  color="#6B7280"
                />
                <Text className="text-gray-700 text-sm font-medium leading-snug">
                  Fully Negotiable
                </Text>
              </View>
            </View>

            <View className="bg-white py-4 px-5 rounded-2xl ">
              {/* Heading */}
              <Text className="text-gray-600 font-semibold text-lg mb-3">
                I’m interested in
              </Text>

              {/* Tags Container */}
              <View className="flex-row flex-wrap gap-3">
                {/* Individual Tags */}
                {[
                  "AI/ML",
                  "Food & Beverages",
                  "Retail",
                  "E-Commerce",
                  "Quick Commerce",
                  "Hospitality",
                  "SaaS",
                  "Transportation",
                ].map((tag, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 border border-blue-200 px-4 py-1.5 rounded-full"
                  >
                    <Text className="text-gray-600 text-sm font-medium">
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* My Skills */}
            <View className="bg-white py-4 px-5 rounded-2xl ">
              {/* Heading */}
              <Text className="text-gray-600 font-semibold text-lg mb-3">
                My Skillset
              </Text>

              {/* Tags Container */}
              <View className="flex-row flex-wrap gap-3">
                {[
                  "Web Developer",
                  "App Developer",
                  "Product",
                  "Finance",
                  "Sales",
                  "Marketing",
                  "SaaS",
                  "Transportation",
                ].map((skill, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 border border-blue-200 px-4 py-1.5 rounded-full"
                  >
                    <Text className="text-gray-700 text-sm font-medium">
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* My Education */}
            <View className="bg-white px-5 py-4 rounded-2xl gap-3  space-y-4">
              {/* Heading */}
              <Text className="text-gray-600 font-semibold text-lg mb-3">
                My Education
              </Text>

              {/* Education Bar */}
              <View className="flex-row   border-gray-200 pb-4 gap-4">
                {/* Icon Container */}
                <View className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                  <Ionicons name="school-outline" size={28} color="#2983DC" />
                </View>

                {/* Education Details */}
                <View className="flex-1 gap-0.5  space-y-1">
                  <Text className="text-gray-900 font-semibold leading-tight text-[15px]">
                    Rajiv Gandhi Institute of Knowledge Technologies
                  </Text>
                  <Text className="text-gray-600 text-sm font-medium">
                    Bachelor of Technology - BTech
                  </Text>
                  <View className="flex-row gap-3">
                    <Text className="text-gray-500 text-sm font-medium">
                      Oct 2016 - Dec 2020
                    </Text>
                    <Text className="text-gray-500 text-sm font-medium">
                      4 yrs 3 months
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* My Experience */}
            <View className="p-5 bg-white rounded-2xl  space-y-4">
              {/* Heading */}
              <Text className="text-gray-600 font-semibold text-lg mb-3">
                My Experience
              </Text>

              {/* Experience List */}
              {currentUser.experience.map((exp, index) => (
                <View
                  key={index}
                  className={`flex-row gap-4 py-5 border-t ${
                    index === 0 ? "border-t-0" : "border-gray-200"
                  }`}
                >
                  {/* Icon Container */}
                  <View className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                    <Ionicons
                      name="briefcase-outline"
                      size={25}
                      color="#2983DC"
                    />
                  </View>

                  {/* Experience Details */}
                  <View className="flex-1 space-y-1">
                    <Text className="text-gray-900 font-semibold text-[15px]">
                      {exp.title}
                    </Text>
                    <Text className="text-gray-600 text-sm font-medium">
                      {exp.company}
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <Text className="text-sm text-gray-500 font-medium">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </Text>
                      <Text className="text-sm text-gray-500 font-medium">
                        {exp.duration}
                      </Text>
                    </View>
                    <Text className="text-gray-700 text-sm leading-relaxed mt-1">
                      {exp.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Projects */}
            <View className="bg-white rounded-xl py-4 px-6 ">
              {/* Heading */}
              <Text className="text-gray-600 font-semibold text-lg mb-3">
                My Projects
              </Text>

              {/* Projects List */}
              {currentUser.projects.map((project, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row justify-between items-center py-4 px-4 rounded-lg mb-3 transition-all duration-300 
                         ${
                           index !== currentUser.projects.length - 1
                             ? "border-b border-gray-200"
                             : ""
                         } 
                         hover:bg-gray-50 hover:shadow-lg`}
                >
                  {/* Project Name */}
                  <View className="flex-1">
                    <Text className="text-gray-800 font-semibold ">
                      {project}
                    </Text>
                  </View>

                  {/* Icon */}
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <UserModel
        isModalVisible={isHomeModel}
        handleModalVisibility={() => {
          setisHomeModel(!isHomeModel);
        }}
      />
    </>
  );
};

export default ProfilePage;
