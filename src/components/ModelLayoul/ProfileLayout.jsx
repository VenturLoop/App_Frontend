import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

const ProfileLayout = ({
  title,
  snapPoints,
  children,
  handleModalVisibility,
}) => {
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* Header with Back Button */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#f0f0f0",
          }}
        >
          <TouchableOpacity onPress={() => handleModalVisibility()}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Text style={{ marginLeft: 12, fontSize: 18, fontWeight: "bold" }}>
            {title || "Go Back"}
          </Text>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 16 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProfileLayout;
