import { View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomText from "@/components/CustomText";
import { useAppDispatch } from "@/services/redux";
import useAppNavigation from "../routes";
import SecureStorage from "@/services/secureStorage";
import { getAuthUser } from "@/network/auth";
import { setUser } from "@/services/redux/userSlice";
import useBiometrics from "@/hooks/useBiometrics";

const SplashScreen = () => {
  const themeColors = useThemeColor();
  const dispatch = useAppDispatch();
  const { authenticateBiometrics } = useBiometrics();
  const { replace } = useAppNavigation();
  const validateUser = useCallback(async () => {
    const token = SecureStorage.get("getPayInToken");
    if (!token) {
      return replace("Auth");
    }
    try {
      const response = await getAuthUser(token);
      if (response) {
        const result = await authenticateBiometrics();
        if (result?.success) {
          dispatch(setUser(response));
          replace("App");
        } else {
          return replace("Auth");
        }
      }
    } catch (error) {
      console.log(error);
      return replace("Auth");
    }
  }, []);
  useEffect(() => {
    validateUser();
  }, [validateUser]);
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
