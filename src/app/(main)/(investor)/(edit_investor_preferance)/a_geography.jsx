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

const a_geography = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample tags
  const tags = [
    "Global",
    "India",
    "China",
    "USA",
    "Brazil",
    "Australia",
    "Russia",
    "Canada",
    "South Africa",
    "Egypt",
    "Japan",
    "Germany",
    "United Kingdom",
    "Argentina",
    "Antarctica",
    "Saudi Arabia",
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
  const dispatch = useDispatch();

  const handleSaveSkillsets = () => {
    if (!selectedTags) {
      Toast.show("Please Select an option", { type: "error" });
      return;
    }
    // Toast.show("Intrests Saved!", { type: "success" });
    setLoading(true);
    // dispatch(setIndustries(selectedTags)); // Dispatch action to store skillSet in Redux
    setTimeout(() => {
      router.back();
      setLoading(false);
    }, 2000);
  };

  // Initialize filteredTags with all tags initially
  useEffect(() => {
    setFilteredTags(tags);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white h-screen items-center justify-between">
      <View className="header flex-row px-5 justify-between border-b-[0.5px] border-gray-300 py-5 w-full items-center">
        <View className="flex-row items-center justify-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Geography</Text>
        </View>
        {/* <Text className="text-xl font-semibold text-[#2983DC]">3/6</Text> */}
      </View>
      <View className="body w-full flex-1 px-6 p-4">
        {/* Search Bar */}
        <TextInput
          placeholder="Search geography"
          value={searchQuery}
          onChangeText={handleSearchChange}
          className="w-full border text-lg font-medium border-[#2983DC] rounded-full px-8 py-3 my-4 text-gray-700"
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
          title={loading ? <ActivityIndicator color="white" /> : "Save"}
        />
      </View>
    </SafeAreaView>
  );
};

export default a_geography;
