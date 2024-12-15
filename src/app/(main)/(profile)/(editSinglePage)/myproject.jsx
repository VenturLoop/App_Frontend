import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../../components/ModelLayoul/EditLayout";
import DateTimePicker from "@react-native-community/datetimepicker";

const myproject = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_link: "",
  });

  // Handle Text Input Changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <EditLayout
        title="My Project"
        saveButtonFunction={() => {}}
        saveButtonTitle="Save"
      >
        <View className="flex-1 gap-5 bg-white p-6">
          {/* Degree Input */}
          <View className="mb-4">
            {/* <Text className="text-gray-700 mb-2 font-semibold">Degree</Text> */}
            <TextInput
              placeholder="Project Title"
              maxLength={100}
              value={formData.project_name}
              onChangeText={(text) => handleInputChange("project_name", text)}
              className="border border-gray-400 text-gray-500 font-medium rounded-lg p-3 bg-white"
            />
          </View>

          {/* School/College Input */}
          <View className="mb-4">
            <TextInput
              placeholder="Enter school/college name"
              maxLength={150}
              value={formData.project_link}
              onChangeText={(text) => handleInputChange("project_link", text)}
              className="border border-gray-400 text-gray-500 font-medium rounded-lg p-3 bg-white"
            />
          </View>
        </View>
      </EditLayout>
    </>
  );
};

export default myproject;
