import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";
import imagePath from "../../../constants/imagePath";
import CustomeButton from "../../../components/buttons/CustomeButton";
import { router } from "expo-router";
import InviteReferalModel from "../../../components/models/InviteReferalModel";
import { useSelector } from "react-redux";

const referal_rewards = () => {
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const { referalCode } = useSelector((state) => state.user);

  const handleReferalCode = () => {
    console.log(referalCode);
  };
  return (
    <>
      <>
        <EditLayout title="Referal Reward" secondTitle="">
          <View className=" ">
            <Image
              source={imagePath.referalImage}
              className="w-full "
              resizeMode="contain"
            />
            <Text className="font-semibold text-xl tracking-wider text-start px-2 py-3 ">
              Invite friend and get complementary 10 direct connect
            </Text>
            <View className="p-4 flex gap-4">
              <Text className="text-[#505050] ">
                Each time a friend signsup and gets approved, you both get
                complementary 10 direct connect
              </Text>
              <Text className="text-[#505050] ">
                On hitting 10 referrals you will get complementary business
                class for 3 Months
              </Text>
            </View>
            <View className="flex flex-col gap-2 items-center justify-center mx-5 bg-[#50505014] mt-10  py-6 rounded-2xl  ">
              <Text className="text-center text-xl font-semibold">
                Successful referral
              </Text>
              <Text className="text-center text-2xl font-semibold">0</Text>
            </View>
          </View>
        </EditLayout>
        <View className="footer bg-white px-5 w-full">
          <CustomeButton
            onButtonPress={() => {
              setInviteModalVisible(true);
            }}
            title="Invite Friends"
          />
        </View>
      </>
      <InviteReferalModel
        isModalVisible={isInviteModalVisible}
        handleModalVisibility={() => {
          setInviteModalVisible(false);
        }}
      />
    </>
  );
};

export default referal_rewards;
