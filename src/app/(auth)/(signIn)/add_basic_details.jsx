import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";

const AddBasicDetails = () => {
  const [birthdate, setBirthdate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Predefined list of Indian cities/states
  const cityList = [
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Surat, Gujarat",
    "Pune, Maharashtra",
    "Jaipur, Rajasthan",
  ];

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString("en-GB"); // Formats as dd/mm/yyyy
      setBirthdate(formattedDate);
    }
    setShowDatePicker(false);
  };

  const handleCitySelect = (city) => {
    setLocation(city);
    setShowCityPicker(false);
  };

  return (
    <SafeAreaView className="py-6 px-8 h-screen bg-white flex justify-between gap-5 flex-col">
      <View className="header flex flex-col items-start justify-start gap-4">
        <Text className="text-[#21262E] mt-4 font-bold text-3xl">
          Add your basic Details
        </Text>
        <Text className="text-start text-lg text-[#61677D]">
          Provide your basic details to complete your profile and unlock
          personalised opportunities!
        </Text>
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
        </View>
      </View>
      <View className="flex justify-start mb-10 gap-4 items-center">
        {/* Email Input */}
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Email</Text>
          <TextInput
            placeholder="you@example.com"
            className="bg-[#2982dc14] w-full placeholder:text-[#7C8BA0] px-6 py-5 rounded-lg p-2"
            keyboardType="email-address"
          />
        </View>
        {/* Birthday Input */}
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Birthday</Text>
          <View className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-sm placeholder:text-[#7C8BA0] px-6 rounded-lg p-2">
            <TextInput
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              className="text-sm flex-1"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Image source={imagePath.calender} />
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateSelect}
            />
          )}
        </View>
        {/* Location Input */}
        <View className="gap-4 w-full">
          <Text className="font-semibold text-lg">Location</Text>
          <View className="bg-[#2982dc14] w-full flex flex-row items-center justify-between placeholder:text-[#7C8BA0] px-6 rounded-lg p-2">
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="Type your city/state"
              className="text-sm flex-1"
            />
            <TouchableOpacity onPress={() => setShowCityPicker(true)}>
              <Image source={imagePath.location} />
            </TouchableOpacity>
          </View>

          {/* City Picker Modal */}
          {showCityPicker && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showCityPicker}
              onRequestClose={() => setShowCityPicker(false)}
            >
              <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white w-3/4 rounded-lg p-4">
                  <Text className="text-lg font-semibold mb-4">
                    Select a City/State
                  </Text>
                  <FlatList
                    data={cityList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="p-4 border-b border-gray-300"
                        onPress={() => handleCitySelect(item)}
                      >
                        <Text className="text-[#21262E]">{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    className="mt-4 bg-[#2982dc] p-3 rounded-lg"
                    onPress={() => setShowCityPicker(false)}
                  >
                    <Text className="text-white text-center">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
      <View className="footer flex">
        <CustomeButton
          title="Continue"
          onButtonPress={() => {
            router.push("/(profile_data)");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddBasicDetails;
