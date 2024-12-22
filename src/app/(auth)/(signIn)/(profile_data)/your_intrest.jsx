import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import imagePath from "../../../../constants/imagePath";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash"; // Debounce library to optimize the search input
import { useDispatch } from "react-redux";
import { setIndustries } from "../../../../redux/slices/profileSlice";
import { Toast } from "react-native-toast-notifications";

const YourInterest = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Sample tags
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

  // Debounce search functionality to optimize performance
  const handleSearch = debounce((query) => {
    const filtered = tags.filter((tag) =>
      tag.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTags(filtered);
  }, 300); // 300ms debounce time

  // Update search query and call the handleSearch
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    handleSearch(query); // Call debounced search function
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveSkillsets = () => {
    if (!selectedTags) {
      Toast.show("Please Select an option", { type: "error" });
      return;
    }
    setLoading(true);
    Toast.show("Intrests Saved!", { type: "success" });
    setLoading(true);
    dispatch(setIndustries(selectedTags)); // Dispatch action to store skillSet in Redux
    router.navigate("/commitment");
    setLoading(false);
  };

  // Initialize filteredTags with all tags initially
  useEffect(() => {
    setFilteredTags(tags);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-300 py-4 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Interests</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">3/6</Text>
      </View>
      <View className="body w-full flex-1 px-6 p-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search interests"
          value={searchQuery}
          onChangeText={handleSearchChange}
          className="w-full border text-lg font-medium border-[#2983DC] rounded-full px-4 py-3 my-4 text-gray-700"
        />

        {/* Tag List */}
        <ScrollView
          className="flex-1 w-full "
          showsHorizontalScrollIndicator={false}
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
