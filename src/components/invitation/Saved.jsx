import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import imagePath from "../../constants/imagePath";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import DeleteModel from "../../components/models/DeleteModel";
import { Toast } from "react-native-toast-notifications";

const Profiles = ({ profiles, onDelete }) => {
  const renderProfile = ({ item }) => (
    <View className="flex flex-col gap-3 mb-8 rounded-lg shadow bg-white">
      {/* Header */}
      <View className="flex flex-row border-b border-gray-200 px-4 py-3 items-center justify-between">
        <View className="flex flex-row gap-4 items-center">
          <Image
            className="w-12 h-12 rounded-xl"
            resizeMode="cover"
            source={item.image}
          />
          <View>
            <Text className="text-xl font-semibold text-black">
              {item.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <FontAwesome6 size={12} color="gray" name="location-dot" />
              <Text className="text-sm font-medium text-gray-500">
                {item.location}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" color="red" size={23} />
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View className="px-5 py-3">
        {item.details.map((detail, index) => (
          <View key={index} className="flex-row items-center gap-4 mb-2">
            <Ionicons
              name={
                index === 0
                  ? "walk-outline"
                  : index === 1
                  ? "briefcase-outline"
                  : "accessibility-outline"
              }
              size={20}
              color="#6B7280"
            />
            <Text className="text-gray-700 text-sm leading-snug">{detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return profiles.length > 0 ? (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderProfile}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  ) : (
    <View className="flex-1 items-center justify-center">
      <Image source={imagePath.NoSaved} />
      <Text className="font-semibold text-lg text-gray-500">
        You haven’t saved any profile yet!
      </Text>
    </View>
  );
};

const Investors = ({ investors, onDelete }) => {
  const renderInvestor = ({ item }) => (
    <View className="flex flex-col gap-3 mb-8 rounded-lg shadow bg-white">
      {/* Header */}
      <View className="flex flex-row border-b border-gray-200 px-4 py-3 items-center justify-between">
        <View className="flex flex-row gap-4 items-center">
          <Image
            className="w-12 h-12 rounded-xl"
            resizeMode="cover"
            source={item.image}
          />
          <View>
            <Text className="text-xl font-semibold text-black">
              {item.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <FontAwesome6 size={12} color="gray" name="location-dot" />
              <Text className="text-sm font-medium text-gray-500">
                {item.location}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" color="red" size={23} />
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View className="px-5 py-3">
        {item.details.map((detail, index) => (
          <View key={index} className="flex-row items-center gap-4 mb-2">
            <Ionicons
              name={
                index === 0
                  ? "cash-outline"
                  : index === 1
                  ? "business-outline"
                  : "clipboard-outline"
              }
              size={20}
              color="#6B7280"
            />
            <Text className="text-gray-700 text-sm leading-snug">{detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return investors.length > 0 ? (
    <FlatList
      data={investors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderInvestor}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  ) : (
    <View className="flex-1 items-center justify-center">
      <Image source={imagePath.NoSaved} />
      <Text className="text-center text-gray-500">No Investors Added Yet!</Text>
    </View>
  );
};

const Saved = () => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Souptik Das",
      location: "Kolkata",
      details: [
        "Ready to go full time with the right co-founder",
        "Worked in a startup",
        "Fully Negotiable",
      ],
      image: imagePath.userImage2,
    },
    {
      id: 2,
      name: "Ananya Roy",
      location: "Delhi",
      details: [
        "Looking for a co-founder in tech",
        "3 years of experience in startups",
        "Flexible equity options",
      ],
      image: imagePath.userImage3,
    },
  ]);

  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: "Investor XYZ",
      location: "Bangalore",
      details: [
        "Looking to invest in tech startups",
        "Focus on early-stage funding",
        "Flexible investment terms",
      ],
      image: imagePath.investorImage,
    },
  ]);

  const [activeTab, setActiveTab] = useState("Profiles");
  const slideAnim = useState(new Animated.Value(0))[0];

  const handleDelete = () => {
    if (activeTab === "Profiles") {
      setProfiles((prev) => prev.filter((profile) => profile.id !== deleteId));
    } else {
      setInvestors((prev) =>
        prev.filter((investor) => investor.id !== deleteId)
      );
    }
    setDeleteModalVisible(false);
    Toast.show("Deleted Successfully", {
      type: "success",
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === "Profiles" ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const slideStyles = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -400],
        }),
      },
    ],
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Tab Header */}
      <View className="flex-row justify-around items-center bg-white shadow py-2">
        <TouchableOpacity
          onPress={() => handleTabChange("Profiles")}
          className={`px-3 py-2 ${
            activeTab === "Profiles" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              activeTab === "Profiles" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Profiles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabChange("Investors")}
          className={`px-3 py-2 ${
            activeTab === "Investors" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              activeTab === "Investors" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Investors
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated Content */}
      <Animated.View
        style={[slideStyles, { width: "204%", gap:10, flexDirection: "row" }]}
      >
        {/* Profiles */}
        <View style={{ flex: 1, padding: 16 }}>
          <Profiles
            profiles={profiles}
            onDelete={(id) => {
              setDeleteId(id);
              setDeleteModalVisible(true);
            }}
          />
        </View>

        {/* Investors */}
        <View style={{ flex: 1, padding: 16 }}>
          <Investors
            investors={investors}
            onDelete={(id) => {
              setDeleteId(id);
              setDeleteModalVisible(true);
            }}
          />
        </View>
      </Animated.View>

      <DeleteModel
        isModalVisible={isDeleteModalVisible}
        handleModalVisibility={() => setDeleteModalVisible(false)}
        handleDeleteButton={handleDelete}
      />
    </View>
  );
};

export default Saved;
