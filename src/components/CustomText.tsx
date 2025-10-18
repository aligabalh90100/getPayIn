import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface ICustomTextProps extends TextProps, PropsWithChildren {
  style?: StyleProp<TextStyle>;
}

const CustomText = ({ style, children, ...rest }: ICustomTextProps) => {
  const themeColors = useThemeColor();
  return (
    <Text
      allowFontScaling={false}
      style={[{ color: themeColors.text }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
