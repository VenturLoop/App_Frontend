import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imagePath from "../../constants/imagePath";
import { router } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import SubscriptionModel from "../models/SubscriptionModel";
import { BlurView } from "expo-blur";

const messages = [
  {
    id: 1,
    name: "Souptik Das",
    time: "1 Hour ago",
    lookingFor: "Looking for Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
  {
    id: 2,
    name: "Suraj Sai",
    time: "1 Hour ago",
    lookingFor: "Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
  {
    id: 3,
    name: "Atharva Tete",
    time: "1 Hour ago",
    lookingFor: "Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
  {
    id: 4,
    name: "Atharva Tete",
    time: "1 Hour ago",
    lookingFor: "Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
  {
    id: 5,
    name: "Atharva Tete",
    time: "1 Hour ago",
    lookingFor: "Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
];

// const messages = [];

const Invitation = () => {
  const [isPremiumModel, setIsPremiumModel] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // Premium subscription state

  return (
    <>
      {messages.length > 0 ? (
        <View className="bg-gray-100 flex px-4 py-4 justify-between h-full">
          <FlatList
            data={messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View className="flex flex-col mb-8 rounded-lg shadow overflow-hidden">
                {/* BlurView for non-premium users */}
                {!isPremium && index > 0 ? (
                  <BlurView intensity={20} tint="light">
                    <InvitationCard
                      item={item}
                      index={index}
                      isPremium={isPremium}
                      setIsPremiumModel={setIsPremiumModel}
                    />
                  </BlurView>
                ) : (
                  <InvitationCard
                    item={item}
                    index={index}
                    isPremium={isPremium}
                    setIsPremiumModel={setIsPremiumModel}
                  />
                )}
              </View>
            )}
          />
          {/* Upgrade Prompt */}
          {!isPremium && (
            <View className="bg-[#2983DC1C] flex-row items-center gap-4 rounded-xl px-3 py-3">
              <TouchableOpacity
                onPress={() => router.navigate("/subscription_page")}
                className="bg-[#2983DC] px-3 py-1.5 rounded-xl"
              >
                <Text className="text-lg tracking-widest text-white font-semibold">
                  Upgrade
                </Text>
              </TouchableOpacity>
              <Text className="text-lg tracking-wider font-medium">
                to view all your matches
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold text-lg text-gray-500">
            No invitation received yet !
          </Text>
        </View>
      )}
      <SubscriptionModel
        isModalVisible={isPremiumModel}
        handleModalVisibility={() => setIsPremiumModel(!isPremiumModel)}
      />
    </>
  );
};

const InvitationCard = ({ item, index, isPremium, setIsPremiumModel }) => (
  <View className="bg-white rounded-lg">
    {/* Header */}
    <View className="flex flex-row border-b border-gray-200 px-4 py-3 items-center justify-between w-full">
      <View className="flex items-start flex-row gap-4">
        <Image
          className="w-12 h-12 rounded-xl"
          resizeMode="cover"
          source={imagePath.userImage2}
        />
        <View className="gap-0.5 flex items-start justify-center">
          <Text className="text-xl font-semibold text-black">{item.name}</Text>
          <View className="flex-row gap-1.5 justify-center items-center">
            <FontAwesome6 size={12} color="gray" name="location-dot" />
            <Text className="text-sm font-medium text-gray-500">
              {item.location}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (index === 0 || isPremium) {
            router.push("/(message)/chat");
          } else {
            setIsPremiumModel(true); // Prompt to upgrade
          }
        }}
        className={`flex-row gap-1 items-center justify-center px-3 py-1 rounded-xl ${
          !isPremium && index > 0 ? "bg-gray-300" : "bg-[#2983DC]"
        }`}
      >
        <Ionicons
          name="chatbox-ellipses-outline"
          color={!isPremium && index > 0 ? "gray" : "white"}
          size={17}
        />
        <Text
          className={`${
            !isPremium && index > 0 ? "text-gray-500" : "text-white"
          } text-lg`}
        >
          Chat
        </Text>
      </TouchableOpacity>
    </View>

    {/* Content */}
    <View className="w-full gap-2 pb-3">
      <View className="flex-row items-center px-5 gap-4">
        <Ionicons name="walk-outline" size={20} color="#6B7280" />
        <Text className="text-gray-700 text-sm leading-snug">
          Ready to go full time with the right co-founder
        </Text>
      </View>
      <View className="flex-row items-center px-5 gap-4">
        <Ionicons name="briefcase-outline" size={20} color="#6B7280" />
        <Text className="text-gray-700 text-sm leading-snug">
          Worked in a startup
        </Text>
      </View>
      <View className="flex-row items-center px-5 gap-4">
        <Ionicons name="accessibility-outline" size={20} color="#6B7280" />
        <Text className="text-gray-700 text-sm leading-snug">
          Fully Negotiable
        </Text>
      </View>
    </View>
  </View>
);

export default Invitation;
