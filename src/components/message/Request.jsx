import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import imagePath from "../../constants/imagePath";
import { router } from "expo-router";

const initialRequests = [
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
  // Add more requests here
];

const Request = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequests, setSelectedRequests] = useState([]);

  const handleLongPress = (id) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter((reqId) => reqId !== id));
    } else {
      setSelectedRequests([...selectedRequests, id]);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Requests",
      "Are you sure you want to delete the selected requests?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setRequests(
              requests.filter(
                (request) => !selectedRequests.includes(request.id)
              )
            );
            setSelectedRequests([]);
          },
        },
      ]
    );
  };

  return (
    <>
      {selectedRequests.length > 0 && (
        <View className="flex-row items-center justify-between bg-gray-100 p-4">
          <Text className="text-lg font-bold">
            {selectedRequests.length} Selected
          </Text>
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {requests.length > 0 ? (
        <View className="bg-white rounded-t-lg w-full pt-4 px-4 h-full">
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (selectedRequests.length > 0) {
                    handleLongPress(item.id);
                  } else {
                    router.push("/(message)/request");
                  }
                }}
                onLongPress={() => handleLongPress(item.id)}
                className={`flex-row items-center pb-7 p-4 border-b-[0.5px] ${
                  selectedRequests.includes(item.id)
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
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold text-gray-500 mt-4">
            No Direct connect request received yet!
          </Text>
        </View>
      )}
    </>
  );
};

export default Request;
