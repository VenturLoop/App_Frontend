import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imagePath from "../../constants/imagePath";

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
        <View className="bg-gray-100 py-4 ">
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <View
                  className={`flex  flex-col gap-4 bg-white p-4 mb-8 rounded-lg shadow`}
                >
                  <View className={`"flex flex-row  justify-between w-full `}>
                    <View className="flex flex-row  gap-5">
                      <Image
                        className="w-16  h-16 rounded-2xl "
                        resizeMode="contain"
                        source={imagePath.userImage2}
                      />
                      <View className="gap-1">
                        <Text className="text-xl font-semibold">
                          Souptik Das
                        </Text>
                        <View className="bg-[#2983DC] py-1 rounded-full px-3">
                          <Text className="text-xs font-semibold text-white">
                            Looking for Co-founder
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text className="text-gray-400 text-sm">{item.time}</Text>
                  </View>
                  <View className="w-full flex-row justify-between   items-centern">
                    <View className="flex flex-row items-center px-4 w-2/3  justify-between ">
                      <View>
                        {/* Birthday logo */}
                        <Text className="text-lg font-medium">
                          {item.dob.split("/")[0]}
                        </Text>
                      </View>
                      <View>
                        {/* Location logo */}
                        <Text className="text-lg font-medium">
                          {item.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Image source={imagePath.NoMessage} />
          <Text className="font-semibold">No invitation received yet !</Text>
        </View>
      )}
    </>
  );
};

export default Send;
