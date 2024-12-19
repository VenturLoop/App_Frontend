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
  ActivityIndicator,
} from "react-native";
import EditLayout from "../../../../components/ModelLayoul/EditLayout";
import imagePath from "../../../../constants/imagePath";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";

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
  const [loading, setLoading] = useState(false);

  // Handle Text Input Changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveDetails = () => {
    const { project_name, project_link } = formData;

    if (!project_name || !project_link) {
      Toast.show("Please fill in all the details.", { type: "danger" });
      return;
    }

    // Save details logic here
    setLoading(true);
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
          className=" py-6 px-3"
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
        <View className="">
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
