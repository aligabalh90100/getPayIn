import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductsByCategoryScreen from "../screens/ProductsByCategoryScreen";
import { IProductByCategoryParams } from "../routes";
import { useThemeColor } from "@/hooks/useThemeColor";
import BottomTabNavigator from "../bottomTabNavigator";
import { AutoLogoutProvider } from "@/context/AutoLogoutProvider";
import SessionExpiresModal from "@/components/SessionExpiresModal";

type AppStackParamList = {
  ProductsByCategory: IProductByCategoryParams;
  Tabs: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  const themeColors = useThemeColor();
  const { bottom } = useSafeAreaInsets();
  return (
    <AutoLogoutProvider>
      <SessionExpiresModal />
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: themeColors.background,
            marginBottom: Platform.OS === "android" ? bottom : 0,
          },
        }}
      >
        <AppStack.Screen name="Tabs" component={BottomTabNavigator} />
        <AppStack.Screen
          name="ProductsByCategory"
          component={ProductsByCategoryScreen}
        />
      </AppStack.Navigator>
    </AutoLogoutProvider>
  );
};

export default AppStackNavigator;
