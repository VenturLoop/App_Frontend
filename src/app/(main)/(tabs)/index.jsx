import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

import TopNavar from "../../../components/buttons/TopNavar";
import UserModel from "../../../components/models/UserModel";
import SubscriptionModel from "../../../components/models/SubscriptionModel";
import UserInviteModel from "../../../components/models/UserInviteModel";
import SingleSubFeature from "../../../components/models/SingleSubFeature";
import { getUserDataProfile } from "../../../api/profile";
import { setUser } from "../../../redux/slices/userSlice";
import imagePath from "../../../constants/imagePath";
import CircularProgress from "../../../components/loading/CircularProgress";

const ProfilePage = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isHomeModel, setIsHomeModel] = useState(false);
  const [isPremiumModel, setIsPremiumModel] = useState(false);
  const [isIncompleteProfileModel, setIsIncompleteProfileModel] =
    useState(true);
  const [isForthPremiumModel, setIsForthPremiumModel] = useState(false);
  const [isFifthPremiumModel, setIsFifthPremiumModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const scrollViewRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const toast = useToast();
  const { sendMessage } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.user);

  const users = []; // Sample Data

  const nextProfile = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;
    Animated.timing(translateX, {
      toValue: -400,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setCurrentUserIndex(nextIndex);
      translateX.setValue(200);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleUserData = async () => {
    const userId = await AsyncStorage.getItem("userLocalId");
    try {
      setLoading(true);
      const result = await getUserDataProfile(userId);
      if (result.success) {
        dispatch(setUser(result.user));
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const renderIncompleteProfileBanner = () => (
    <View className="w-full bg-white px-5 py-2 flex-row items-start gap-4">
      {/* <CircularProgress progress={20} /> */}
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-700">
          Complete your profile to get discovered and build your startup
        </Text>
        <TouchableOpacity className="flex-row items-center mt-2">
          <Text className="text-sm text-[#2983DC] font-medium">
            Finish setting up
          </Text>
          <Ionicons color="#2983DC" name="log-in-outline" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setIsIncompleteProfileModel(false)}>
        <Ionicons name="close-outline" size={24} color="#2983DC" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F0F6FB] items-center w-full">
      <TopNavar />
      <View className="flex-1 w-full">
        <View className="bg-[#64adf5] rounded-b-3xl py-1 items-center">
          {isIncompleteProfileModel && renderIncompleteProfileBanner()}
          <Text className="py-6 text-white font-bold text-3xl ">
            Are you building the next big thing?
          </Text>
        </View>
        <ScrollView ref={scrollViewRef} className="mt-6 px-5">
          <View className="flex-row gap-3 justify-between mb-4">
            <TouchableOpacity
              onPress={() => {
                router.push("/home_user");
              }}
              className="bg-[#FFD8C5] items-center justify-center gap-4 rounded-lg shadow-md p-4 flex-1"
            >
              <Text className="text-center px-4 font-extrabold text-lg">
                Find a co-founder
              </Text>
              <Image
                source={imagePath.cofounderblock}
                className="w-20 h-20"
                resizeMode="contain"
              />
              <Text className="text-center text-sm px-2 font-medium">
                Search for co-founder and early teammates to kickstart the
                journey
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/investor_home");
              }}
              className="bg-[#CDC3FF] items-center justify-center gap-7 rounded-lg shadow-md p-4 flex-1"
            >
              <Text className="text-center font-extrabold text-lg">
                Explore Investors
              </Text>
              <Image
                source={imagePath.investorblock}
                className="w-20 h-20"
                resizeMode="cover"
              />
              <Text className="text-center text-sm px-2 font-medium">
                Search for investors that fit best for your startup and vision
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#A6FFDE] rounded-xl shadow-md gap-4 px-6 py-4 flex flex-row justify-between  space-x-4">
            <View className="flex-1 py-2">
              <Text className="font-bold text-xl px-1 mb-2">
                Create your startup Profile
              </Text>
              <Text className="text-gray-600  text-sm px-2">
                Search for co-founder and early teammates to kickstart the
                journey
              </Text>
            </View>
            <View className="flex flex-col  items-center">
              <Image
                source={imagePath.startup}
                className="w-24 h-24"
                resizeMode="contain"
              />
              <TouchableOpacity className="mt-4">
                <Text className="text-white bg-gray-800 px-4 py-2 rounded-full text-center">
                  Coming soon
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <UserModel
        isModalVisible={isHomeModel}
        handleModalVisibility={() => setIsHomeModel(false)}
      />
      <SubscriptionModel
        isModalVisible={isPremiumModel}
        handleModalVisibility={() => setIsPremiumModel(false)}
      />
      <SingleSubFeature
        titleModel="Upgrade Pro to get unlimited connect request daily."
        isModalVisible={isForthPremiumModel}
        handleModalVisibility={() => setIsForthPremiumModel(false)}
      />
      <SingleSubFeature
        titleModel="Upgrade Pro to 10 direct connect/day"
        isModalVisible={isFifthPremiumModel}
        handleModalVisibility={() => setIsFifthPremiumModel(false)}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;
