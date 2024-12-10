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
import { Ionicons } from "@expo/vector-icons";

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
        <View className="flex-1 items-center w-full ">
          {/* Header Section */}
          <View className="bg-[#FFE1E1]  rounded-2xl py-4 w-full ">
            <View className=" flex-1 ">
              <Ionicons name="warning-outline" size={18} color="#E31A31" />
              <Text>
                A complete profile is required to send or accept connection
                invite
              </Text>
            </View>
            <View>
              <Text>Profile Photo is required</Text>
              <Text>Mindset is required</Text>
              <Text>Basic details need to be filled</Text>
            </View>
          </View>

          {/* Status bar */}
          <View>
            <Text>My Status</Text>
            <TextInput
              placeholder="Looking for Co-founder "
              // className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
              keyboardType="email-address"
            />
          </View>

          {/* Basic Detail */}
          <View>
            {/* first section */}
            <View>
              {/* Profile image */}
              <View>
                <Text>Profile photo</Text>
                {/* <Image/> */}
              </View>
              <View>
                <Text>Edit Photo</Text>
              </View>
            </View>

            {/* Second Section */}
            <View>
              {/* Name  */}
              <View>
                <Text>Name</Text>
                <TextInput
                  placeholder="Looking for Co-founder "
                  // className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
                  keyboardType="email-address"
                />
              </View>
              {/* Date of Birth */}
              <View>
                <Text>Date of birth</Text>
                <TextInput
                  placeholder="Looking for Co-founder "
                  // className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
                  keyboardType="email-address"
                />
              </View>
              {/* Mindset */}
              <View>
                <Text>Mindset</Text>
                <TextInput
                  placeholder="Looking for Co-founder "
                  // className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
                  keyboardType="email-address"
                />
              </View>
              {/* Warning text */}
              <Text>
                Mindset section is mandatory for individuals looking for
                co-founder for startup
              </Text>

              {/* Location */}
              <View>
                <Text>Mindset</Text>
                <TextInput
                  placeholder="Looking for Co-founder "
                  // className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Third section */}
            <View>
              <Text>My Interest</Text>
              <View>
                {/* Choose sector */}
                <View>
                  <View>
                    <Text>Choose sector/industries</Text>
                    <Text>AR/VR, Advertising</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
                {/* My skillset */}
                <View>
                  <View>
                    <Text>My Skillset</Text>
                    <Text>Web developer, Marketing</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
                {/* Prior startup */}
                <View>
                  <View>
                    <Text>Prior Startup experience</Text>
                    <Text>Ready to go full time with the right co founder</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
                {/* Commentment level */}
                <View>
                  <View>
                    <Text>Commitment Level</Text>
                    <Text>No prior startup experience</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
                {/* compensation expe */}
                <View>
                  <View>
                    <Text>Compensation Expectation</Text>
                    <Text>Equity</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
              </View>
            </View>

            {/* Fourth section */}
            <View>
              <View>
                <Text>My Education</Text>
                <TouchableOpacity>
                  <Text>Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Education bar */}
              <View>
                {/* <Image/> */}
                <View>
                  <Text>Rajiv Gandhi Institute of Knowledge Technologies</Text>
                  <Text>Bachelores in Technology - BTech</Text>
                  <View>
                    <Text>Oct 2016-Dec 2020</Text>
                    <Text>4 yrs 3 Months</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Fifth section */}
            <View>
              <View>
                <Text>My Experience</Text>
                <TouchableOpacity>
                  <Text>Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Education bar */}
              <View>
                {/* <Image/>
                <View>
                  <Text>Rajiv Gandhi Institute of Knowledge Technologies</Text>
                  <Text>Bachelores in Technology - BTech</Text>
                  <View>
                    <Text>Oct 2016-Dec 2020</Text>
                    <Text>4 yrs 3 Months</Text>
                  </View>
                </View> */}
                <Text>No Experience listed</Text>
              </View>
            </View>

            {/* sixth section */}
            <View>
              <View>
                <Text>My Projects</Text>
                <TouchableOpacity>
                  <Text>Add</Text>
                  <Ionicons name="add-outline" size={20} color="#2983DC" />
                </TouchableOpacity>
              </View>
              {/* Projects */}
              <View>
                {/* Project 1 */}
                <View>
                  <Text>Weather App</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
                {/* Project 2 */}
                <View>
                  <Text>Calculator</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#2983DC"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </EditLayout>
  );
};

export default EditProfile;
