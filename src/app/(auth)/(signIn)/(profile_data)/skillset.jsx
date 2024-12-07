import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";

const skillset = () => {
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
      <View className="header flex-row px-5 justify-between border-gray-500 border-b-[0.5px] py-4 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              resizeMode="contain"
              className="w-8 h-4"
              source={imagePath.back}
            />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Skill set</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">2/6</Text>
      </View>
      <View className="body w-full flex-1 py-3">
        <View className="flex flex-row flex-wrap gap-2 p-4">
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
                className={`text-md font-medium ${
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
            router.navigate("/your_intrest");
          }}
          title="Continue"
        />
      </View>
    </SafeAreaView>
  );
};

export default skillset;
