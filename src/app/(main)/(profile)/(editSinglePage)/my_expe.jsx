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
import DateTimePicker from "@react-native-community/datetimepicker";
import imagePath from "../../../../constants/imagePath";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";

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

const CircularCheckbox = ({ isChecked, onPress }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center">
    <View
      className={`w-5 h-5 rounded-full border-2 mr-3 ${
        isChecked ? "border-[#2983DC] bg-[#2983DC]" : "border-gray-500"
      } flex items-center justify-center`}
    >
      {isChecked && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
    </View>
  </TouchableOpacity>
);

const MyExperience = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    company_name: "",
    isCurrentlyStudying: false,
    startDate: null,
    endDate: null,
    description: "",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    type: "",
    visible: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setFormData((prev) => ({
        ...prev,
        [showDatePicker.type]: date, // Save the Date object
      }));
    }
    setShowDatePicker({ type: "", visible: false });
  };

  const handleSaveDetails = () => {
    const { project_name, company_name, startDate, isCurrentlyStudying } =
      formData;

    if (
      !project_name ||
      !company_name ||
      !startDate ||
      // !endDate ||
      !isCurrentlyStudying
    ) {
      Toast.show("Please fill in all the details.", { type: "danger" });
      return;
    }

    // Save details logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show("Experience added successfully!", { type: "success" });
      router.push("/edit_profile");
    }, 2000);
  };

  return (
    <EditLayout title="My Experience">
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
          className="bg-white py-6 px-3"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-7  flex-1">
            {/* Title/Position Input */}
            <FormInput
              placeholder="Title/Position"
              value={formData.project_name}
              onChangeText={(text) => handleInputChange("project_name", text)}
            />

            {/* Company Name Input */}
            <FormInput
              placeholder="Company Name"
              value={formData.company_name}
              onChangeText={(text) => handleInputChange("company_name", text)}
            />

            {/* Currently Studying Checkbox */}
            <View className="flex-row items-center mb-4">
              <CircularCheckbox
                isChecked={formData.isCurrentlyStudying}
                onPress={() =>
                  handleInputChange(
                    "isCurrentlyStudying",
                    !formData.isCurrentlyStudying
                  )
                }
              />
              <Text className="text-gray-700 text-lg font-semibold">
                I’m currently working here
              </Text>
            </View>

            {/* Start Date Picker */}
            <View className="gap-4 w-full">
              <Text className="font-semibold text-lg">Starting Date</Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker({ type: "startDate", visible: true })
                }
                className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-sm placeholder:text-[#7C8BA0] px-6 rounded-lg py-4"
              >
                <Text
                  className={`text-md ${
                    formData.startDate ? "text-[#3B4054]" : "text-[#7C8BA0]"
                  }`}
                >
                  {formData.startDate
                    ? new Date(formData.startDate).toLocaleDateString("en-GB") // Format the date as DD/MM/YYYY
                    : "DD/MM/YYYY"}
                </Text>
                <Image source={imagePath.calender} />
              </TouchableOpacity>
            </View>

            {/* End Date Picker */}
            <View className="gap-4 w-full">
              <Text className="font-semibold text-lg">Ending Date</Text>
              <TouchableOpacity
                onPress={() =>
                  !formData.isCurrentlyStudying &&
                  setShowDatePicker({ type: "endDate", visible: true })
                }
                className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-sm placeholder:text-[#7C8BA0] px-6 rounded-lg py-4"
                disabled={formData.isCurrentlyStudying}
              >
                <Text
                  className={`text-md ${
                    formData.isCurrentlyStudying
                      ? "text-[#3B4054]"
                      : formData.endDate
                      ? "text-[#3B4054]"
                      : "text-[#7C8BA0]"
                  }`}
                >
                  {formData.isCurrentlyStudying
                    ? "Currently Studying"
                    : formData.endDate
                    ? new Date(formData.endDate).toLocaleDateString("en-GB") // Format the date as DD/MM/YYYY
                    : "DD/MM/YYYY"}
                </Text>
                <Image source={imagePath.calender} />
              </TouchableOpacity>
            </View>

            {/* DateTimePicker Modal */}
            {showDatePicker.visible && (
              <DateTimePicker
                value={formData[showDatePicker.type] || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}

            {/* Description Input */}
            <FormInput
              label="Description"
              placeholder="Add details about your experience"
              multiline
              maxLength={2000}
              numberOfLines={4}
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
            />
          </View>
          {/* Footer with Save Button */}
          <View className="">
            <CustomeButton
              onButtonPress={handleSaveDetails}
              title={loading ? <ActivityIndicator color="white" /> : "Save"}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </EditLayout>
  );
};

export default MyExperience;
