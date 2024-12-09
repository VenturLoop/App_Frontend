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
import ProfileNav from "../../components/TabBar/profileNav";
const profile = () => {
  return (
    <SafeAreaView className="bg-[#F2F2F2] h-screen  flex-1 justify-between  items-center w-full ">
      <ProfileNav firstTab="Mt Profile" secondTab="Preview Profile"  />
      <FlatList></FlatList>
      <View></View>
      {/* <StatusBar  style="light" /> */}
    </SafeAreaView>
  );
};

export default profile;
