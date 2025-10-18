import React from "react";
import { Platform } from "react-native";
import FlashMessageManager from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const FlashMessage = () => {
  const { top } = useSafeAreaInsets();

  return (
    <FlashMessageManager
      testID={"Alert"}
      accessibilityLabel={"Alert"}
      accessible={true}
      position="top"
      floating
      duration={6000}
      statusBarHeight={Platform.OS === "ios" ? 60 : top}
      animated={true}
      animationDuration={200}
    />
  );
};

export default FlashMessage;
