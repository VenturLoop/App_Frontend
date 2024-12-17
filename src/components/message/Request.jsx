import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imagePath from "../../constants/imagePath";
import { router } from "expo-router";

const requests = [
  {
    id: 1,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 hour ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "7 hours ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "12 hours ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 9,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 10,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 11,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 12,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 13,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 14,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 16,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 17,
    name: "Smit Patel",
    message: "Hi how are you?",
    time: "1 Day ago",
    image: "https://via.placeholder.com/50",
  },
];
// const requests = [];

const Request = () => {
  return (
    <>
      {requests.length > 0 ? (
        <View className=" bg-white rounded-t-lg w-full pt-4 px-4 h-full">
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push("/(message)/request");
                }}
                className="flex-row items-center pb-7  p-4 border-b-[0.5px] border-gray-300 mb-3 "
              >
                <Image
                  source={imagePath.userImage2}
                  className="w-12 h-12 p-1  rounded-full shadow-sm mr-4"
                  y
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold">{item.name}</Text>
                  <Text className="text-gray-500 text-sm  ">
                    {item.message}
                  </Text>
                </View>
                <Text className="text-gray-400 text-sm">{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold">
            No Direct connect request received yet !
          </Text>
        </View>
      )}
    </>
  );
};

export default Request;
