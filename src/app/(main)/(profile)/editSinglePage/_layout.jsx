import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const EditSinglePageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="editSkillset"  />
    </Stack>
  );
};

export default EditSinglePageLayout;
