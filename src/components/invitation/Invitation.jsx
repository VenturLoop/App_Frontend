import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imagePath from "../../constants/imagePath";
import { router } from "expo-router";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import SubscriptionModel from "../models/SubscriptionModel";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";

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
];

const Invitation = () => {
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const { isPremium } = useSelector((state) => state.subscription);

  return (
    <>
      {messages.length > 0 ? (
        <View className="bg-gray-100 flex-1 px-4 py-4 ">
          <FlatList
            data={messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              if (!isPremium && index > 0) {
                // Non-premium users, show placeholder image for items after the first one
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setisPremiumModel(true);
                    }}
                    className="flex flex-col shadow  mb-6 rounded-lg bg-white"
                  >
                    <Image
                      resizeMode="cover"
                      source={imagePath.blurInvitationImage}
                      className="w-full h-50 rounded-lg"
                    />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  onPress={() => {
                    router.navigate("/(tabs)");
                  }}
                  className={`flex flex-col gap-4 mb-6 rounded-lg shadow-lg ${
                    index > 0 && !isPremium
                      ? "bg-gray-200 blur-3xl"
                      : "bg-white"
                  }`}
                >
                  {/* Header */}
                  <View className="flex flex-row border-b border-gray-200 px-4 py-3 items-center justify-between w-full">
                    <View className="flex flex-row gap-4 items-center">
                      <Image
                        className="w-12 h-12 rounded-xl"
                        resizeMode="cover"
                        source={imagePath.userImage2}
                      />
                      <View className="gap-0.5">
                        <Text
                          className={`text-xl font-semibold ${
                            index > 0 && !isPremium
                              ? "text-gray-400"
                              : "text-black"
                          }`}
                        >
                          {item.name}
                        </Text>
                        <View className="flex-row gap-1.5 items-center">
                          <FontAwesome6
                            size={12}
                            color="gray"
                            name="location-dot"
                          />
                          <Text
                            className={`text-sm font-medium ${
                              index > 0 && !isPremium
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
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
                          setisPremiumModel(true); // Prompt to upgrade
                        }
                      }}
                      className={`flex-row gap-2 items-center justify-center px-4 py-2 rounded-xl ${
                        index > 0 && !isPremium ? "bg-gray-300" : "bg-[#2983DC]"
                      }`}
                    >
                      <Ionicons
                        name="chatbox-ellipses-outline"
                        color={index > 0 && !isPremium ? "gray" : "white"}
                        size={18}
                      />
                      <Text
                        className={`${
                          index > 0 && !isPremium
                            ? "text-gray-500"
                            : "text-white"
                        } text-lg font-semibold`}
                      >
                        Chat
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Footer */}
                  <View className="w-full gap-2 pb-3 overflow-hidden px-4">
                    <View className="flex-row items-center gap-4">
                      <Ionicons name="walk-outline" size={20} color="#6B7280" />
                      <Text className="text-gray-700 text-sm leading-snug">
                        Ready to go full time with the right co-founder
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4  pt-2">
                      <Ionicons
                        name="briefcase-outline"
                        size={20}
                        color="#6B7280"
                      />
                      <Text className="text-gray-700 text-sm leading-snug">
                        Worked in a startup
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4 pt-2">
                      <Ionicons
                        name="accessibility-outline"
                        size={20}
                        color="#6B7280"
                      />
                      <Text className="text-gray-700 text-sm leading-snug">
                        Fully Negotiable
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {!isPremium && (
            <View className="bg-[#2983DC1C] flex-row items-center gap-4 rounded-xl px-3 py-3">
              <TouchableOpacity
                onPress={() => {
                  // setisPremiumModel(true);
                  router.navigate("/subscription_page");
                }}
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
            No invitation received yet!
          </Text>
        </View>
      )}
      <SubscriptionModel
        isModalVisible={isPremiumModel}
        handleModalVisibility={() => {
          setisPremiumModel(!isPremiumModel);
        }}
      />
    </>
  );
};

export default Invitation;
