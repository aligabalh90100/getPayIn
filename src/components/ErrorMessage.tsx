import React from "react";
import { StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";

interface TErrorMessage {
  message: string;
}
const ErrorMessage = ({ message }: TErrorMessage) => {
  return <CustomText style={styles.message}>{message}</CustomText>;
};

const styles = StyleSheet.create({
  message: { marginTop: 4, color: Colors["dark"].error },
});
export default ErrorMessage;
