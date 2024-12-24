import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setPremium,
  resetSubscription,
} from "../../../redux/slices/subscriptionSlice";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "../../../constants/imagePath";
import HelpModel from "../../../components/models/HelpModel";
import { Toast } from "react-native-toast-notifications";

const notification = () => {
  return (
    <>
      <SafeAreaView className="flex-1  justify-between  bg-white ">
        {/* Header */}
        <View className="header flex-row px-6  justify-between border-b border-gray-300 py-5 w-full items-center">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={25} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Notification</Text>
          </View>

          {/* <TouchableOpacity>
            <FontAwesome6 size={25} name="headset" color="#2983DC" />
          </TouchableOpacity> */}
        </View>
        <View className="body w-full justify-between  py-3 flex-1 px-3 ">
          <View className="flex-1 justify-center  items-center">
            <Image source={imagePath.NoMessage} />
            <Text className="text-gray-500">
              No notification received yet !
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default notification;
