import { View, Text } from "react-native";
import React from "react";
import EditLayout from "../../../components/ModelLayoul/EditLayout";

const edit_preferance = () => {
  return (
    <EditLayout
      continueRoute="/(tabs)/profile"
      title="Edit Preferance"
      secondTitle="Clear all"
    >
      <Text>New</Text>
    </EditLayout>
  );
};

export default edit_preferance;
