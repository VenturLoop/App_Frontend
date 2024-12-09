import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";

const EditProfile = () => {
  // Profile fields with initial values

  // Handle text input changes
  const handleInputChange = (id, newValue) => {
    setProfileFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  return (
    <EditLayout
      // continueRoute="/(tabs)/profile"
      title="Edit Profile"
      secondTitle="Save"
    >
      {/* Form Section */}
      <ScrollView
        className="bg-gray-100  gap-4 flex-1"
        // contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      >
        <View className="flex-1 items-center w-full bg-red-500">
          {/* Header Section */}
          <View className="bg-[#FFE1E1]  rounded-2xl py-4 w-full ">
            <View className=" flex-1 ">
              <Text className="text-2xl font-bold text-center text-gray-800">
                Complete Your Profile
              </Text>
              <Text className="text-sm text-center text-gray-600 mt-2">
                Fill in all the required details to proceed
              </Text>
            </View>
          </View>
          <View>
            <Text>gsd</Text>
          </View>
        </View>
      </ScrollView>
    </EditLayout>
  );
};

export default EditProfile;
