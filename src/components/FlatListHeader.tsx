import { StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const FlatListHeader = ({ title }: { title: string }) => {
  return <CustomText style={styles.title}>Products List</CustomText>;
};
const styles = StyleSheet.create({ title: { fontSize: 16, fontWeight: 600 } });
export default FlatListHeader;
