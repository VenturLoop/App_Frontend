import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import UserModel from "../../../components/models/UserModel";
import { Toast } from "react-native-toast-notifications";

const Request = ({ route }) => {
  const user = route?.params?.user || {
    name: "Souptik Das",
    status: "Active Now",
    avatar: "../../../assets/userImage2.png",
  };

  const [messageRequest, setMessageRequest] = useState({
    status: "pending",
    sender: "Smit Patel",
    message: "Hi, I'd like to connect with you!",
    sentAt: "10:30 AM",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, what's up how are you?",
      time: "11:15 AM",
      isSentByMe: false,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isSideModel, setIsSideModel] = useState(false);

  // ScrollView reference
  const scrollViewRef = useRef();

  // Automatically scroll to the bottom when messages are updated
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Add a system message to the chat
  const addSystemMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, isSentByMe: false, time: "Now", isSystem: true },
    ]);
  };

  // Approve message request
  const handleApproveRequest = () => {
    setMessageRequest({ ...messageRequest, status: "approved" });
    Toast.show("Message request approved", { type: "success" });
  };

  // Decline message request
  const handleDeclineRequest = () => {
    setMessageRequest({ ...messageRequest, status: "declined" });
    Toast.show("Message request declined", { type: "danger" });
  };

  // Block the user
  const handleBlockUser = () => {
    setMessageRequest({ ...messageRequest, status: "blocked" });
    // addSystemMessage(`${messageRequest.sender} has been blocked.`);
    Toast.show("User blocked", { type: "danger" });
  };

  // Unblock the user
  const handleUnblockUser = () => {
    setMessageRequest({ ...messageRequest, status: "approved" });
    // addSystemMessage(`${messageRequest.sender} has been unblocked.`);
    Toast.show("User unblocked", { type: "success" });
  };

  // Send a new message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: inputMessage, isSentByMe: true, time: "Now" },
      ]);
      setInputMessage("");
    }
    if (messageRequest.status === "pending") {
      handleApproveRequest();
    }
  };

  const handleBlockUserSendMessage = () => {
    Toast.show("User is blocked, you can't send messages", { type: "error" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="header flex-row px-3 justify-between border-b border-gray-300 py-4 items-center">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)");
            }}
            className="flex-row px-2 justify-start gap-3 items-center"
          >
            <Image
              source={imagePath.userImage2}
              className="w-12 h-12 rounded-full"
            />
            <View>
              <Text className="text-xl font-semibold">{user.name}</Text>
              <Text className="text-xs">{user.status}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsSideModel(true)}>
          <Ionicons name="ellipsis-vertical" color="black" size={25} />
        </TouchableOpacity>
      </View>

      {/* Chat Body */}
      <View className="flex-1 px-3 py-3">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
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
              <View
                className={`px-4 py-3.5 rounded-2xl ${
                  message.isSentByMe
                    ? "bg-[#2983DC] rounded-br-none"
                    : message.isSystem
                    ? "bg-gray-300"
                    : "bg-gray-100 border border-[#2983DC] rounded-bl-none"
                }`}
              >
                <Text
                  className={`text-base font-medium ${
                    message.isSentByMe
                      ? "text-white"
                      : message.isSystem
                      ? "text-black"
                      : "text-slate-700"
                  }`}
                >
                  {message.text}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 mt-1">{message.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer Input */}
      <View className="px-4 gap-4 py-2">
        {messageRequest.status === "pending" && (
          <View className="bg-[#2983DC1C] rounded-lg gap-2 p-5 items-center">
            <Text className="font-semibold text-center mb-3">
              <Text className="text-lg font-bold">{messageRequest.sender}</Text>{" "}
              sent you a message request
            </Text>
            <View className="flex-row items-center justify-center gap-5">
              <TouchableOpacity
                className="bg-[#2983DC] px-5 py-2 rounded-lg"
                onPress={handleApproveRequest}
              >
                <Text className="text-white text-lg font-semibold">
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeclineRequest}>
                <Text className="text-[#2983DC] text-lg font-semibold">
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {messageRequest.status === "blocked" && (
          <View className="bg-[#2983DC1C] rounded-lg gap-2 p-5 items-center">
            <Text className="font-semibold text-center mb-3">
              <Text className="text-lg font-bold">{messageRequest.sender}</Text>{" "}
              is blocked
            </Text>
            <View className="flex-row items-center justify-center gap-5">
              <TouchableOpacity
                className="bg-[#2983DC] px-5 py-2 rounded-lg"
                onPress={handleUnblockUser}
              >
                <Text className="text-white text-lg font-semibold">
                  Unblock
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="flex-row border border-gray-400 rounded-full items-center px-4 py-2">
          <TextInput
            className="flex-1 text-base"
            placeholder="Your Message"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            // disabled={messageRequest.status === "blocked"}
            onPress={
              messageRequest.status === "blocked"
                ? handleBlockUserSendMessage
                : handleSendMessage
            }
            className="disabled:opacity-50"
          >
            <Ionicons name="send" size={28} color="#2983DC" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <UserModel
        isModalVisible={isSideModel}
        handleModalVisibility={() => setIsSideModel(!isSideModel)}
        handleBlockFunction={handleBlockUser}
      />
    </SafeAreaView>
  );
};

export default Request;
