import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import the hook
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../constants/imagePath";
import DeleteModel from "../models/DeleteModel";

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
  const [isDeleteModel, setisDeleteModel] = useState(false);

  // Reset selectedMessages when the user navigates back or the component unmounts
  useFocusEffect(
    React.useCallback(() => {
      setSelectedMessages([]); // Clear the selection on focus (page return)
    }, [])
  );

  const handleLongPress = (id) => {
    setSelectedMessages((prevSelectedMessages) => {
      // Toggle selection of the message
      if (prevSelectedMessages.includes(id)) {
        return prevSelectedMessages.filter((msgId) => msgId !== id);
      } else {
        return [...prevSelectedMessages, id];
      }
    });
  };

  return (
    <>
      {selectedMessages.length > 0 && (
        <View className="flex-row items-center justify-between bg-gray-100 px-6 p-4">
          <Text className="text-lg font-bold">
            {selectedMessages.length} Selected
          </Text>
          <TouchableOpacity onPress={() => setisDeleteModel(true)}>
            <Ionicons name="trash-outline" color="red" size={23} />
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
                    : console.log("Navigate to chat page")
                }
                onLongPress={() => handleLongPress(item.id)}
                className={`flex-row items-center pb-7 p-4 border-b-[0.5px] ${
                  selectedMessages.includes(item.id) ? "bg-blue-50" : "bg-white"
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
            source={{ uri: "https://via.placeholder.com/150?text=No+Messages" }}
            className="w-40 h-40"
          />
          <Text className="font-semibold text-gray-500 mt-4">
            No messaging thread started yet
          </Text>
        </View>
      )}

      <DeleteModel
        isModalVisible={isDeleteModel}
        handleModalVisibility={() => setisDeleteModel(false)}
      />
    </>
  );
};

export default UserMessages;
