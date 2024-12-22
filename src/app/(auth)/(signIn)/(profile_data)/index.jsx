import React, { useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "../../../../constants/imagePath";
import CustomeButton from "../../../../components/buttons/CustomeButton";
import { Sen_700Bold } from "@expo-google-fonts/sen";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const index = () => {
  const [loading, setLoading] = useState(false);
  const { referalCode, signupToken, isSignup } = useSelector(
    (state) => state.user
  );

  return (
    <SafeAreaView className="flex-1  bg-white" edges={["left", "right"]}>
      <ImageBackground
        className="flex-1 h-screen px-4  justify-between items-center"
        source={imagePath.splashScreen5}
        resizeMode="cover"
      >
        <View className="h-1/2  pt-40  flex items-center justify-center my-20">
          <Text className="  text-white  flex-row text-4xl font-bold  ">
            Add what you are looking for, your{" "}
            <Text className="text-[#2983DC]">skillset interests</Text>,
            <Text className="text-[#2983DC]">commitments</Text> and Prior{" "}
            <Text className="text-[#2983DC]">experience</Text> for better
            recommendation
          </Text>
        </View>
        <CustomeButton
          title={loading ? <ActivityIndicator color="white" /> : "Continue"}
          onButtonPress={() => {
            router.navigate("/what_your_status");
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;
