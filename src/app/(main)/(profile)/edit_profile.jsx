import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../../constants/imagePath";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

const EditProfile = () => {
  const [birthdate, setBirthdate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMindset, setisMindset] = useState("");
  // Profile fields with initial values
  const [formData, setformData] = useState({
    name: "",
    tag: "",
    bio: "",
    dob: "",
    location: "",
    lookingFor: [],
    skillset: [],
    commitmentLevel: "",
    interests: [],
    priorStartupExperience: [],
    equityExpectation: "",
  });

  // Handle text input changes
  const handleInputChange = (id, newValue) => {
    setProfileFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route);
    }, 10); // Wait for modal close animation before routing
  };

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString("en-GB"); // Formats as dd/mm/yyyy
      setBirthdate(formattedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <EditLayout
      // continueRoute="/(tabs)/profile"
      title="Edit Profile"
      secondTitle="Save"
    >
      {/* Form Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-gray-100  gap-4 flex-1"
        // contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      >
        <View className="flex-1 px-4 gap-8 bg-white items-center w-full ">
          {/* Header Section */}
          <View className="bg-[#FFE1E1] px-4  rounded-2xl py-4 w-full ">
            <View className=" flex flex-row gap-2 items-center  ">
              <Ionicons name="warning" size={26} color="#E31A31" />
              <Text className=" font-semibold">
                A complete profile is required to send or accept connection
                invite
              </Text>
            </View>
            <View className="flex flex-col gap-1.5 mt-2 px-3  p-4 rounded-md">
              <View className="flex flex-row items-start">
                <Text className="text-gray-600 mr-3">•</Text>
                <Text className="text-gray-600">Profile Photo is required</Text>
              </View>
              <View className="flex flex-row items-start">
                <Text className="text-gray-600 mr-3">•</Text>
                <Text className="text-gray-600">Mindset is required</Text>
              </View>
              <View className="flex flex-row items-start">
                <Text className="text-gray-600 mr-3">•</Text>
                <Text className="text-gray-600">
                  Basic details need to be filled
                </Text>
              </View>
            </View>
          </View>

          {/* Status bar */}
          <View className="w-full gap-3 ">
            <Text className="text-gray-400 font-semibold">My Status</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/editStatus");
              }}
              className="border-y-[0.5px] pr-3  font-semibold border-gray-300 py-4 flex flex-row justify-between items-center"
            >
              <Text className="text-gray-500 font-semibold">
                Looking for Co-founder
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#757575"
              />
            </TouchableOpacity>
          </View>

          {/* Basic Detail */}
          <View className="w-full gap-3">
            <Text className="text-gray-400 font-semibold">Basic Details</Text>

            {/* first section */}
            <View className="gap-5 border-t-[0.5px] border-gray-300 py-4 ">
              {/* Profile image */}
              <Text className="text-gray-500 font-semibold">Profile photo</Text>
              <View className=" flex flex-row gap-7 justify-start items-center ">
                <Image
                  source={imagePath.userImage}
                  className="w-24 h-24 rounded-xl"
                />
                <TouchableOpacity className="border-[0.5px] p-3 border-[#2983DC] rounded-xl">
                  <Text className="font-medium text-gray-800">Edit Photo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Second Section */}
            <View className="gap-7 mt-2">
              {/* Name  */}
              <View className="gap-2">
                <Text className="text-gray-500 font-semibold">Name</Text>
                <TextInput
                  placeholder=""
                  className="bg-[#2982dc14] w-full text-gray-500 font-semibold px-6  py-4 rounded-xl "
                  keyboardType="email-address"
                  // Add value
                />
              </View>
              {/* Date of Birth */}
              <View>
                <View className="gap-4 w-full">
                  <Text className="text-gray-500 font-semibold">
                    Date of birth
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-sm placeholder:text-[#7C8BA0] px-6 rounded-lg py-4"
                  >
                    <Text
                      className={`text-md font-medium ${
                        birthdate ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {birthdate ? birthdate : "DD/MM/YYYY"}
                    </Text>
                    <Image source={imagePath.calender} />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={handleDateSelect}
                    />
                  )}
                </View>
              </View>
              {/* Mindset */}
              <View className=" gap-4 ">
                <Text className="text-gray-500 font-semibold">Mindset</Text>
                <TextInput
                  placeholder="Looking for Co-founder "
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  value={isMindset}
                  onChangeText={(text) => setisMindset(text)}
                  className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-[#7C8BA0] px-6 rounded-lg py-4 "
                />
              </View>
              {/* Warning text */}
              {isMindset === "" && (
                <Text className="text-red-600 font-normal">
                  Mindset section is mandatory for individuals looking for
                  co-founder for startup
                </Text>
              )}

              {/* Location */}
              <View className="gap-3">
                <Text className="text-gray-500 font-semibold">Location</Text>
                <TextInput
                  placeholder="Change location "
                  className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-4 rounded-lg p-2"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Third section */}
            <View className="gap-3 mt-4 ">
              <Text className="text-gray-500 font-semibold ">My Interest</Text>
              <View className="gap-3 ">
                {/* Choose sector */}
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/user_intrest");
                  }}
                  className="  border-y-[0.5px] py-3 justify-between items-center pr-2 flex flex-row border-gray-300"
                >
                  <View className="gap-1">
                    <Text className="text-gray-500 font-semibold">
                      Choose sector/industries
                    </Text>
                    <Text className="text-gray-400  text-sm ">
                      AR/VR, Advertising
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
                {/* My skillset */}
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/user_skillset");
                  }}
                  className="border-b-[0.5px] pb-3  justify-between items-center pr-2 flex flex-row border-gray-300"
                >
                  <View className="gap-1">
                    <Text className="text-gray-500 font-semibold">
                      My Skillset
                    </Text>
                    <Text className="text-gray-400  text-sm ">
                      Web developer, Marketing
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
                {/* Prior startup */}
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/user_expe");
                  }}
                  className="border-b-[0.5px] pb-3  justify-between items-center pr-2 flex flex-row border-gray-300"
                >
                  <View className="gap-1">
                    <Text className="text-gray-500 font-semibold">
                      Prior Startup experience
                    </Text>
                    <Text className="text-gray-400  text-sm ">
                      Ready to go full time with the right co founder
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
                {/* Commentment level */}
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/user_commitment");
                  }}
                  className="border-b-[0.5px] pb-2  justify-between items-center pr-2 flex flex-row border-gray-300"
                >
                  <View className="gap-1">
                    <Text className="text-gray-500 font-semibold">
                      Commitment Level
                    </Text>
                    <Text className="text-gray-400  text-sm ">
                      No prior startup experience
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
                {/* compensation expe */}
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/user_expectation");
                  }}
                  className="border-b-[0.5px] pb-2  justify-between items-center pr-2 flex flex-row border-gray-300"
                >
                  <View className="gap-1">
                    <Text className="text-gray-500 font-semibold">
                      Compensation Expectation
                    </Text>
                    <Text className="text-gray-400  text-sm ">Equaty</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#757575"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Fourth section */}
            <View className="gap-3 mt-5">
              <View className=" flex flex-row justify-between pr-2 items-center ">
                <Text className="text-gray-600  font-semibold">
                  My Education
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/education");
                  }}
                  className="flex flex-row font-semibold items-center justify-center"
                >
                  <Text className="text-[#2983DC] font-medium">Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Education bar */}
              <View className="flex flex-row border-y-[0.5px] py-4 border-gray-300">
                <Image className="w-16 h-16" source={imagePath.Eduimage} />
                <View className="px-4">
                  <Text className="text-gray-800 font-semibold">
                    Rajiv Gandhi Institute of Knowledge Technologies
                  </Text>
                  <Text className="text-sm text-gray-500 font-medium">
                    Bachelores in Technology - BTech
                  </Text>
                  <View className="flex flex-row gap-3">
                    <Text className="text-sm text-gray-500 font-medium">
                      Oct 2016-Dec 2020
                    </Text>
                    <Text className="text-sm text-gray-500 font-medium">
                      4 yrs 3 Months
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Fifth section */}
            <View className="gap-3 mt-5">
              <View className=" flex flex-row justify-between pr-2 items-center ">
                <Text className="text-gray-600  font-semibold">
                  My Experience
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/my_expe");
                  }}
                  className="flex flex-row font-semibold items-center justify-center"
                >
                  <Text className="text-[#2983DC] font-medium">Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Education bar */}
              <View className="flex flex-row border-y-[0.5px] py-4 border-gray-300">
                <Text className="text-gray-800 font-normal text-sm">
                  No Experience listed
                </Text>
              </View>
            </View>

            {/* sixth section */}
            <View className="gap-3 mt-5">
              <View className=" flex flex-row justify-between pr-2 items-center ">
                <Text className="text-gray-600  font-semibold">My Project</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleNavigation("/myproject");
                  }}
                  className="flex flex-row font-semibold items-center justify-center"
                >
                  <Text className="text-[#2983DC] font-medium">Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Education bar */}
              <View className="flex flex-row border-y-[0.5px] py-4 border-gray-300">
                <Text className="text-gray-800 font-normal text-sm">
                  No Project
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </EditLayout>
  );
};

export default EditProfile;
