import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TopNavar from "../../../components/buttons/TopNavar";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserModel from "../../../components/models/UserModel";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import UserInviteModel from "../../../components/models/UserInviteModel";
import { router, useFocusEffect } from "expo-router";
import SingleSubFeature from "../../../components/models/SingleSubFeature";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";
import ProfileIncompleteModel from "../../../components/models/ProfileIncompleteModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDataProfile } from "../../../api/profile";
import { setUser } from "../../../redux/slices/userSlice";
import imagePath from "../../../constants/imagePath";
import InvestroMatchingModel from "../../../components/models/InvestroMatchingModel";

// Sample Data for multiple users
const users = [
  {
    name: "Sequoia Capital",
    status: "Visit Website",
    location: "Bengaluru",
    mindset:
      "Sequoia Capital invests in early and growth-stage startups with innovative business models, focusing on technology, healthcare, and consumer brands.",
    experience: [
      {
        title: "Founder",
        company: "InnovateX",
        duration: "4 yrs",
        description: "A startup delivering cloud-based CRM solutions.",
      },
      {
        title: "Co-Founder",
        company: "DataHive",
        duration: "2 yrs",
        description: "A big data analytics company.",
      },
    ],
    projects: ["SaaS Platform", "Data Visualization Tool", "Mobile App Suite"],
  },
  {
    name: "Accel Partners",
    status: "Explore More",
    location: "New Delhi",
    mindset:
      "Accel backs entrepreneurs building world-class startups in the fields of e-commerce, SaaS, and deep tech.",
    experience: [
      {
        title: "CEO",
        company: "BrightBytes",
        duration: "5 yrs",
        description: "Education technology to optimize learning outcomes.",
      },
      {
        title: "Tech Lead",
        company: "NexonSoft",
        duration: "3 yrs",
        description: "Built scalable mobile applications.",
      },
    ],
    projects: [
      "EdTech Platform",
      "Payment Gateway",
      "Inventory Management System",
    ],
  },
  {
    name: "Tiger Global",
    status: "Invest Now",
    location: "Pune",
    mindset:
      "Tiger Global is committed to funding entrepreneurs in enterprise software, consumer apps, and financial services.",
    experience: [
      {
        title: "Startup Advisor",
        company: "LeanStartup",
        duration: "2 yrs",
        description: "Mentoring startups in lean methodologies.",
      },
      {
        title: "Product Manager",
        company: "TechnoSys",
        duration: "3 yrs 8 months",
        description: "Managed product roadmaps and feature releases.",
      },
    ],
    projects: ["B2B Marketplace", "Cloud Hosting Service", "IoT Integration"],
  },
  {
    name: "Matrix Partners",
    status: "Learn More",
    location: "Chennai",
    mindset:
      "Matrix Partners funds ambitious startups in consumer tech, fintech, and B2B marketplaces.",
    experience: [
      {
        title: "CTO",
        company: "NextGenTech",
        duration: "6 yrs",
        description: "Architecting tech solutions for enterprises.",
      },
      {
        title: "Engineer",
        company: "CodeWave",
        duration: "2 yrs",
        description: "Developed web applications for startups.",
      },
    ],
    projects: ["Custom CRM Tool", "Social Media Dashboard", "Gaming App"],
  },
  {
    name: "Lightspeed Venture Partners",
    status: "Visit Website",
    location: "Bangalore",
    mindset:
      "Lightspeed accelerates startups in AI, cloud computing, and e-commerce with deep focus on scalability.",
    experience: [
      {
        title: "Growth Strategist",
        company: "Boostify",
        duration: "4 yrs",
        description: "Scaled product growth strategies for tech startups.",
      },
      {
        title: "Analyst",
        company: "ThinkAnalytics",
        duration: "3 yrs",
        description: "Provided data-driven insights for business decisions.",
      },
    ],
    projects: ["Logistics Tracker", "Healthcare SaaS", "ChatBot API"],
  },
  {
    name: "Blume Ventures",
    status: "Explore More",
    location: "Hyderabad",
    mindset:
      "Blume Ventures is a multi-stage venture fund investing in high-growth startups in India, focusing on innovation and disruption.",
    experience: [
      {
        title: "Operations Head",
        company: "OptimaTech",
        duration: "5 yrs 3 months",
        description: "Streamlined operations and supply chain logistics.",
      },
      {
        title: "Founder",
        company: "StartNext",
        duration: "2 yrs",
        description: "Built a platform for budding entrepreneurs.",
      },
    ],
    projects: ["Crowdfunding Platform", "AI-Driven Insights", "Digital Wallet"],
  },
  {
    name: "Kalaari Capital",
    status: "Contact Us",
    location: "Kolkata",
    mindset:
      "Kalaari backs entrepreneurs who are solving unique challenges in healthcare, education, and AI.",
    experience: [
      {
        title: "Marketing Lead",
        company: "MarketGenix",
        duration: "4 yrs 6 months",
        description: "Led B2B marketing campaigns.",
      },
      {
        title: "Consultant",
        company: "StratEdge",
        duration: "3 yrs",
        description: "Advised startups on market strategies.",
      },
    ],
    projects: [
      "E-Learning Platform",
      "Subscription Box Service",
      "Smart Wearables",
    ],
  },
  {
    name: "Nexus Venture Partners",
    status: "Learn More",
    location: "Noida",
    mindset:
      "Nexus Venture Partners supports transformative startups in enterprise and consumer tech.",
    experience: [
      {
        title: "Developer",
        company: "CodeCraft",
        duration: "3 yrs 4 months",
        description: "Developed full-stack web applications.",
      },
      {
        title: "Product Designer",
        company: "InnoVision",
        duration: "2 yrs 9 months",
        description: "Designed innovative tech products.",
      },
    ],
    projects: [
      "HR Management Tool",
      "Online Shopping Platform",
      "Streaming Service",
    ],
  },
  {
    name: "Omnivore",
    status: "Connect",
    location: "Ahmedabad",
    mindset:
      "Omnivore invests in startups revolutionizing agriculture and food supply chains.",
    experience: [
      {
        title: "Research Analyst",
        company: "AgriTech Labs",
        duration: "2 yrs",
        description: "Conducted research on agricultural technologies.",
      },
      {
        title: "Founder",
        company: "FarmLogic",
        duration: "3 yrs 1 month",
        description: "Developed IoT solutions for farms.",
      },
    ],
    projects: [
      "Precision Farming",
      "Food Delivery App",
      "Smart Irrigation System",
    ],
  },
  {
    name: "Elevation Capital",
    status: "Visit Website",
    location: "Mumbai",
    mindset:
      "Elevation Capital seeds high-growth startups in healthcare, fintech, logistics & supply chain.",
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
];

// const users = [];

const investor_home = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isHomeModel, setisHomeModel] = useState(false);
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const [IncompleteProfileModel, setIncompleteProfileModel] = useState(true);
  const [incompleteProfile, setIncompleteProfile] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
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
  const toast = useToast();
  const scrollViewRef = useRef(null); // Reference to ScrollView
  const [translateX] = useState(new Animated.Value(0)); // Animation value

  const nextProfile = () => {
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

  const handle4thButtonPress = () => {
    if (attempts4th > 0) {
      toast.show("Connection requested ", {
        type: "info",
      });
      setAttempts4th(attempts4th - 1); // Decrease attempt count on press
      setTimeout(() => {
        nextProfile();
      }, [1000]);
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
    toast.show("Profile Skipped", {
      type: "danger",
    });
    nextProfile();
  };

  const handleBookmarkButtonPress = async () => {
    toast.show("Profile Saved", {
      type: "warning",
    });

    setTimeout(() => {
      nextProfile();
    }, [1000]);
  };

  const handlePreviousUser = () => {
    toast.show("Profile Reveresed", {
      type: "save",
    });
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
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user data from AsyncStorage and backend
  const handleUserData = async () => {
    const userId = await AsyncStorage.getItem("userLocalId");
    console.log(userId);

    try {
      setLoading(true); // Set loading to true when starting data fetching
      const result = await getUserDataProfile(userId);
      console.log(result);
      if (result.success) {
        dispatch(setUser(result.user)); // Update Redux state with user data
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  // Todo  : COmeplete model
  // Calculate profile completion percentage
  const isFieldCompleted = (field) => {
    return Array.isArray(field)
      ? field.length > 0
      : field && field.trim().length > 0;
  };

  const calculateProfileCompletion = (userProfile) => {
    console.log("UserProfile", userProfile);

    if (!userProfile || !userProfile.profile) return 0;

    const profileFields = [
      userProfile.name,
      userProfile.email,
      userProfile.profile.birthday,
      userProfile.profile.location,
      userProfile.profile.status,
      userProfile.profile.skillSet,
      userProfile.profile.industries,
      userProfile.profile.commitmentLevel,
      userProfile.profile.priorStartupExperience,
      userProfile.profile.equityExpectation,
      userProfile.profile.education,
      userProfile.profile.experience,
      userProfile.profile.projects,
    ];

    const completedFields = profileFields.filter(isFieldCompleted).length;
    return Math.round((completedFields / profileFields.length) * 100);
  };

  const { user } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     if (user) {
  //       const percentage = calculateProfileCompletion(user);
  //       console.log("Profile Completion:", percentage);
  //       setCompletionPercentage(percentage);

  //       if (percentage < 90) {
  //         // Profile incomplete, show modal
  //         setIsModalVisible(true);
  //         setIncompleteProfile(true);
  //       } else {
  //         // Profile complete, no modal needed
  //         setIsModalVisible(false);
  //         setIncompleteProfile(false);
  //       }
  //     }
  //   }, []); // Run when `user` data changes

  // Fetch user data when the page loads

  // Loader or content based on loading state

  const handleBlock = () => {
    setTimeout(() => {
      nextProfile();
    }, 500);
  };

  const handleReport = () => {
    setTimeout(() => {
      nextProfile();
    }, 500);
  };

  return (
    <>
      <SafeAreaView className="flex-1  justify-between   bg-white ">
        {/* Header */}
        <View className="header flex-row px-4  justify-between border-b border-gray-300 py-3 w-full items-center">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Explore investors</Text>
          </View>
          <View className="flex flex-row items-center gap-5">
            <TouchableOpacity
              className="p-2"
              onPress={() => {
                router.push("/investor_preferance");
              }}
            >
              <FontAwesome size={24} color="#2983DC" name="sliders" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/subscription_page");
              }}
              className="border-[0.5px] border-gray-400 rounded-full p-3"
            >
              <Image
                resizeMode="contain"
                className="w-6 h-6  "
                source={imagePath.current}
              />
              {/* <Ionicons name="flash" size={20} color="#2983DC" /> */}
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-screen flex-1 py-1  w-full">
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
                <View className="w-full flex gap-6">
                  {/* Header Section */}
                  <View className="flex flex-row justify-between  items-start">
                    <View className="flex flex-row gap-4 items-center">
                      <Image
                        className="w-20 h-20 rounded-xl"
                        resizeMode="contain"
                        source={imagePath.investorImage}
                      />
                      <View className="gap-2">
                        <Text className="text-xl font-bold text-gray-900">
                          {currentUser.name}
                        </Text>
                        <View className="bg-[#2983DC] py-1  rounded-full w-28">
                          <Text className="text-xs font-medium text-center text-white capitalize">
                            {currentUser.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Three-dot menu */}
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

                  {/* Basic Info Section */}
                  <View className="bg-white w-full border-[0.5px] border-gray-200 rounded-lg shadow-md px-6 py-5">
                    {/* Section Title */}
                    <Text className="text-gray-800 font-semibold text-base">
                      Who are they
                    </Text>

                    {/* Content */}
                    <Text className="text-gray-700 text-lg mt-2 leading-relaxed">
                      {currentUser.mindset}
                    </Text>
                  </View>
                </View>

                <View className="bg-white rounded-xl w-full shadow-md overflow-hidden">
                  {/* Top Section: Age and Location */}

                  {/* Investor Type */}
                  <View className="flex-row items-center justify-between border-b border-gray-200 py-4 px-4">
                    <Text className="text-black text-sm font-bold">
                      Investor Type
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Venture Capitalist
                    </Text>
                  </View>

                  {/* Check Size */}
                  <View className="flex-row items-center justify-between border-b border-gray-200 py-4 px-4">
                    <Text className="text-black text-sm font-bold">
                      Check Size
                    </Text>
                    <Text className="text-gray-600 text-sm">$100k - $1M</Text>
                  </View>

                  {/* Headquartered */}
                  <View className="flex-row items-center justify-between border-b border-gray-200 py-4 px-4">
                    <Text className="text-black text-sm font-bold">
                      Headquartered
                    </Text>
                    <Text className="text-gray-600 text-sm">India</Text>
                  </View>

                  {/* Investment Region */}
                  <View className="flex-row items-center justify-between py-4 px-4">
                    <Text className="text-black text-sm font-bold">
                      Investment Region
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      India, United States, France
                    </Text>
                  </View>
                </View>
                {/* Preferred Business Model */}
                <View className="bg-white py-5 px-6 rounded-xl shadow-md">
                  {/* Heading */}
                  <Text className="text-gray-800 font-semibold text-lg mb-4">
                    Preferred Business Model
                  </Text>

                  {/* Tags Container */}
                  <View className="flex-row flex-wrap gap-3">
                    {["B2B", "B2B2C", "B2C", "SaaS", "Subscription"].map(
                      (model, index) => (
                        <View
                          key={index}
                          className="bg-gray-50 border border-blue-300 px-4 py-2 rounded-full shadow-sm"
                        >
                          <Text className="text-gray-900 text-sm font-medium capitalize">
                            {model}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </View>

                {/* Interested Sector */}
                <View className="bg-white py-5 px-6 rounded-xl shadow-md mt-6">
                  {/* Heading */}
                  <Text className="text-gray-800 font-semibold text-lg mb-4">
                    Interested Sector
                  </Text>

                  {/* Tags Container */}
                  <View className="flex-row flex-wrap gap-3">
                    {[
                      "Agonistic",
                      "E-commerce",
                      "F & B",
                      "Quick Commerce",
                      "Retail",
                      "Hospitality",
                    ].map((sector, index) => (
                      <View
                        key={index}
                        className="bg-gray-50 border border-blue-300 px-4 py-2 rounded-full shadow-sm"
                      >
                        <Text className="text-gray-900 text-sm font-medium capitalize">
                          {sector}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Portfolio Startups */}
                <View className="p-6 bg-white rounded-xl shadow-lg mt-6 space-y-5">
                  {/* Heading */}
                  <Text className="text-gray-800 font-semibold text-lg">
                    Portfolio Startups
                  </Text>

                  {/* Experience List */}
                  {currentUser.experience.map((exp, index) => (
                    <View
                      key={index}
                      className={`flex-row gap-4 py-4 border-t ${
                        index === 0 ? "border-t-0" : "border-gray-200"
                      }`}
                    >
                      {/* Icon Container */}
                      <View className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                        <Ionicons
                          name="briefcase-outline"
                          size={28}
                          color="#2983DC"
                        />
                      </View>

                      {/* Experience Details */}
                      <View className="flex-1 space-y-2">
                        <Text className="text-gray-900 font-semibold text-base">
                          {exp.title}
                        </Text>
                        <Text className="text-gray-700 text-sm leading-relaxed">
                          {exp.description}
                        </Text>
                      </View>
                    </View>
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

        <View className="absolute bottom-0 pb-5 w-full items-center justify-center gap-10 flex-row px-6 z-10 space-x-4">
          {/* Premium Model Button */}
          {/* <TouchableOpacity
            disabled={currentUserIndex === 0}
            onPress={() => {
              isPremium ? handlePreviousUser() : setisPremiumModel(true);
            }}
            // onPress={handlePreviousUser}
            className="p-3 bg-white rounded-full disabled:opacity-50 border border-gray-300 shadow-md flex items-center justify-center"
          >
            <Ionicons name="refresh" size={27} color="#EEDE00" />
          </TouchableOpacity> */}

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
            {attempts4th >= 0 && !isPremium && (
              <View className="absolute top-[-5px] right-[-5px] bg-[#2983DC] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-xl">
                <Text className="text-white font-semibold text-sm">
                  {attempts4th}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* <Toast /> */}
      </SafeAreaView>
      <InvestroMatchingModel
        isModalVisible={isHomeModel}
        handleModalVisibility={() => {
          setisHomeModel(false);
        }}
        handleBlockFunction={handleBlock}
        handleReportFunction={handleReport}
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
          setisIncompleteProfileModel(false);
        }}
      />
      {/* <ProfileIncompleteModel
                isModalVisible={IncompleteProfileModel}
                handleModalVisibility={() => {
                  setIncompleteProfileModel(false);
                }}
                completionPercentage={completionPercentage}
                // calculateProfileCompletionForHom
              /> */}
    </>
  );
};

export default investor_home;
