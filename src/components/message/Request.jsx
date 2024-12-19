import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import imagePath from "../../constants/imagePath";
import { router } from "expo-router";
import DeleteModel from "../models/DeleteModel";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "react-native-toast-notifications";

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
  const [isDeleteModel, setisDeleteModel] = useState(false);

  // Reset selectedRequests when the user navigates back or the component unmounts
  useFocusEffect(
    React.useCallback(() => {
      setSelectedRequests([]); // Clear selection on focus (page return)
    }, [])
  );

  const handleLongPress = (id) => {
    setSelectedRequests((prevSelectedRequests) => {
      // Toggle selection of the request
      if (prevSelectedRequests.includes(id)) {
        return prevSelectedRequests.filter((reqId) => reqId !== id);
      } else {
        return [...prevSelectedRequests, id];
      }
    });
  };

  const handleDelete = () => {
    setisDeleteModel(false);
    setSelectedRequests([]);
    Toast.show("Deleted Successfully", {
      type: "delete",
    });
    // handleNavigation("/");
  };

  return (
    <>
      {selectedRequests.length > 0 && (
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-lg font-bold">
            {selectedRequests.length} Selected
          </Text>
          <TouchableOpacity onPress={() => setisDeleteModel(true)}>
            <Ionicons name="trash-outline" color="red" size={23} />
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
                  selectedRequests.includes(item.id) ? "bg-blue-50" : "bg-white"
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

      <DeleteModel
        isModalVisible={isDeleteModel}
        handleModalVisibility={() => {
          setisDeleteModel(false);
        }}
        handleDeleteButton={handleDelete}
      />
    </>
  );
};

export default Request;
