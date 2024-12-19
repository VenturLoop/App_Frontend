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

const prior_experience = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    { id: "1", label: "Sold a startup" },
    { id: "2", label: "Founded/Co-founded a company" },
    { id: "3", label: "Worked in a startup" },
    { id: "4", label: "Previous startup failed" },
    { id: "5", label: "No Prior startup experience" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white  h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] py-4 w-full  items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            Any Prior startup experience
          </Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">5/6</Text>
      </View>
      <View className="body w-full flex-1">
        <View className="flex flex-col  space-y-4 p-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelected(option.id)}
              className="flex py-3 flex-row items-center gap-3 space-x-2"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selected === option.id
                    ? "border-[#2983DC] bg-[#2983DC]"
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
            router.navigate("/equity_exceptation");
          }}
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
        />
      </View>
    </SafeAreaView>
  );
};

export default prior_experience;
