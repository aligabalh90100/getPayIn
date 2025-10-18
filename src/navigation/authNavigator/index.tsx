import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const themeColors = useThemeColor();
  const { bottom } = useSafeAreaInsets();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: themeColors.background,
          marginBottom: Platform.OS === "android" ? bottom : 0,
        },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
