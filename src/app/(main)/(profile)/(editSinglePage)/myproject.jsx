import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import EditLayout from "../../../../components/ModelLayoul/EditLayout";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../../../redux/slices/profileSlice";

// FormInput Component
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
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.profile.projects); // Assuming `projects` holds the list of projects
  const [formData, setFormData] = useState({
    project_name: "",
    project_link: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle Text Input Changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const { project_name, project_link } = formData;
    if (!project_name || !project_link) {
      Toast.show("Please fill in all the details.", { type: "danger" });
      return false;
    }
    // Simple URL validation (can be enhanced further)
    const urlPattern =
      /^(https?:\/\/)?([\w\d\-]+\.)+[\w]{2,3}\/?([\w\d\-\/?=&%#]*)?$/;
    if (!urlPattern.test(project_link)) {
      Toast.show("Please enter a valid project link.", { type: "danger" });
      return false;
    }
    return true;
  };

  const handleSaveDetails = () => {
    if (!validateForm()) return;

    const { project_name, project_link } = formData;

    // Create a new project object
    const newProject = {
      project_name,
      project_link,
      startDate: new Date().toLocaleDateString(),
    };

    // Append new project to the existing list of projects
    setLoading(true);
    dispatch(setProjects([...projectData, newProject])); // Append to the current projects list

    // Simulate saving with a timeout
    setTimeout(() => {
      setLoading(false);
      Toast.show("Project added successfully!", { type: "success" });
      router.push("/edit_profile");
    }, 2000);
  };

  return (
    <EditLayout title="My Project">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            justifyContent: "space-between",
          }}
          className="py-6 px-3"
          keyboardShouldPersistTaps="handled"
        >
          {/* Project Title Input */}
          <FormInput
            label="Project Title"
            placeholder="Enter project title"
            value={formData.project_name}
            onChangeText={(text) => handleInputChange("project_name", text)}
          />

          {/* Project Link Input */}
          <FormInput
            label="Project Link"
            placeholder="Enter project link"
            value={formData.project_link}
            onChangeText={(text) => handleInputChange("project_link", text)}
          />
        </ScrollView>

        <View className="px-3 py-4">
          <CustomeButton
            onButtonPress={handleSaveDetails}
            title={loading ? <ActivityIndicator color="white" /> : "Save"}
          />
        </View>
      </KeyboardAvoidingView>
    </EditLayout>
  );
};

export default MyProject;
