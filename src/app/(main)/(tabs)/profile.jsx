// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import React, { useState } from "react";
// import PreviewProfile from "../../../components/profile/PreviewProfile";
// import MyProfile from "../../../components/profile/MyProfile";

// const profile = () => {
//   const [activeTab, setActiveTab] = useState("myProfile"); // To track active tab

//   return (
//     <SafeAreaView className="bg-[#F0F6FB] h-screen  flex-1 justify-between  items-center w-full ">
//       <View className="bg-white px-4 pt-4 pb-4 border-b-[0.5px] border-gray-300  w-full">
//         <View className="flex-row bg-[#F0F6FB]  rounded-full  justify-between items-center">
//           {/* My Profile Tab */}
//           <TouchableOpacity
//             onPress={() => setActiveTab("myProfile")}
//             className={`py-3 px-6 w-1/2 rounded-full ${
//               activeTab === "myProfile" ? "bg-[#2983DC]" : "bg-transparent"
//             }`}
//           >
//             <Text
//               className={`text-lg  text-center ${
//                 activeTab === "myProfile"
//                   ? "text-white font-medium"
//                   : "text-black"
//               }`}
//             >
//               My Profile
//             </Text>
//           </TouchableOpacity>

//           {/* Preview Profile Tab */}
//           <TouchableOpacity
//             onPress={() => setActiveTab("previewProfile")}
//             className={`py-3 px-6 w-1/2  rounded-full ${
//               activeTab === "previewProfile"
//                 ? "bg-[#2983DC] "
//                 : "bg-transparent"
//             }`}
//           >
//             <Text
//               className={`text-lg text-center ${
//                 activeTab === "previewProfile"
//                   ? "text-white font-medium "
//                   : "text-black"
//               }`}
//             >
//               Preview Profile
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View className="flex-1 items-center py-2 px-6">
//         {activeTab === "previewProfile" ? <PreviewProfile /> : <MyProfile />}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default profile;

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Importing useFocusEffect
import Request from "../../../components/message/Request";
import UserMessages from "../../../components/message/UserMessages";
import PreviewProfile from "../../../components/profile/PreviewProfile";
import MyProfile from "../../../components/profile/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataProfile } from "../../../api/profile";
import { setUser } from "../../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window"); // Get device width for swiping logic

const profile = () => {
  const [activeTab, setActiveTab] = useState("message"); // Default active tab
  const [PageLoading, setPageLoading] = useState(false);
  const tabs = [
    { key: "myprofile", label: "My Profile", component: <MyProfile /> },
    {
      key: "previewprofile",
      label: "Preview Profile",
      component: <PreviewProfile />,
    },
  ];

  const flatListRef = useRef(null); // Ref for FlatList

  // Reset to "message" tab when the page is focused
  useFocusEffect(
    useCallback(() => {
      setActiveTab("myprofile");
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }, [])
  );



  // Handle tab change when tab buttons are clicked
  const handleTabChange = (key) => {
    setActiveTab(key);
    const index = tabs.findIndex((tab) => tab.key === key);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const safeRenderComponent = (component) => {
    try {
      return component; // Return the component if there is no error
    } catch (error) {
      console.log("Error in rendering component:", error);
      return <Text>Error loading content</Text>; // Fallback UI
    }
  };

  return (
    <SafeAreaView className="bg-[#F0F6FB] h-screen flex-1 w-full">
      {/* Header Tabs */}
      <View className="bg-white px-4 pt-4 pb-4 border-b border-gray-300 w-full">
        <View className="flex-row bg-[#F0F6FB] rounded-full justify-between items-center">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabChange(tab.key)}
              className={`py-3 px-6 w-1/2 rounded-full ${
                activeTab === tab.key ? "bg-[#2983DC]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-lg text-center ${
                  activeTab === tab.key
                    ? "text-white font-semibold"
                    : "text-black font-medium"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Swipable Content */}
      <FlatList
        ref={flatListRef} // Attach FlatList ref
        data={tabs}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveTab(tabs[index].key); // Sync active tab with swipe
        }}
        renderItem={({ item }) => (
          <View style={{ width }}>{safeRenderComponent(item.component)}</View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        initialScrollIndex={tabs.findIndex((tab) => tab.key === "myprofile")}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

export default profile;
