import { View } from "react-native";
import React, { useEffect } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomText from "@/components/CustomText";
import { useAppSelector } from "@/services/redux";
import useAppNavigation from "../routes";

const SplashScreen = () => {
  const themeColors = useThemeColor();
  const { user } = useAppSelector((state) => state.user);
  const { replace } = useAppNavigation();
  useEffect(() => {
    setTimeout(() => {
      replace(user ? "App" : "Auth");
    }, 500);
  }, [user, replace]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeColors.background,
      }}
    >
      <CustomText style={{ fontSize: 20, fontWeight: 600 }}>
        GetPayIn
      </CustomText>
    </View>
  );
};

export default SplashScreen;
