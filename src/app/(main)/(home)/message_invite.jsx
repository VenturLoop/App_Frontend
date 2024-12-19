import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import SingleSubFeature from "../../../components/models/SingleSubFeature";
import { useDispatch, useSelector } from "react-redux";
import { setSendMessage } from "../../../redux/slices/subscriptionSlice";
import { Toast } from "react-native-toast-notifications";

const MessageInvite = ({ route }) => {
  const user = route?.params?.user || {
    name: "Souptik Das",
    status: "Looking for Co-founder",
    avatar: "../../../assets/userImage2.png",
  };

  const [singleSubFeature, setSingleSubFeature] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState(3); // Track remaining messages
  const [inputMessage, setInputMessage] = useState(""); // Message input state
  const [confirmationMessage, setConfirmationMessage] = useState(""); // To display success or error message
  const { isPremium, sendMessage } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();

  // Reset the confirmation message after 3 seconds
  const resetConfirmationMessage = () => {
    setTimeout(() => {
      setConfirmationMessage(""); // Reset the message after a delay
    }, 3000);
  };

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      setConfirmationMessage("Please enter a valid message.");
      return;
    }

    if (sendMessage > 0) {
      // Dispatch a numeric value to update sendMessage
      dispatch(setSendMessage(sendMessage - 1)); // Decrease remaining messages
      Toast.show("Message Send", {
        type: "success",
      });
      router.back();
      setInputMessage(""); // Clear input field
    } else {
      setSingleSubFeature(true);
    }

    resetConfirmationMessage(); // Reset confirmation message after a delay
  };

  // Handle message input changes
  const handleInputChange = (message) => {
    setInputMessage(message);
  };

  // Handle upgrade action
  const handleUpgrade = () => {
    router.push("/subscription_page");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          on
        >
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-300">
            <View className="flex-row gap-4 items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={25} color="black" />
              </TouchableOpacity>
              <Text className="text-xl font-semibold">Direct Connect</Text>
            </View>
            <View className="px-4 py-2 rounded-xl bg-[#F0F6FB] flex-row items-center">
              <Text className="text-[#2983DC] font-medium">{sendMessage}</Text>
              <Text> Left</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Body */}
            <View className="flex-1 items-center justify-start px-5 py-5 gap-6">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  size={32}
                  name="paper-plane-outline"
                  color="#2983DC"
                />
                <Text className="text-lg font-semibold">
                  Triple your chances to connect
                </Text>
              </View>
              <Text className="text-xl font-medium text-gray-800 tracking-wider text-center">
                Stand out with a first impression. Send a message and see if
                it's a connection.
              </Text>

              {/* User Profile */}
              <View className="flex items-center gap-3 mt-6">
                <Image
                  className="w-24 h-24 rounded-2xl"
                  resizeMode="contain"
                  source={imagePath.userImage2}
                />
                <View className="items-center">
                  <Text className="text-2xl font-semibold">{user.name}</Text>
                  <Text className="bg-[#2983DC] text-white px-3 font-semibold text-center py-1 text-sm rounded-full mt-2">
                    {user.status}
                  </Text>
                </View>
              </View>

              {/* Message Input and Send Button */}
              <View className="w-full mt-6">
                <View
                  className={`flex-row border border-gray-300 rounded-full py-2 px-6 items-center`}
                >
                  <TextInput
                    placeholder="Your Message"
                    value={inputMessage}
                    onChangeText={handleInputChange}
                    className="flex-1 text-lg py-2 px-3 text-black bg-white rounded-md"
                    // autoFocus={true} // Keep focus on the input field
                  />
                  <TouchableOpacity onPress={handleSendMessage}>
                    {/* <Text className="text-xl font-semibold ml-4 text-[#2983DC]">
                      Send
                    </Text> */}
                    <Ionicons name="send" size={25} color="#2983DC" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Upgrade Section */}
            {!isPremium && (
              <View className="bg-[#2983DC1C] mx-4 my-4 flex-row items-center gap-5 rounded-xl px-4 py-3">
                <TouchableOpacity
                  onPress={handleUpgrade}
                  className="bg-[#2983DC] px-4 py-2 rounded-xl"
                >
                  <Text className="text-lg text-white font-semibold">
                    Upgrade
                  </Text>
                </TouchableOpacity>
                <Text className="text-lg font-medium text-gray-700">
                  to get 10 direct connects/day
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Modal for Single SubFeature */}
      <SingleSubFeature
        titleModel="Upgrade Pro to get 10 direct connects/day "
        isModalVisible={singleSubFeature}
        handleModalVisibility={() => setSingleSubFeature(!singleSubFeature)}
      />
    </>
  );
};

export default MessageInvite;
