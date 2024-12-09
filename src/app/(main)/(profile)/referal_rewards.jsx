import { View, Text } from "react-native";
import React from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";

const referal_rewards = () => {
  return (
    <EditLayout
      continueRoute="/(tabs)/profile"
      title="Referal Reward"
      secondTitle=""
    >
      <Text>Referal </Text>
    </EditLayout>
  );
};

export default referal_rewards;
