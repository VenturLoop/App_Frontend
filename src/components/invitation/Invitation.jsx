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
// const messages = [];

const Invitation = () => {
  const [isPremiumModel, setisPremiumModel] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // Premium subscription state

  return (
    <>
      {messages.length > 0 ? (
        <View className="bg-gray-100 flex px-2 py-4 justify-between h-full ">
          <FlatList
            data={messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                className={`flex flex-col gap-5 px-4 py-3 mb-8 rounded-lg shadow ${
                  index > 0 && !isPremium ? "bg-gray-200 blur-3xl" : "bg-white"
                }`}
              >
                {/* Header */}
                <View className="flex flex-row justify-between w-full">
                  <View className="flex flex-row gap-4">
                    <Image
                      className="w-16 h-16 rounded-2xl"
                      resizeMode="contain"
                      source={imagePath.userImage2}
                    />
                    <View className="gap-1 flex items-start justify-center">
                      <Text
                        className={`text-xl font-semibold ${
                          index > 0 && !isPremium
                            ? "text-gray-400"
                            : "text-black"
                        }`}
                      >
                        {item.name}
                      </Text>
                      <View
                        className={`py-1 px-2 rounded-full ${
                          index > 0 && !isPremium
                            ? "bg-gray-300"
                            : "bg-[#2983DC]"
                        }`}
                      >
                        <Text
                          className={`text-center text-xs font-semibold ${
                            index > 0 && !isPremium
                              ? "text-gray-500"
                              : "text-white"
                          }`}
                        >
                          {item.lookingFor}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text className="text-gray-400 text-sm font-medium">
                    {item.time}
                  </Text>
                </View>

                {/* Footer */}
                <View className="w-full  flex-row justify-between items-center">
                  <View className="flex-row  gap-2">
                    <FontAwesome6 name="cake-candles" size={14} color="black" />

                    <Text
                      className={` font-medium ${
                        index > 0 && !isPremium ? "text-gray-400" : "text-black"
                      }`}
                    >
                      {item.dob.split("/")[0]}
                    </Text>
                  </View>
                  <View className="flex-row gap-2 justify-center items-center">
                    <FontAwesome6 size={14} name="location-dot" />
                    <Text
                      className={`  ${
                        index > 0 && !isPremium ? "text-gray-400" : "text-black"
                      }`}
                    >
                      {item.location}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (index === 0 || isPremium) {
                        router.push("/(message)/chat");
                      } else {
                        setisPremiumModel(true); // Prompt to upgrade
                      }
                    }}
                    className={`flex-row gap-1 items-center justify-center px-3 py-1.5 rounded-2xl ${
                      index > 0 && !isPremium ? "bg-gray-300" : "bg-[#2983DC]"
                    }`}
                  >
                    <Ionicons
                      name="chatbox-ellipses"
                      color={index > 0 && !isPremium ? "gray" : "white"}
                      size={17}
                    />
                    <Text
                      className={`${
                        index > 0 && !isPremium ? "text-gray-500" : "text-white"
                      }`}
                    >
                      Chat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View className="bg-[#2983DC1C]   flex-row items-center gap-4 rounded-xl px-3 py-3">
            <TouchableOpacity
              onPress={() => {
                setisPremiumModel(true);
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
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold">No invitation received yet!</Text>
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
