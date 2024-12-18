import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import React, { useRef, useState } from "react";
import TopNavar from "../../../components/buttons/TopNavar";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import imagePath from "../../../constants/imagePath";
import UserModel from "../../../components/models/UserModel";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import UserInviteModel from "../../../components/models/UserInviteModel";
import { router, useFocusEffect } from "expo-router";
import SingleSubFeature from "../../../components/models/SingleSubFeature";
import { useSelector } from "react-redux";

// Sample Data for multiple users
const users = [
  {
    name: "Atharv Tete",
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
    name: "Guarav Gaur",
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
    name: "Raj Rathod",
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
    name: "Kumar Sanu",
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
    name: "Tilak Varma",
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
    name: "Nitish Mishra",
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
    name: "Sanjay Sharma",
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
    name: "Sonali Pritam",
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
    name: "Gauri Raut",
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

// const users = [];

const ProfilePage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isHomeModel, setisHomeModel] = useState(false);
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const [isForthPremiumModel, setisForthPremiumModel] = useState(false);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [isFifthPremiumModel, setisFifthPremiumModel] = useState(false);

  const [isIncompleteProfileModel, setisIncompleteProfileModel] =
    useState(false);
  const [attempts3th, setAttempts3th] = useState(0); // Initial attempts for the 4th button
  const [attempts4th, setAttempts4th] = useState(users.length > 0 ? 10 : 0); // Initial attempts for the 4th button
  const [attempts5th, setAttempts5th] = useState(users.length > 0 ? 3 : 0); // Initial attempts for the 5th button
  // const router = useRouter();

  const { isPremium, sendMessage, planNumber } = useSelector(
    (state) => state.subscription
  );
  const scrollViewRef = useRef(null); // Reference to ScrollView
  const [translateX] = useState(new Animated.Value(0)); // Animation value

  const handle4thButtonPress = () => {
    if (attempts4th > 0) {
      setAttempts4th(attempts4th - 1); // Decrease attempt count on press
      handleNextUser();
    } else {
      setisForthPremiumModel(true);
    }
  };

  // Reset scroll position when the page is focused
  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const handle5thButtonPress = async () => {
    if (sendMessage > 0) {
      await router.push("/message_invite");
      // setAttempts5th(sendMessage - 1); // Decrease attempt count on press
      // handleNextUser();
    } else {
      setisFifthPremiumModel(true);
    }
  };

  const currentUser = users[currentUserIndex];

  const handleNextUser = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;

    setCurrentUserIndex(nextIndex);
    // Animate the current user off-screen to the left with easing
    Animated.timing(translateX, {
      toValue: -400, // Move off-screen to the left
      duration: 500, // Smooth and consistent duration
      easing: Easing.out(Easing.quad), // Smooth easing function
      useNativeDriver: true,
    }).start(() => {
      // Update the user index immediately after the first animation

      // Reset position off-screen to the right
      translateX.setValue(200);

      // Scroll to the top of the new user's content
      scrollViewRef.current?.scrollTo({ y: 0, animated: false }); // No delay for immediate reset

      // Animate the new user into view from the right with easing
      Animated.timing(translateX, {
        toValue: 0, // Bring to the center
        duration: 300, // Matching duration for balance
        easing: Easing.out(Easing.quad), // Smooth easing function
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBookmarkButtonPress = () => {
    // if (attempts3th > 0) {
    //   setAttempts4th(attempts4th - 1); // Decrease attempt count on press
    //   handleNextUser();
    // } else {
    //   setisForthPremiumModel(true);
    // }

    setAttempts3th(attempts3th + 1); // Decrease attempt count on press
    handleNextUser();
  };

  const handlePreviousUser = () => {
    const prevIndex = (currentUserIndex - 1 + users.length) % users.length; // Ensure it wraps around correctly
    setCurrentUserIndex(prevIndex);

    // Animate the current user off-screen to the right with easing
    Animated.timing(translateX, {
      toValue: 400, // Move off-screen to the right
      duration: 500, // Smooth and consistent duration
      easing: Easing.out(Easing.quad), // Smooth easing function
      useNativeDriver: true,
    }).start(() => {
      // Update the user index immediately after the first animation

      // Reset position off-screen to the left
      translateX.setValue(-400);

      // Scroll to the top of the new user's content
      scrollViewRef.current?.scrollTo({ y: 0, animated: false }); // No delay for immediate reset

      // Animate the new user into view from the left with easing
      Animated.timing(translateX, {
        toValue: 0, // Bring to the center
        duration: 300, // Matching duration for balance
        easing: Easing.out(Easing.quad), // Smooth easing function
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <>
      <SafeAreaView className="h-screen flex-1 bg-[#F0F6FB] items-center w-full">
        <TopNavar />
        <View className="h-screen flex-1 w-full">
          {users.length > 0 ? (
            <Animated.View
              style={{ transform: [{ translateX }] }} // Apply swipe animation
              className="px-4 items-center border-b-[0.5px] border-gray-300"
            >
              <ScrollView
                ref={scrollViewRef} // Attach ref to ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 80,
                  gap: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
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

                <View className="bg-white rounded-2xl w-full  px-2 overflow-hidden">
                  {/* Top Section: Age and Location */}
                  <View className="flex-row border-b  border-gray-200">
                    {/* Age */}
                    <View className="flex-1 flex-row items-center  w-auto   justify-center border-r border-gray-200 py-3 gap-2">
                      <FontAwesome6
                        name="cake-candles"
                        size={15}
                        color="#6B7280"
                      />
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
                    <Ionicons
                      name="briefcase-outline"
                      size={22}
                      color="#6B7280"
                    />
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
                      <Ionicons
                        name="school-outline"
                        size={28}
                        color="#2983DC"
                      />
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
            </Animated.View>
          ) : (
            <View className="flex-1 px-4 items-center justify-center">
              <Image source={imagePath.NoSaved} />
              <Text className="font-semibold text-lg text-center text-gray-500">
                No more profiles found! either change your preference or try
                again tomorrow
              </Text>
            </View>
          )}
        </View>

        <View className="absolute bottom-0 pb-2 w-full items-center justify-between flex-row px-6 z-10 space-x-4">
          {/* Premium Model Button */}
          <TouchableOpacity
            disabled={currentUserIndex === 0}
            onPress={() => {
              isPremium ? handlePreviousUser() : setisPremiumModel(true);
            }}
            // onPress={handlePreviousUser}
            className="p-3 bg-white rounded-full disabled:opacity-50 border border-gray-300 shadow-md flex items-center justify-center"
          >
            <Ionicons name="refresh" size={27} color="#EEDE00" />
          </TouchableOpacity>

          {/* Cross Button */}
          <TouchableOpacity
            onPress={handleNextUser}
            className="p-3 bg-white rounded-full border border-gray-300 shadow-md flex items-center justify-center"
          >
            <Ionicons size={35} name="close" color="#F2223A" />
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            onPress={handleBookmarkButtonPress}
            className="p-3 bg-white rounded-full border border-gray-300 shadow-md flex items-center justify-center"
          >
            <Ionicons name="bookmark-outline" size={27} color="#FD890C" />
            {/* {attempts3th > 0 && (
              <View className="absolute top-[-5px] right-[-5px] bg-[#2983DC] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-xl">
                <Text className="text-white font-semibold text-sm">
                  {attempts3th}
                </Text>
              </View>
            )} */}
          </TouchableOpacity>

          {/* 4th Button with attempts counter */}
          <TouchableOpacity
            onPress={handle4thButtonPress}
            className="relative p-4 bg-white rounded-full border border-gray-300 shadow-xl flex items-center justify-center"
          >
            <Ionicons size={28} name="person-add-outline" color="#27C2BF" />

            {/* Attempts counter */}
            {attempts4th >= 0 && (
              <View className="absolute top-[-5px] right-[-5px] bg-[#2983DC] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-xl">
                <Text className="text-white font-semibold text-sm">
                  {attempts4th}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* 5th Button with attempts counter */}
          <TouchableOpacity
            onPress={handle5thButtonPress}
            className="relative p-4 bg-white rounded-full border border-gray-300 shadow-xl flex items-center justify-center"
          >
            <Ionicons size={23} name="paper-plane-outline" color="#2983DC" />

            {/* Attempts counter */}
            {sendMessage >= 0 && (
              <View className="absolute top-[-5px] right-[-5px] bg-[#2983DC] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-xl">
                <Text className="text-white font-semibold text-sm">
                  {sendMessage}
                </Text>
              </View>
            )}
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
          setisPremiumModel(false);
        }}
      />
      <SingleSubFeature
        titleModel="Upgrade Pro to get unlimited connect request daily."
        isModalVisible={isForthPremiumModel}
        handleModalVisibility={() => setisForthPremiumModel(false)}
      />
      <SingleSubFeature
        titleModel="Upgrade Pro to 10 direct connect/day "
        isModalVisible={isFifthPremiumModel}
        handleModalVisibility={() => setisFifthPremiumModel(false)}
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
