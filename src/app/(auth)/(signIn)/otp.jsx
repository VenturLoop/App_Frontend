import { View, Text } from "react-native";
import React from "react";
import Otp from "../../../components/otp_pass/Otp";

const otp = () => {
  return (
    <>
      <Otp buttonRoute="createPass" />
    </>
  );
};

export default otp;
