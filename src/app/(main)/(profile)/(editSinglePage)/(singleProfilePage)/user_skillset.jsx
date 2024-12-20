import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
// import CustomeButton from "../../../../components/buttons/CustomeButton";
// import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../../../components/buttons/CustomeButton";

const user_skillset = () => {
  const [selectedTags, setSelectedTags] = useState([""]);

  const tags = [
    "Web Developer",
    "App Developer",
    "Product",
    "Team Management",
    "Marketing",
    "Sales",
    "Finance",
    "Social Media",
    "Distribution",
    "Legal",
    "UI/UX Design",
    "Product Design",
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
      <View className="header flex-row px-5 justify-between border-gray-300 border-b-[0.5px] py-5 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Skill set</Text>
        </View>
        {/* <Text className="text-xl font-semibold text-[#2983DC]">2/6</Text> */}
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
          onButtonPress={() => {
            router.back();
          }}
          title="Save"
        />
      </View>
    </SafeAreaView>
  );
};

export default user_skillset;
