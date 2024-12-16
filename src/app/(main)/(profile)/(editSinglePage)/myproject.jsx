import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import EditLayout from "../../../../components/ModelLayoul/EditLayout";
import imagePath from "../../../../constants/imagePath";
import CustomeButton from "../../../../components/buttons/CustomeButton";

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  maxLength = 100,
  numberOfLines = 1,
}) => (
  <View className="mb-4">
    {label && <Text className="text-gray-700 mb-2 font-semibold">{label}</Text>}
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
      multiline={multiline}
      numberOfLines={numberOfLines}
      className="border border-gray-300 text-gray-500 font-medium rounded-lg p-3 bg-white"
    />
  </View>
);

const MyProject = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_link: "",
  });

  // Handle Text Input Changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <EditLayout
      title="My Project"
      saveButtonFunction={() => {}}
      saveButtonTitle="Save"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 15,
          }}
          className="bg-white p-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* Project Title Input */}
          <FormInput
            placeholder="Project Title"
            value={formData.project_name}
            onChangeText={(text) => handleInputChange("project_name", text)}
          />

          {/* Project Link Input */}
          <FormInput
            placeholder="Enter project link"
            value={formData.project_link}
            onChangeText={(text) => handleInputChange("project_link", text)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </EditLayout>
  );
};

export default MyProject;
