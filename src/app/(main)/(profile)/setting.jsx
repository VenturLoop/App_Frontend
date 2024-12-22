import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
  Linking,
} from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "../../../constants/imagePath";
import { router } from "expo-router";
import DeleteModel from "../../../components/models/DeleteModel";
import LogoutModel from "../../../components/models/LogoutModel";
import { Toast, useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../redux/slices/userSlice";

const setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [logoutModel, setLogoutModel] = useState(false);
  const [isNotiEnabled, setIsNotiEnabled] = useState(true);
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(true);
  const toast = useToast();
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toast.show(`Profile ${!isEnabled ? "Freezed" : "Unfreezed"}`, {
      type: !isEnabled ? "error" : "success",
    });
  };

  const toggleNotiSwitch = () => {
    setIsNotiEnabled((previousState) => !previousState);
    toast.show(
      `Push notifications ${!isNotiEnabled ? "enabled" : "disabled"}`,
      {
        type: isNotiEnabled ? "error" : "success",
      }
    );
  };

  const handleNavigation = (route) => {
    setTimeout(() => {
      router.navigate(route);
    }, 10); // Wait for modal close animation before routing
  };

  const handleToggleFreeze = () => {
    setIsEnabled((previousState) => !previousState);
    toast.show(
      `Profile ${
        !isPushNotificationEnabled ? "Unreezed" : "Freezed"
      } successfully`,
      { type: "error" }
    );
  };

  const handlePress1 = () => {
    const url = "https://venturloop.com/privacy-policy";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handlePress2 = () => {
    const url = "https://venturloop.com/venturloopcom-terms-and-conditions-";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handlePress3 = () => {
    const url = "https://venturloop.com/community-guidelines-venturloop";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handleDeleteAccount = () => {
    setDeleteModel(false);
    Toast.show("Account deleted successfully", {
      type: "delete",
    });
    router.push("/(signIn)");
  };
  const handleLogout = () => {
    setLogoutModel(false);
    dispatch(setLogin({ isLogin: false, loginToken: "" }));
    Toast.show("Logout successfully", {
      type: "logout",
    });

    router.push("/login");
  };

  return (
    <>
      <EditLayout title="Setting">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-gray-100  gap-4 flex-1"
        >
          <View className="flex-1 px-4 gap-8 bg-white  items-center w-full ">
            <View className="flex-1 gap-6 pb-6   ">
              {/* First section */}
              <View className="w-full gap-3">
                <Text className="text-gray-400 font-semibold">Profile</Text>

                {/* Freeze profile section */}
                <View className="gap-5 border-y-[0.5px] border-gray-300 py-4 ">
                  {/* Freeze Profile  */}
                  <View className="flex pr-1 flex-row justify-between items-center ">
                    <Text className="text-gray-500 font-semibold">
                      Freeze Profile
                    </Text>
                    <Switch
                      trackColor={{ false: "#6F6F76", true: "#6CD86B" }}
                      thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />

                    {/* Toggle button */}
                  </View>
                  <Text className="text-sm text-gray-400">
                    Freezing Profile will prevent your profile from being
                    discovered to new people.You can still chat with your
                    current connections
                  </Text>
                </View>
              </View>

              {/* Second section */}
              <View className="w-full gap-3">
                <Text className="text-gray-400 font-semibold">Account</Text>

                {/* first section */}
                <View className="gap-3 border-y-[0.5px] border-gray-300 py-4 ">
                  {/* Freeze Profile  */}
                  <View className="flex flex-row justify-between items-center ">
                    <Text className="text-gray-500 font-semibold">
                      E-mail Address
                    </Text>
                    {/* Verified button */}
                    <Text className="text-[#2983DC] text-xs font-semibold ">
                      Verified
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-400">
                    Ceo.souptik@gmail.com
                  </Text>
                  <Text className="text-sm text-gray-400 ">
                    You can only sign in with a verified email address
                  </Text>
                </View>
              </View>

              {/* Subscription section */}
              <View className="gap-3  ">
                <Text className="text-gray-400 font-semibold ">
                  Subscription
                </Text>
                <View className="gap-3 ">
                  {/* Choose sector */}
                  <TouchableOpacity
                    onPress={() => handleNavigation("/subscription_page")}
                    className="  border-y-[0.5px] py-3 justify-between items-center pr-2 flex flex-row border-gray-300"
                  >
                    <View className="gap-1">
                      <Text className="text-gray-500 font-semibold">
                        Subscription to VenturLoop
                      </Text>
                      <Text className="text-gray-400  text-sm ">
                        You are not subscribed yet
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#757575"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Referal section */}
              <View className="gap-3  ">
                <Text className="text-gray-400 font-semibold ">Referral</Text>
                <View className="gap-3 ">
                  {/* Choose sector */}
                  <TouchableOpacity
                    onPress={() => {
                      handleNavigation("/referal_rewards");
                    }}
                    className="  border-y-[0.5px] py-3 justify-between items-center pr-2 flex flex-row border-gray-300"
                  >
                    <View className="gap-1">
                      <Text className="text-gray-500 font-semibold">
                        Refer a friend
                      </Text>
                      <Text className="text-gray-400  text-sm ">
                        Invite friend to join VenturLoop
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#757575"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Notification section */}
              <View className="gap-3  ">
                <Text className="text-gray-400 font-semibold ">
                  Notification
                </Text>
                <View className="gap-3 ">
                  {/* Choose sector */}
                  <View className="  border-y-[0.5px] py-3 justify-between items-center pr-2 flex flex-row border-gray-300">
                    <View className="gap-1">
                      <Text className="text-gray-500 font-semibold">
                        Push Notification
                      </Text>
                      <Text className="text-gray-400  text-sm ">
                        Manage your notification status
                      </Text>
                    </View>
                    {/* Todo  */}
                    <Switch
                      trackColor={{ false: "#6F6F76", true: "#6CD86B" }}
                      thumbColor={isNotiEnabled ? "#FFFFFF" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      value={isNotiEnabled}
                      onValueChange={toggleNotiSwitch}
                    />
                  </View>
                </View>
              </View>

              {/* Fifth section */}
              <View className="gap-3 mt-4 ">
                <Text className="text-gray-400 font-semibold ">Legal</Text>
                <View className="gap-3 ">
                  {/* Privacy */}
                  <TouchableOpacity
                    onPress={handlePress1}
                    className="  border-y-[0.5px] py-3 justify-between items-center pr-2 flex flex-row border-gray-300"
                  >
                    <View className="gap-1">
                      <Text className="text-gray-500 font-semibold">
                        Privacy Policy
                      </Text>
                      <Text className="text-gray-400  text-sm ">
                        https://venturloop.com/privacy-policy
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#757575"
                    />
                  </TouchableOpacity>
                  {/* Term and consition */}
                  <TouchableOpacity
                    onPress={handlePress2}
                    className="border-b-[0.5px] pb-3  justify-between items-center pr-2 flex flex-row border-gray-300"
                  >
                    <View className="gap-1 w-[80vw]  ">
                      <Text className="text-gray-500 font-semibold">
                        Terms and Condition
                      </Text>
                      <Text className="text-gray-400 text-sm ">
                        https://venturloop.com/venturloopcom-terms-and-conditions-
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#757575"
                    />
                  </TouchableOpacity>
                  {/*  Policy Startup */}
                  <TouchableOpacity
                    onPress={handlePress3}
                    className="border-b-[0.5px] pb-3 justify-between items-center pr-2 flex flex-row border-gray-300"
                  >
                    <View className="gap-1 w-[80vw]">
                      <Text className="text-gray-500 font-semibold">
                        Community Guidelines
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        https://venturloop.com/community-guidelines-venturloop
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#757575"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Button section */}
              <View className="">
                {/* Setting Button */}
                <TouchableOpacity
                  onPress={() => setLogoutModel(true)}
                  className="w-full border border-gray-300 rounded-xl py-4 my-2"
                >
                  <Text className="text-center text-gray-500 text-lg font-semibold">
                    Logout
                  </Text>
                </TouchableOpacity>

                {/* Share Profile Button */}
                <TouchableOpacity
                  onPress={() => setDeleteModel(true)}
                  className="w-full border border-red-600 rounded-xl py-4 my-2"
                >
                  <Text className="text-center text-red-600 text-lg font-semibold">
                    Delete Account
                  </Text>
                </TouchableOpacity>

                {/* Cancel Button */}

                <Text className="text-center mt-4 text-gray-500  font-medium">
                  Version 0.0.01
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </EditLayout>
      <DeleteModel
        isModalVisible={deleteModel}
        handleModalVisibility={() => {
          setDeleteModel(false);
        }}
        handleDeleteButton={handleDeleteAccount}
      />
      <LogoutModel
        isModalVisible={logoutModel}
        handleModalVisibility={() => {
          setLogoutModel(false);
        }}
        handleLogoutfunction={handleLogout}
      />
    </>
  );
};

export default setting;
