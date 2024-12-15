import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import imagePath from "../../../constants/imagePath";

const message_invite = ({ route }) => {
  const user = route?.params?.user || {
    name: "Souptik Das",
    status: "Looking for Co-founder",
    avatar: "../../../assets/userImage2.png",
  };

  const [messagesLeft, setMessagesLeft] = useState(3); // Track remaining messages
  const [inputMessage, setInputMessage] = useState(""); // Message input state

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (messagesLeft > 0) {
      if (inputMessage.trim()) {
        // Simulating a successful message send
        Alert.alert(
          "Message Sent",
          `Your message to ${user.name} was sent successfully.`
        );
        setMessagesLeft((prev) => prev - 1); // Decrement the message count
        setInputMessage(""); // Clear input field
      } else {
        Alert.alert("Error", "Please enter a valid message.");
      }
    } else {
      Alert.alert(
        "Limit Reached",
        "You have used all your messages. Upgrade to send more."
      );
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
            <Text className="text-xl font-semibold">Direct Connect</Text>
          </View>
          <View className="px-4 py-2 rounded-xl bg-[#F0F6FB] flex-row items-center">
            <Text className="text-[#2983DC] font-medium">{messagesLeft}</Text>
            <Text> Left</Text>
          </View>
        </View>

        {/* Body */}
        <View className="body items-center gap-6 w-full px-4 py-3 flex-1">
          <View className="flex-row items-center gap-2">
            <Ionicons size={32} name="paper-plane-outline" color="#2983DC" />
            <Text className="text-lg font-semibold">
              Triple your chances to connect
            </Text>
          </View>
          <Text className="text-xl font-medium tracking-wider text-gray-800">
            Stand out with first impression. Send a message and see if it's a
            connection.
          </Text>
          <View className="flex items-center gap-3 mt-6 justify-between">
            <Image
              className="w-20 h-20 rounded-2xl"
              resizeMode="contain"
              source={imagePath.userImage2}
            />
            <View className="flex items-center justify-center gap-2">
              <Text className="text-2xl font-semibold">{user.name}</Text>
              <Text className="bg-[#2983DC] text-white px-3 font-semibold text-center py-1 text-sm rounded-full">
                {user.status}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View className="footer my-4 w-full mt-6">
            <View className="flex-row border border-gray-400 rounded-full w-full justify-between py-2 px-6 items-center">
              <TextInput
                className="flex-1"
                placeholder="Your Message"
                value={inputMessage}
                onChangeText={setInputMessage}
                editable={messagesLeft > 0} // Disable input if no messages left
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <Text
                  className={`text-xl font-semibold ${
                    messagesLeft > 0 ? "text-[#2983DC]" : "text-gray-400"
                  }`}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Upgrade Section */}
        <View className="bg-[#2983DC1C] m-4 flex-row items-center gap-4 rounded-xl px-3 py-3">
          <TouchableOpacity
            onPress={() => router.push("/subscription_page")}
            className="bg-[#2983DC] px-3 py-1.5 rounded-xl"
          >
            <Text className="text-lg tracking-widest text-white font-semibold">
              Upgrade
            </Text>
          </TouchableOpacity>
          <Text className="text-lg tracking-wider font-medium">
            to get 10 direct connect/day
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default message_invite;
