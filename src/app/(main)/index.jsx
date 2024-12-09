import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import TopNavar from "../../components/buttons/TopNavar";

const index = () => {
  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen  flex-1 justify-between  items-center w-full ">
      <TopNavar />
      <FlatList></FlatList>
      <View></View>
      {/* <StatusBar  style="light" /> */}
    </SafeAreaView>
  );
};

export default index;
