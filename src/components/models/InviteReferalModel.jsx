import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
  Share,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const InviteReferralModal = ({
  isModalVisible,
  handleModalVisibility,
  nextPageRoute,
}) => {
  const { referalCode } = useSelector((state) => state.user);

  const [referralCode] = useState("ASDFGHJKL123");
  const [isCopied, setIsCopied] = useState(false);
  const translateY = new Animated.Value(300);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isModalVisible ? 0 : 300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isModalVisible]);

  const handleNavigation = (route) => {
    handleModalVisibility();
    setTimeout(() => router.push(route), 200);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      alert("Failed to copy referral code.");
    }
  };

  const shareReferralCode = async () => {
    try {
      await Share.share({
        message: `Use my referral code: ${referralCode} to get benefits!`,
      });
    } catch {
      alert("Failed to share referral code.");
    }
  };

  return (
    <Modal
      transparent
      visible={isModalVisible}
      onRequestClose={handleModalVisibility}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={handleModalVisibility}
      >
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-3xl gap-6 px-6 py-8 items-center"
        >
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Copy Referral Code
          </Text>

          <TouchableOpacity
            onPress={copyToClipboard}
            className="bg-[#E1F3FF] flex flex-row justify-between w-full px-8 py-5 rounded-2xl"
          >
            <Text className="text-xl tracking-wider">{referalCode}</Text>
            {isCopied ? (
              <Text className="text-green-500 text-lg font-semibold">
                Copied!
              </Text>
            ) : (
              <Ionicons name="copy-outline" size={23} color="#2983DC" />
            )}
          </TouchableOpacity>

          <View className="flex-row justify-between gap-3 w-full mt-6">
            <TouchableOpacity
              onPress={handleModalVisibility}
              className="flex-1 border border-gray-100 rounded-lg py-3"
            >
              <Text className="text-center text-lg text-gray-700 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={shareReferralCode}
              className="flex-1 rounded-lg py-3 bg-[#2983DC]"
            >
              <Text className="text-center text-lg text-white font-medium">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default InviteReferralModal;
