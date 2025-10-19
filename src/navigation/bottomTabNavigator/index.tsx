import React from "react";
import { Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

import ProductsScreen from "../screens/ProductsScreen";
import MyTabBar from "@/components/MyTabBar";
import { useAppDispatch } from "@/services/redux";
import { clearUser } from "@/services/redux/userSlice";
import useAppNavigation from "../routes";

type AppTabParamList = {
  Products: undefined;
  Logout: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const BottomTabNavigator = () => {
  const dispatch = useAppDispatch();
  const { reset } = useAppNavigation();
  const themeColors = useThemeColor();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          reset({ index: 0, routes: [{ name: "Auth" }] });
          dispatch(clearUser());
        },
      },
    ]);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.tint,
        sceneStyle: { backgroundColor: themeColors.background },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="Products"
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
