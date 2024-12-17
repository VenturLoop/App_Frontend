import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imagePath from "../../constants/imagePath";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

const messages = [
  {
    id: 1,
    name: "Souptik Das",
    time: "1 hour ago",
    lookingFor: "Co-founder",
    location: "Kolkata",
    dob: "23/12/2015",
  },
];
// const messages = [];

const Send = () => {
  return (
    <>
      {messages.length > 0 ? (
        <View className="bg-gray-100 flex px-4 py-4 justify-between h-full ">
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                className={`flex flex-col gap-3  mb-8 rounded-lg shadow bg-white
                `}
              >
                {/* Header */}
                <View className="flex flex-row border-b border-gray-200 px-4 py-3 items-center justify-between w-full">
                  <View className="flex items-start flex-row gap-4">
                    <Image
                      className="w-12 h-12 rounded-xl"
                      resizeMode="cover"
                      source={imagePath.userImage2}
                    />
                    <View className="gap-0.5 flex items-start justify-center">
                      <Text
                        className={`text-xl font-semibold 
                        
                             text-black
                        `}
                      >
                        {item.name}
                      </Text>
                      <View className="flex-row gap-1.5 justify-center items-center">
                        <FontAwesome6
                          size={12}
                          color="gray"
                          name="location-dot"
                        />
                        <Text
                          className={` text-sm font-medium  
                            
                             
                            text-gray-500
                          `}
                        >
                          {item.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Footer */}
                <View className=" w-full gap-2 pb-3 overflow-hidden">
                  {/* Top Section: Age and Location */}

                  {/* Ready to go full time */}
                  <View className="flex-row items-center  px-5 gap-4">
                    <Ionicons name="walk-outline" size={20} color="#6B7280" />
                    <Text className="text-gray-700 text-sm  leading-snug">
                      Ready to go full time with the right co-founder
                    </Text>
                  </View>

                  {/* Worked in a startup */}
                  <View className="flex-row items-center  border-gray-200  px-5 gap-4">
                    <Ionicons
                      name="briefcase-outline"
                      size={20}
                      color="#6B7280"
                    />
                    <Text className="text-gray-700 text-sm  leading-snug">
                      Worked in a startup
                    </Text>
                  </View>
                  {/* Fully Negotiable */}
                  <View className="flex-row items-center px-5 gap-4">
                    <Ionicons
                      name="accessibility-outline"
                      size={20}
                      color="#6B7280"
                    />
                    <Text className="text-gray-700 text-sm  leading-snug">
                      Fully Negotiable
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold text-lg text-gray-500 ">
            No invitation received yet !
          </Text>
        </View>
      )}
    </>
  );
};

export default Send;
