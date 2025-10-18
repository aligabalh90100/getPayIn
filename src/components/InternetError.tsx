import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";

const InternetError = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        You are offline check your internet connection
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.error,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: { fontWeight: 500, fontSize: 16 },
});
export default InternetError;
