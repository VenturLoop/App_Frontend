import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import { debounce } from "lodash";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { setIndustries } from "../../../../redux/slices/profileSlice";

const YourInterest = () => {
  const tags = [
    "AI/ML",
    "AR/VR",
    "Advertising",
    "Agritech",
    "Analysis",
    "AudioTech",
    "Auto Tech",
    "BioTech",
    "ClimateTech/CleanTech",
    "Cloud Infrastructure",
    "ConstructionTech",
    "Creator/Passion Economy",
    "Data Services",
    "DeepTech",
    "Developer Tools",
    "Direct-to-Consumer DTC",
    "E-commerse",
    "Education",
    "EnergyTech",
    "Enterprise",
    "Entertainment and Sports",
    "Fashion",
    "FinTech",
    "Food and Beverage",
    "Future of Work",
    "Gaming",
    "Generetive Tech/AI",
    "Gig Economy",
    "GovTech",
    "Hardware",
    "HealthTech",
    "Human Capital/HRTech",
    "Insurance",
    "Internet of Things",
    "LegalTech",
    "Lodging/Hospitality",
    "Logistics",
    "Manufacturing",
    "Marketplace",
    "Material Science",
    "Media/Content",
    "Medica; Devices",
    "Mental Health",
    "Messaging",
    "Parenting/Families",
    "Payments",
    "Pharmaceuticals",
    "Productivity Tools",
    "Real Estate/PropTech",
    "Retail",
    "Robotics",
    "SaaS",
    "Sales & CRM",
    "Security",
    "Semiconductors",
    "Smart Cities/UrbanTech",
    "SMB software",
    "Social Impact",
    "Social Network",
    "Space",
    "Supply Chain Tech",
    "Transportation",
    "Travel",
    "Web3/Blockchain",
    "Wellness & Fitness",
    "Other",
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query) => {
      const filtered = tags.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTags(filtered);
    }, 300),
    []
  );

  // Update the search query and trigger search
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Save selected industries to Redux and navigate
  const handleSaveSkillsets = async () => {
    if (selectedTags.length === 0) {
      Toast.show("Please select at least one interest", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      dispatch(setIndustries(selectedTags)); // Save to Redux
      Toast.show("Interests saved!", { type: "success" });
      router.navigate("/commitment");
    } catch (error) {
      Toast.show("An error occurred, please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize filteredTags on component mount
    setFilteredTags(tags);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-300 py-5 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Interests</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">3/6</Text>
      </View>

      <View className="body w-full flex-1 px-6 py-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search interests"
          value={searchQuery}
          onChangeText={handleSearchChange}
          className="w-full border text-lg font-medium border-[#2983DC] rounded-full px-4 py-3 my-4 text-gray-700"
        />

        {/* Tag List */}
        <ScrollView
          className="flex-1 w-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-row mt-4 flex-wrap gap-2">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  className={`px-4 py-2 my-1 rounded-full border ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 border-[#2983DC]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedTags.includes(tag)
                        ? "text-[#2983DC] font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-500">No results found</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <View className="footer px-5 w-full">
        <CustomeButton
          onButtonPress={handleSaveSkillsets}
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
        />
      </View>
    </SafeAreaView>
  );
};

export default YourInterest;
