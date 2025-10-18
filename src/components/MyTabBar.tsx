import React from "react";
import { View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomText from "./CustomText";
import { useResetTimer } from "@/context/AutoLogoutProvider";

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const themeColors = useThemeColor();
  const { colors } = useTheme();
  const resetTimer = useResetTimer();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 65,
        backgroundColor: themeColors.background,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label: string =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? (options.title as string)
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          resetTimer();
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          resetTimer();
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // If user set tabBarIcon, call it, otherwise fallback
        const Icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon
            : ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="ellipse" color={color} size={size} />
              );

        return (
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              color={isFocused ? colors.primary : themeColors.text}
              size={22}
              focused={isFocused}
            />
            <CustomText
              style={{
                color: isFocused ? colors.primary : themeColors.text,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </CustomText>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default MyTabBar;
