import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const your_intrest = () => {
  const [selectedTags, setSelectedTags] = useState(["AI/ML", "Advertising"]);
  const [searchQuery, setSearchQuery] = useState("");

  const tags = [
    "AI/ML",
    "AR/VR",
    "Advertising",
    "Agritech",
    "Analysis",
    "AudioTech",
    "Auto Tech",
    "CleanTech",
    "Cloud Infrastructure",
    "F & B",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white  h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-500 py-4 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={()=>{router.back()}}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Interests</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">3/6</Text>
      </View>
      <View className="body w-full flex-1 px-6 p-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search interests"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="w-full bg-gray-100 border text-lg font-medium  border-gray-300 rounded-full px-4 py-3 my-4 text-gray-700"
        />

        {/* Tag List */}
        <View className="flex flex-row mt-4 flex-wrap gap-2">
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              className={`px-4 py-2 my-1 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm ${
                  selectedTags.includes(tag) ? "text-blue-500" : "text-gray-600"
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
          onButtonPress={() => {
            router.navigate("/commitment");
          }}
          title="Continue"
        />
      </View>
    </SafeAreaView>
  );
};

export default your_intrest;
