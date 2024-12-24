import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../../constants/imagePath";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import axios from "axios";
import {
  setBio,
  setBirthday,
  setUserLocation,
  setProfilePhoto,
} from "../../../redux/slices/profileSlice";
import { updateUser } from "../../../redux/slices/userSlice";
import { UpdateUserProfileInEditProfile } from "../../../api/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const [birthdate, setBirthdate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMindset, setisMindset] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState("");
  // Profile fields with initial values
  const [formData, setformData] = useState({
    name: "",
    tag: "",
    bio: "",
    dob: "",
    location: "",
    lookingFor: [],
    image: "",
    skillset: [],
    commitmentLevel: "",
    interests: [],
    priorStartupExperience: [],
    equityExpectation: "",
  });

  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const profileRedux = useSelector((state) => state.profile);
  const userRedux = useSelector((state) => state.user);
  const educationData = profileRedux.education;
  const experienceData = profileRedux.experience;

  console.log("profileRedux", profileRedux);
  // console.log("userRedux In Edit", userRedux);
  // console.log("userData", userData);
  // console.log("educationData", educationData);
  // console.log("experienceData", experienceData);

  const userData = userRedux?.user?.profile;

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
    }, 500); // Wait for modal close animation before routing
  };

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setLoadingLocation(false);
        return;
      }

      // Get current location
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      // Fetch city/state using Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your-email@example.com)", // Add your app's name and email here
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.address) {
        const { city, state, city_district, country } = data.address;
        dispatch(
          setUserLocation(
            `${city_district || ""}${city ? city : ""} ${state || ""} ${
              country || ""
            }`
          )
        );
      } else {
        console.log("Unable to fetch location details");
        setLocation("Unknown City, Unknown State");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString("en-GB"); // Formats as dd/mm/yyyy
      setBirthdate(formattedDate);
      dispatch(setBirthday(formattedDate));
    }
    setShowDatePicker(false);
  };

  // Function to pick an image from the file manager and upload it
  const pickImage = async () => {
    try {
      // Request permission to access the media library
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Camera roll permissions are required to upload your profile photo."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Image picker canceled");
        return;
      }

      // Update profile photo with the selected image URI
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage.uri);
        dispatch(setProfilePhoto(selectedImage.uri));
        await uploadImage(selectedImage);
      } else {
        console.warn("No assets found in image picker result.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "An error occurred while picking the image. Please try again."
      );
    }
  };

  // Function to upload image to the server
  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        name: "profile-photo.jpg",
        type: "image/jpeg",
      });

      const config = {
        method: "POST",
        url: `https://backend-v2-osaw.onrender.com/api/fileUpload`, // Ensure baseUrl is defined
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);

      if (response.data?.status && response.data?.data?.length > 0) {
        const imageUrl = response.data.data[0].url;
        setformData((prevFormData) => ({
          ...prevFormData,
          image: imageUrl,
        }));
        setError(""); // Clear any previous errors
      } else {
        console.warn("Unexpected response format:", response.data);
        setError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleSave2 = async () => {
    // Fetch the profile state at the top level of the component, not inside the function
    const {
      status,
      profilePhoto,
      birthday,
      bio,
      location,
      skillSet,
      industries,
      priorStartupExperience,
      commitmentLevel,
      equityExpectation,
      education,
      experience,
      projects,
    } = profileRedux;

    setisLoading(true);
    try {
      // Make sure all fields are filled (you can customize the validations based on requirements)
      // if (!profileData.name || !profileData.email || !profileData.location) {
      //   Toast.error("Please fill in all fields.");
      //   return;
      // }

      const userId = await AsyncStorage.getItem("userLocalId");

      if (!userId) {
        Toast.error("User ID not found");
        return;
      }

      // Call API to save profile data
      const result = await UpdateUserProfileInEditProfile({
        userId,
        status,
        profilePhoto,
        birthday,
        bio,
        location,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation,
        education,
        experience,
        projects,
      });

      console.log(result);
      // If update is successful
      if (result.success) {
        router.navigate("/(main)/(tabs)/profile");
        Toast.show("Profile updated successfully", { type: "success" });
      } else {
        Toast.show(result.message, { type: "success" });
      }
    } catch (error) {
      Toast.error("Error saving profile. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1  bg-white ">
      {/* Header */}
      <View className="header flex-row px-5  justify-between border-b border-gray-300 py-4 w-full items-center">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Edit Profile</Text>
        </View>

        <TouchableOpacity onPress={handleSave2}>
          {isLoading ? (
            <ActivityIndicator color="#2983DC" />
          ) : (
            <Text className="text-center text-xl text-[#2983DC] font-medium">
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Form Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white py-3   gap-4 flex-1"
        // contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      >
        <View className="flex-1 px-4 gap-8  bg-white items-center w-full ">
          {/* Header Section */}
          <View className="bg-[#FFE1E1] px-4  rounded-2xl py-4 w-full ">
            <View className=" flex flex-row gap-1.5 items-center  ">
              <Ionicons name="warning" size={26} color="#E31A31" />
              <Text className=" font-semibold ">
                A complete profile is required to send or accept connection
                invite
              </Text>
            </View>
            <View className="flex flex-col gap-1.5 mt-4 px-3  rounded-md">
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
              className="border-y-[0.5px] px-3  font-semibold border-gray-300 py-4 flex flex-row justify-between items-center"
            >
              <Text className="text-gray-500  font-semibold">
                {profileRedux.status ? profileRedux.status : userData.status}
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

            {/* Profile Image Picker */}
            <View className="gap-5 border-t-[0.5px] border-gray-300 py-4 w-full">
              <Text className="text-gray-500 font-semibold">Profile Photo</Text>
              <View className="flex flex-row gap-7 justify-start items-center">
                <Image
                  source={
                    profileImage ? { uri: profileImage } : imagePath.userImage
                  }
                  className="w-24 h-24 rounded-xl"
                />
                <TouchableOpacity
                  onPress={pickImage}
                  className="border-[0.5px] p-3 border-[#2983DC] rounded-xl"
                >
                  <Text className="font-medium text-gray-800">
                    Upload Photo
                  </Text>
                </TouchableOpacity>
              </View>
              {error && <Text className="text-red-500 text-sm">{error}</Text>}
            </View>

            {/* Second Section */}
            <View className="gap-7 mt-2">
              {/* Name  */}
              <View className="gap-2">
                <Text className="text-gray-500 font-semibold">Name</Text>
                <TextInput
                  value={userRedux.name ? userRedux.name : userRedux.user.name} // Controlled component
                  onChangeText={(newName) => {
                    dispatch(updateUser({ field: "name", value: newName }));
                  }} // Call function on value change
                  // placeholder="Enter your name"
                  className="bg-[#2982dc14] w-full text-gray-500 font-semibold px-6 py-4 rounded-xl"
                  keyboardType="default" // Use appropriate keyboard type
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
                      {profileRedux.birthday
                        ? profileRedux.birthday
                        : userData.birthday}
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
              <View className="gap-4">
                {/* Mindset Input Section */}
                <Text className="text-gray-500 font-semibold">Mindset</Text>
                <TextInput
                  placeholder="Looking for Co-founder"
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={200}
                  value={profileRedux.bio}
                  onChangeText={(text) => dispatch(setBio(text))}
                  className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-[#7C8BA0] px-6 rounded-lg py-4"
                  // Accessible label for screen readers
                  accessibilityLabel="Mindset input field"
                />

                {/* Conditional Warning Text */}
                {!isMindset && (
                  <Text className="text-red-600 font-normal">
                    Mindset section is mandatory for individuals looking for a
                    co-founder for startup
                  </Text>
                )}
              </View>

              {/* Location Input */}
              <View className="gap-4 w-full">
                <Text className="font-semibold text-lg">Location</Text>
                <TouchableOpacity
                  className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-[#7C8BA0] px-6 rounded-lg py-4"
                  onPress={getCurrentLocation}
                >
                  <Text
                    className={`text-md ${
                      profileRedux.location
                        ? "text-[#3B4054]"
                        : "text-[#7C8BA0]"
                    }`}
                  >
                    {profileRedux.location
                      ? profileRedux.location
                      : "Search Location"}
                  </Text>
                  {loadingLocation ? (
                    <ActivityIndicator size="small" color="#2983DC" />
                  ) : (
                    <Image source={imagePath.location} />
                  )}
                </TouchableOpacity>
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
                      {profileRedux.industries
                        ? profileRedux.industries
                        : userData.industries}
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
                      {profileRedux.skillSet
                        ? profileRedux.skillSet
                        : userData.skillSet}
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
                      {profileRedux.priorStartupExperience
                        ? profileRedux.priorStartupExperience
                        : userData.priorStartupExperience}
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
                      {profileRedux.commitmentLevel
                        ? profileRedux.commitmentLevel
                        : userData.commitmentLevel}
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
                      Equity Expectation
                    </Text>
                    <Text className="text-gray-400  text-sm ">
                      {profileRedux.equityExpectation
                        ? profileRedux.equityExpectation
                        : userData.equityExpectation}
                    </Text>
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
            {/* Fourth section */}
            <View className="gap-3 mt-5">
              <View className="flex flex-row justify-between pr-2 items-center">
                <Text className="text-gray-600 font-semibold">
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

              {/* Displaying education items */}
              {profileRedux.education && profileRedux.education.length > 0 ? (
                profileRedux.education.map((item, index) => (
                  <View
                    key={index}
                    className="flex flex-row border-y-[0.5px] py-4 px-1 border-gray-300"
                  >
                    <View className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                      <Ionicons
                        name="school-outline"
                        size={28}
                        color="#2983DC"
                      />
                    </View>
                    <View className="px-4">
                      <Text className="text-gray-800 font-semibold">
                        {item.institution}
                      </Text>
                      <Text className="text-sm text-gray-500 font-medium">
                        {item.degree} - {item.field_of_study}
                      </Text>
                      <View className="flex flex-row gap-3">
                        <Text className="text-sm text-gray-500 font-medium">
                          {item.startDate} - {item.endDate || "Present"}
                        </Text>
                        <Text className="text-sm text-gray-500 font-medium">
                          {item.isCurrentlyStudying
                            ? "Currently Studying"
                            : item.endDate
                            ? `${
                                new Date(item.endDate).getFullYear() -
                                new Date(item.startDate).getFullYear()
                              } years`
                            : "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text className="text-gray-500 font-medium">
                  No education data available
                </Text>
              )}
            </View>

            {/* Fifth section */}
            <View className="gap-3 mt-5">
              <View className="flex flex-row justify-between pr-2 items-center">
                <Text className="text-gray-600 font-semibold">
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

              {/* Experience List */}
              <View className="flex flex-row border-y-[0.5px] py-4 border-gray-300">
                {/* Check if experience exists */}
                {profileRedux.experience &&
                profileRedux.experience.length > 0 ? (
                  profileRedux.experience.map((exp, index) => (
                    <View key={index} className="flex flex-col">
                      <Text className="text-gray-800 font-semibold text-sm">
                        {exp.project_name} at {exp.company_name}
                      </Text>
                      <Text className="text-gray-600 text-xs">
                        {exp.startDate
                          ? `Start Date: ${formatDate(exp.startDate)}`
                          : "Start Date: Not provided"}
                      </Text>
                      <Text className="text-gray-600 text-xs">
                        {exp.endDate
                          ? `End Date: ${formatDate(exp.endDate)}`
                          : "End Date: Ongoing"}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-800 font-normal text-sm">
                    No Experience listed
                  </Text>
                )}
              </View>
            </View>

            {/* sixth section */}
            <View className="gap-3 mt-5">
              <View className="flex flex-row justify-between pr-2 items-center">
                <Text className="text-gray-600 font-semibold">My Project</Text>
                <TouchableOpacity
                  onPress={() => handleNavigation("/myproject")}
                  className="flex flex-row font-semibold items-center justify-center"
                >
                  <Text className="text-[#2983DC] font-medium">Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>

              {/* Displaying Project Data */}
              <ScrollView showsVerticalScrollIndicator={false}>
                {profileRedux.project && profileRedux.project.length > 0 ? (
                  profileRedux.project.map((project, index) => (
                    <View
                      key={index}
                      className="flex flex-row border-y-[0.5px] py-4 px-1 border-gray-300"
                    >
                      <View className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                        <Ionicons
                          name="laptop-outline"
                          size={28}
                          color="#2983DC"
                        />
                      </View>
                      <View className="px-4">
                        <Text className="text-gray-800 font-semibold">
                          {project.project_name}
                        </Text>
                        <Text className="text-sm text-gray-500 font-medium">
                          <TouchableOpacity
                            onPress={() =>
                              handleNavigation(project.project_link)
                            }
                          >
                            <Text className="text-[#2983DC]">
                              {project.project_link}
                            </Text>
                          </TouchableOpacity>
                        </Text>
                        <Text className="text-sm text-gray-500 font-medium">
                          {project.startDate}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View className="flex flex-row border-y-[0.5px] py-4 px-1 border-gray-300">
                    <Text className="text-gray-800 font-normal text-sm">
                      No Project
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
