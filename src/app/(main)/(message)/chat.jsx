import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import UserModel from "../../../components/models/UserModel";
import imagePath from "../../../constants/imagePath";

// Utility function to generate unique times
const generateTime = (offsetMinutes) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - offsetMinutes); // Subtract minutes for each message
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Chat = ({ route }) => {
  // Simulated user data
  const user = route?.params?.user || {
    name: "Souptik Das",
    status: "Active Now",
    avatar: "../../../assets/userImage2.png",
  };

  const [isSideModel, setIsSideModel] = useState(false);
  const [inputMessage, setInputMessage] = useState(""); // Message input state

  // Preload dummy messages into the state with unique times
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, how are you?",
      isSentByMe: false,
      time: "1:20 PM",
    },
    {
      id: 2,
      text: "I'm fine, what about you?",
      isSentByMe: true,
      time: "1:20 PM",
    },
    {
      id: 3,
      text: "Doing good too! What are you up to?",
      isSentByMe: false,
      time: "1:20 PM",
    },
    {
      id: 4,
      text: "Just working on some projects. 😊",
      isSentByMe: true,
      time: "1:20 PM",
    },
  ]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          text: inputMessage,
          isSentByMe: true,
          time: currentTime,
        },
      ]);
      setInputMessage(""); // Clear input field
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="header flex-row px-5 justify-between border-b border-gray-300 py-4 w-full items-center">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </TouchableOpacity>
            <View className="flex-row gap-3 items-center">
              <Image
                source={imagePath.userImage2} // Ensure correct image path
                className="w-12 h-12 rounded-full"
              />
              <View>
                <Text className="text-xl font-semibold">{user.name}</Text>
                <Text className="text-xs">{user.status}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsSideModel(true)}>
            <Ionicons name="ellipsis-vertical" color="black" size={25} />
          </TouchableOpacity>
        </View>

        {/* Chat Body */}
        <ScrollView
          className="flex-1 px-3 py-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`flex max-w-[80%] mb-2 ${
                message.isSentByMe
                  ? "self-end items-end"
                  : "self-start items-start"
              }`}
            >
              {/* Message Bubble */}
              <View
                className={`px-4 py-3.5  rounded-2xl ${
                  message.isSentByMe
                    ? "bg-[#2983DC] rounded-br-none"
                    : "bg-gray-100 border border-[#2983DC] rounded-bl-none"
                }`}
              >
                <Text
                  className={`text-base font-medium  ${
                    message.isSentByMe ? "text-white" : "text-slate-700"
                  }`}
                >
                  {message.text}
                </Text>
              </View>

              {/* Time and Icon */}
              <View className="flex-row mt-1 items-center gap-1">
                <Text
                  className={`text-xs ${
                    message.isSentByMe ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </Text>

                {/* Double Check Icon */}
                {message.isSentByMe && (
                  <Ionicons
                    name="checkmark-done-outline"
                    size={12}
                    color="#d1d5db"
                  />
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View className="footer my-4 px-5">
          <View className="flex-row border border-gray-400 rounded-full w-full justify-between py-2 px-4 items-center">
            <TextInput
              className="flex-1 text-base"
              placeholder="Your Message"
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity onPress={handleSendMessage} className="ml-2">
              <Text className="text-[#2983DC] font-semibold text-lg">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Modal */}
      <UserModel
        isModalVisible={isSideModel}
        handleModalVisibility={() => setIsSideModel(!isSideModel)}
      />
    </>
  );
};

export default Chat;
