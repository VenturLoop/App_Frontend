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
import TopNavar from "../../../components/buttons/TopNavar";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import imagePath from "../../../constants/imagePath";
import UserModel from "../../../components/models/UserModel";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import UserInviteModel from "../../../components/models/UserInviteModel";
import { router } from "expo-router";

// Sample Data for multiple users
const users = [
  {
    name: "Atharv Kete",
    status: "Looking for Co-founder",
    location: "Mumbai",
    mindset: "I want to build something in the food industry",
    experience: [
      {
        title: "Founder",
        company: "TechX",
        duration: "3 yrs 6 months",
        description: "A tech startup focused on AI solutions.",
      },
      {
        title: "Co-Founder",
        company: "TechX",
        duration: "3 yrs 6 months",
        description: "A tech startup focused on AI solutions.",
      },
    ],
    projects: ["AI Chatbot", "Task Manager", "E-Commerce Platform"],
  },
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
  {
    name: "Suraj Patel",
    status: "Seeking Partnership",
    location: "Delhi",
    mindset: "I want to innovate in the retail space",
    experience: [
      {
        title: "CEO",
        company: "RetailHub",
        duration: "5 yrs",
        description: "Leading the future of retail technology.",
      },
    ],
    projects: ["Retail Management System", "Inventory Tracker"],
  },
];

const ProfilePage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isHomeModel, setisHomeModel] = useState(false);
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const [isIncompleteProfileModel, setisIncompleteProfileModel] =
    useState(false);

  const [translateX] = useState(new Animated.Value(0)); // Animation value

  const currentUser = users[currentUserIndex];

  const handleNextUser = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;

    // Trigger the swipe animation
    Animated.timing(translateX, {
      toValue: -400, // Move off screen to the left
      duration: 300, // Smooth transition
      useNativeDriver: true,
    }).start(() => {
      setCurrentUserIndex(nextIndex); // Update the user index
      translateX.setValue(400); // Reset position off-screen to the right

      // Animate the new user into view
      Animated.timing(translateX, {
        toValue: 0, // Bring to original position
        duration: 300, // Smooth transition
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePreviousUser = () => {
    const prevIndex = (currentUserIndex - 1 + users.length) % users.length; // Wrap-around logic for the index

    // Trigger the swipe animation
    Animated.timing(translateX, {
      toValue: 400, // Move off screen to the right
      duration: 300, // Smooth transition
      useNativeDriver: true,
    }).start(() => {
      setCurrentUserIndex(prevIndex); // Update the user index
      translateX.setValue(-400); // Reset position off-screen to the left

      // Animate the new user into view
      Animated.timing(translateX, {
        toValue: 0, // Bring to original position
        duration: 300, // Smooth transition
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <>
      <SafeAreaView className=" h-screen flex-1 justify-between items-center w-full">
        <TopNavar />
        <View className="   h-screen flex-1 w-full">
          {/* Profile Section */}
          <Animated.View
            style={{ transform: [{ translateX }] }} // Apply swipe animation
            className="p-4 items-center  border-b-[0.5px] border-gray-300"
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                // width: full,
                paddingBottom: 80,
                gap: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              className="w-full"
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
                  <TouchableOpacity
                    onPress={() => {
                      setisHomeModel(true);
                    }}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={28}
                      color="black"
                    />
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

              <View className="px-4 bg-white  rounded-2xl">
                <View className="flex-row border-b-[1.5px] px-5  pb-3  w-full justify-between items-center  border-gray-200">
                  <View className="flex-row border-r-[1.5px] w-1/3 pt-4  gap-2  border-gray-200 items-center">
                    <FontAwesome6 name="cake-candles" size={18} color="gray" />
                    {/* <Image source={imagePath.cake} className="w-6 h-6" /> */}
                    <Text className="   font-semibold text-gray-700">23</Text>
                  </View>

                  <View className="flex-row w-2/3 pt-4 justify-center items-center">
                    <Ionicons name="location" size={18} color="vlack" />
                    <Text className="ml-2 font-medium text-gray-700">
                      {currentUser.location}
                    </Text>
                  </View>
                </View>
                <View className="flex-row border-b-[1.5px] justify-start items-center border-gray-200   py-3 w-full  gap-5">
                  <Ionicons name="walk-outline" size={20} />
                  <Text className=" text-start font-medium text-gray-700 w-3/4 ">
                    Ready to go full time with the right co-founder
                  </Text>
                </View>
                <View className="flex-row border-b-[1.5px] justify-start items-center border-gray-200   py-4 w-full  gap-5">
                  <Ionicons name="bag-handle-outline" size={20} />
                  <Text className=" text-start font-medium text-gray-700 w-3/4 ">
                    Worked in a startup
                  </Text>
                </View>

                <View className="flex-row  justify-start items-center py-4 w-full  gap-5">
                  <Ionicons name="accessibility-outline" size={20} />
                  <Text className=" text-start font-medium text-gray-700 w-3/4 ">
                    Fully Negotiable
                  </Text>
                </View>
              </View>

              <View className="bg-white py-3 px-4 rounded-xl ">
                {/* Heading */}
                <Text className="text-gray-600  font-semibold mb-4">
                  I’m interested in
                </Text>

                {/* Tags Container */}
                <View className="flex-row flex-wrap gap-3">
                  {/* Individual Tags */}
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    AI/ML
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Food & Beverages
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Retail
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    E-Commerce
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Quick Commerce
                  </Text>

                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Hospitality
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    SaaS
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Transportation
                  </Text>
                </View>
              </View>

              {/* My skills  */}
              <View className="px-4 py-3 bg-white rounded-xl">
                {/* Heading */}
                <Text className=" text-gray-600  font-semibold  mb-4">
                  My Skillset
                </Text>

                {/* Tags Container */}
                <View className="flex-row flex-wrap gap-3">
                  {/* Individual Tags */}
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Web Developer
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    App Developer
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Product
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Finance
                  </Text>

                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Sales
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Marketing
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    SaaS
                  </Text>
                  <Text className="px-4 py-1 border rounded-full text-gray-400 border-gray-300 text-sm">
                    Transportation
                  </Text>
                </View>
              </View>

              {/* My education */}
              <View className="gap-3 bg-white px-4 py-3 rounded-xl ">
                <Text className="text-gray-600  font-semibold">
                  My Education
                </Text>
                {/* Education bar */}
                <View className="flex flex-row border-b-[0.5px] py-4 border-gray-300">
                  <Image
                    className="w-16 h-16 border rounded-xl border-gray-200"
                    source={imagePath.userImage}
                  />
                  <View className="px-4 gap-1">
                    <Text className="text-gray-800 font-semibold">
                      Rajiv Gandhi Institute of Knowledge Technologies
                    </Text>
                    <Text className="text-sm text-gray-500 font-medium">
                      Bachelores in Technology - BTech
                    </Text>
                    <View className="flex flex-row gap-3">
                      <Text className="text-sm text-gray-500 font-medium">
                        Oct 2016-Dec 2020
                      </Text>
                      <Text className="text-sm text-gray-500 font-medium">
                        4 yrs 3 Months
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Experience */}
              <View className="p-4 bg-white py-3 pt-4 px-2  rounded-xl">
                <Text className="text-gray-600  pl-3 mb-3  font-semibold">
                  My Experience
                </Text>
                {currentUser.experience.map((exp, index) => (
                  <View
                    key={index}
                    className="border-y-[0.5px] px-3 border-gray-200 py-5"
                  >
                    <View className="flex-row gap-5 items-start mb-2">
                      <View className="bg-[#F0F6FB]  p-3 rounded-xl  ">
                        <Ionicons
                          name="bag-handle-outline"
                          size={20}
                          color="#2983DC"
                        />
                      </View>
                      <View>
                        <Text className="text-gray-800 font-bold">
                          {exp.title}
                        </Text>
                        <Text className=" text-sm font-semibold text-gray-600">
                          {exp.company}
                        </Text>
                        <View className="flex-row pt-0.5 gap-3">
                          <Text className="text-xs font-medium text-gray-500">
                            Oct 2020-Present
                          </Text>
                          <Text className="text-xs font-medium text-gray-500">
                            {exp.duration}
                          </Text>
                        </View>
                        <Text className=" text-sm text-gray-700 mt-1">
                          {exp.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Projects */}
              {/* Projects */}
              <View className="bg-white rounded-xl py-4 px-4">
                <Text className="font-semibold text-gray-600 px-2  mb-4">
                  My Projects
                </Text>
                {currentUser.projects.map((project, index) => (
                  <TouchableOpacity
                    key={index} // Add a key to prevent React warnings
                    className="border-y-[0.5px] py-5 flex-row justify-between items-center border-gray-300"
                  >
                    <View className="gap-1 px-2">
                      <Text className="text-gray-700 font-semibold">
                        {project}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>

        <View className="absolute bottom-0 pb-3  shadow-  w-full items-center justify-between flex-row px-6 z-10">
          {/* Other buttons */}
          <TouchableOpacity
            // onPress={handlePreviousUser}
            onPress={() => {
              setisPremiumModel(true);
            }}
            className="p-3 bg-white rounded-full border-[0.5px] border-gray-300"
          >
            <Ionicons name="refresh" size={27} color="#EEDE00" />
          </TouchableOpacity>

          {/* Cross Button */}
          <TouchableOpacity
            onPress={handleNextUser}
            className="p-3  bg-white rounded-full border-[0.5px] border-gray-300"
          >
            <Ionicons size={35} name="close" color="#F2223A" />
          </TouchableOpacity>

          <TouchableOpacity className="p-3 bg-white rounded-full border-[0.5px] border-gray-300">
            <Ionicons name="bookmark-outline" size={27} color="#FD890C" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setisIncompleteProfileModel(!isIncompleteProfileModel);
            }}
            className="p-4 bg-white rounded-full border-[0.5px] border-gray-300"
          >
            <Ionicons size={28} name="person-add-outline" color="#2983DC" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.navigate("/message_invite");
            }}
            className="p-3 bg-white rounded-full border-[0.5px] border-gray-300"
          >
            <Ionicons size={25} name="paper-plane-outline" color="#2983DC" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <UserModel
        isModalVisible={isHomeModel}
        handleModalVisibility={() => {
          setisHomeModel(!isHomeModel);
        }}
      />
      <SubscriptionModel
        isModalVisible={isPremiumModel}
        handleModalVisibility={() => {
          setisPremiumModel(!isPremiumModel);
        }}
      />
      <UserInviteModel
        isModalVisible={isIncompleteProfileModel}
        handleModalVisibility={() => {
          setisIncompleteProfileModel(!isIncompleteProfileModel);
        }}
      />
    </>
  );
};

export default ProfilePage;
