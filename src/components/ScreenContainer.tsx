import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

interface IScreenContainerProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const ScreenContainer = ({ style, children }: IScreenContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default ScreenContainer;
