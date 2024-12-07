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

const what_your_status = () => {
  const [selected, setSelected] = useState("co-founder");

  const options = [
    { id: "co-founder", label: "Looking for a co-founder" },
    { id: "team-mates", label: "Looking for team Mates" },
    { id: "startups", label: "Looking for startups" },
    { id: "investors", label: "Looking for Investors" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white  h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-500 py-4 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={()=>router.back()}>
            <Image
              resizeMode="contain"
              className="w-8 h-4"
              source={imagePath.back}
            />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            What you are looking for?
          </Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">1/6</Text>
      </View>
      <View className="body w-full flex-1">
        <View className="flex flex-col  space-y-4 p-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelected(option.id)}
              className="flex py-2 flex-row items-center gap-3 space-x-2"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selected === option.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {selected === option.id && (
                  <View className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </View>
              <Text className=" text-lg tracking-wider text-black">
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={() => {
            router.navigate("/skillset");
          }}
          title="Continue"
        />
      </View>
    </SafeAreaView>
  );
};

export default what_your_status;
