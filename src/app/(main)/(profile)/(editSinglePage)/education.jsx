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
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { setEducation } from "../../../../redux/slices/profileSlice";

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

const Education = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    field_of_study: "",
    isCurrentlyStudying: false,
    startDate: null,
    endDate: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState({
    type: "",
    visible: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const formattedDate = date.toLocaleDateString("en-GB"); // Format the date as DD/MM/YYYY
      setFormData((prev) => ({
        ...prev,
        [showDatePicker.type]: formattedDate, // Save the formatted date as a string
      }));
    }
    setShowDatePicker({ type: "", visible: false });
  };

  const handleSaveDetails = () => {
    const {
      degree,
      institution,
      startDate,
      endDate,
      isCurrentlyStudying,
      field_of_study,
    } = formData;

    if (
      !degree ||
      !field_of_study ||
      !institution ||
      !startDate ||
      !isCurrentlyStudying
    ) {
      Toast.show("Please fill in all the details.", { type: "danger" });
      return;
    }

    // Dispatch to Redux
    const educationData = [
      {
        degree,
        institution,
        field_of_study,
        isCurrentlyStudying,
        startDate,
        endDate,
        description: formData.description,
      },
    ];

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(setEducation(educationData)); // Dispatch the action
      Toast.show("Education added successfully!", { type: "success" });
      router.push("/edit_profile");
    }, 2000);
  };

  return (
    <EditLayout title="My Education">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 15,
          }}
          className="bg-white py-4 px-3"
          keyboardShouldPersistTaps="handled"
        >
          <FormInput
            placeholder="Degree"
            value={formData.degree}
            onChangeText={(text) => handleInputChange("degree", text)}
          />

          <FormInput
            placeholder="School/College"
            value={formData.institution}
            onChangeText={(text) => handleInputChange("institution", text)}
          />
          <FormInput
            placeholder="Field of Study"
            value={formData.field_of_study}
            onChangeText={(text) => handleInputChange("field_of_study", text)}
          />

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
              I’m currently studying here
            </Text>
          </View>

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
                {formData.startDate ? formData.startDate : "DD/MM/YYYY"}
              </Text>
              <Image source={imagePath.calender} />
            </TouchableOpacity>
          </View>

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
                  ? formData.endDate
                  : "DD/MM/YYYY"}
              </Text>
              <Image source={imagePath.calender} />
            </TouchableOpacity>
          </View>

          {showDatePicker.visible && (
            <DateTimePicker
              value={
                formData[showDatePicker.type]
                  ? new Date(formData[showDatePicker.type])
                  : new Date()
              }
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          <FormInput
            label="Description"
            placeholder="Add details about your experience"
            multiline
            maxLength={2000}
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />

          <CustomeButton
            onButtonPress={handleSaveDetails}
            title={loading ? <ActivityIndicator color="white" /> : "Save"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </EditLayout>
  );
};

export default Education;
