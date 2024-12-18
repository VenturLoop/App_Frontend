import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import imagePath from "../../constants/imagePath";

const initialMessages = [
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

const UserMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const handleLongPress = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((msgId) => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Messages",
      "Are you sure you want to delete the selected messages?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMessages(
              messages.filter(
                (message) => !selectedMessages.includes(message.id)
              )
            );
            setSelectedMessages([]);
          },
        },
      ]
    );
  };

  return (
    <>
      {selectedMessages.length > 0 && (
        <View className="flex-row items-center justify-between bg-gray-100 p-4">
          <Text className="text-lg font-bold">
            {selectedMessages.length} Selected
          </Text>
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {messages.length > 0 ? (
        <View className="bg-white rounded-t-lg w-full pt-4 px-4 h-full">
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  selectedMessages.length > 0
                    ? handleLongPress(item.id)
                    : router.push("/(message)/chat")
                }
                onLongPress={() => handleLongPress(item.id)}
                className={`flex-row items-center pb-7 p-4 border-b-[0.5px] ${
                  selectedMessages.includes(item.id)
                    ? "bg-gray-200"
                    : "bg-white"
                } border-gray-300 mb-3`}
              >
                <Image
                  source={imagePath.userImage2}
                  className="w-12 h-12 p-1 rounded-full shadow-sm mr-4"
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">{item.message}</Text>
                </View>
                <Text className="text-gray-400 text-sm">{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image
            source={{
              uri: "https://via.placeholder.com/150?text=No+Messages",
            }}
            className="w-40 h-40"
          />
          <Text className="font-semibold text-gray-500 mt-4">
            No messaging thread started yet
          </Text>
        </View>
      )}
    </>
  );
};

export default UserMessages;
