import { View, Text } from "react-native";
import React from "react";
import CreatePass from "../../../components/otp_pass/CreatePass";

const forgateCreatePass = () => {
  return <CreatePass buttonTittle="Change Password" route="/login" />;
};

export default forgateCreatePass;
