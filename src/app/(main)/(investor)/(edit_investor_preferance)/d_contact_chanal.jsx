import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { setSkillSet } from "../../../../redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { Toast } from "react-native-toast-notifications";

const d_contact_chanal = () => {
  const tags = [
   "Email",
  "Phone",
  "SMS/Text Message",
  "Live Chat",
  "Social Media (e.g., Facebook, Twitter, Instagram)",
  "Website Contact Form",
  "Video Call (e.g., Zoom, Google Meet)",
  "WhatsApp",
  "Support Ticket System",
  "In-person",
  "Forum/Community",
  "Help Center/Knowledge Base",
  "Postal Mail",
  "Messenger Apps (e.g., Telegram, Signal)",
  "Chatbots"
  ];
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  //   const handleSaveSkillsets = () => {
  //     if (!selectedTags) {
  //       Toast.show("Please Select an option", { type: "error" });
  //       return;
  //     }
  //     setLoading(true);
  //     Toast.show("Skillset Saved!", { type: "success" });
  //     setLoading(true);
  //     dispatch(setSkillSet(selectedTags)); // Dispatch action to store skillSet in Redux
  //     router.navigate("/your_intrest");

  //     setLoading(false);
  //   };

  const handleSaveSkillsets = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white  h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-gray-500 border-b-[0.5px] py-5 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Contact Channel</Text>
        </View>
      </View>
      <View className="body w-full flex-1 py-3">
        <View className="flex flex-row flex-wrap gap-2 p-4">
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              className={`px-4 py-2 my-1 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-blue-100 border-[#2983DC]"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-md  ${
                  selectedTags.includes(tag)
                    ? "text-[#2983DC] font-medium"
                    : "text-gray-600"
                }`}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleSaveSkillsets}
          title={loading ? <ActivityIndicator color="white" /> : "Save"}
        />
      </View>
    </SafeAreaView>
  );
};

export default d_contact_chanal;
