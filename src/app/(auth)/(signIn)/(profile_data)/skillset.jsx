import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { setSkillSet } from "../../../../redux/slices/profileSlice";
import { Toast } from "react-native-toast-notifications";

const Skillset = () => {
  const tags = [
    "Web Developer",
    "App Developer",
    "Product",
    "Team Management",
    "Marketing",
    "Sales",
    "Finance",
    "Social Media",
    "Distribution",
    "Legal",
    "UI/UX Design",
    "Product Design",
    "DevOps",
    "Internet of Things",
    "Hardware",
    "Data Scientist",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Blockchain",
    "Cybersecurity",
    "Digital Marketing",
    "SEO",
    "Business Development",
    "Quality Assurance",
    "Project Management",
    "Database Management",
    "Networking",
    "Content Creation",
    "Graphic Design",
    "Video Production",
    "Game Development",
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // Memoized function to handle tag toggling
  const toggleTag = useCallback((tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  }, []);

  // Handle search query change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  // Filter tags based on search query
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle saving skill sets and navigating
  const handleSaveSkillsets = async () => {
    if (selectedTags.length === 0) {
      Toast.show("Please select at least one skill", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      // Dispatch action to save skillset
      dispatch(setSkillSet(selectedTags));
      // Show success message and navigate
      Toast.show("Skillset saved successfully!", { type: "success" });
      router.navigate("/your_intrest");
    } catch (error) {
      Toast.show("Error saving skillset, please try again.", { type: "error" });
    } finally {
      setLoading(false); // Ensure loading is reset after the operation
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-300 py-5 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Your Skill set</Text>
        </View>
        <Text className="text-xl font-semibold text-[#2983DC]">2/6</Text>
      </View>

      <View className="body w-full flex-1 px-6 py-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search skill sets"
          value={searchQuery}
          onChangeText={handleSearchChange}
          className="w-full border text-lg font-medium border-[#2983DC] rounded-full px-6 py-3 my-4 text-gray-700"
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

export default Skillset;
