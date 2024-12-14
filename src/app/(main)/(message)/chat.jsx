import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import UserModel from "../../../components/models/UserModel";
import UserChat from "../../../components/message/UserChat"; // Ensure this exists
import imagePath from "../../../constants/imagePath";

const Chat = ({ route }) => {
  // Simulated user data (could come from route params or props)
  const user = route?.params?.user || {
    name: "Souptik Das",
    status: "Active Now",
    avatar: "../../../assets/userImage2.png",
  };

  const [isSideModel, setIsSideModel] = useState(false);
  const [messages, setMessages] = useState([]); // Chat messages state
  const [inputMessage, setInputMessage] = useState(""); // Message input state

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: inputMessage, isSentByMe: true },
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

        {/* Body */}
        <View className="body w-full py-3 flex-1 px-3">
          {messages.length > 0 ? (
            messages.map((message) => (
              <UserChat
                key={message.id}
                text={message.text}
                isSentByMe={message.isSentByMe}
              />
            ))
          ) : (
            <Text className="text-gray-400 text-center mt-4">
              No messages yet. Start the conversation!
            </Text>
          )}
        </View>

        {/* Footer */}
        <View className="footer my-4 px-5">
          <View className="flex-row border border-gray-400 rounded-full w-full justify-between py-2 px-6 items-center">
            <TextInput
              className="flex-1"
              placeholder="Your Message"
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Text className="text-gray-900 font-semibold text-lg">Send</Text>
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
