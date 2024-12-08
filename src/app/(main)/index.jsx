import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import imagePath from "../../constants/imagePath";
import { FontAwesome } from "@expo/vector-icons";
import TopNavar from "../../components/buttons/TopNavar";

const index = () => {
  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen flex-1 justify-between  items-center w-full ">
      <TopNavar />
      <FlatList></FlatList>
      <View></View>
    </SafeAreaView>
  );
};

export default index;
