import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface TLoading extends PropsWithChildren {
  loading: boolean;
  style?: StyleProp<ViewStyle>;
}
const Loading = ({ loading, children, style }: TLoading) => {
  if (loading)
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  return children;
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default Loading;
