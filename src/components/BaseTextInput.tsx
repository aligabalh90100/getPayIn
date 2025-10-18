import React, { FC, ReactNode, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ErrorMessage from "./ErrorMessage";
import CustomText from "./CustomText";
import { Colors } from "@/constants/Colors";
import { SvgProps } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

interface TBaseTextInput<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  containerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  showErrors?: boolean;
  IconRight?: FC<SvgProps>;
  isPassword?: boolean;
  rightComponent?: ReactNode;
  onIconRightPress?: VoidFunction;
}
const BaseTextInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  containerStyles,
  inputStyles,
  showErrors = true,
  placeholder,
  onIconRightPress,
  IconRight,
  rightComponent,
  isPassword = false,
  ...rest
}: TBaseTextInput<T>) => {
  const themeColors = useThemeColor();
  const [isFocused, setIsFocused] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(isPassword);

  function toggleSecurePassword() {
    setIsPasswordVisible((prev) => !prev);
  }
  const renderRightAccessory = () => {
    if (rightComponent) return rightComponent;
    if (isPassword)
      return (
        <TouchableOpacity onPress={toggleSecurePassword} hitSlop={20}>
          {isPasswordVisible ? (
            <Feather name="eye-off" size={18} color={themeColors.text + "99"} />
          ) : (
            <Feather name="eye" size={18} color={themeColors.text + "99"} />
          )}
        </TouchableOpacity>
      );
    else return null;
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <CustomText style={styles.label}>{label}</CustomText>

          <View
            style={[
              styles.inputContainer,
              containerStyles,
              isFocused && { borderColor: themeColors.button },
              error && showErrors && styles.error,
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              placeholderTextColor={themeColors.text}
              autoCapitalize="none"
              placeholder={placeholder || ""}
              secureTextEntry={isPasswordVisible}
              {...rest}
              style={[styles.input, { color: themeColors.text }, inputStyles]}
            />
            {renderRightAccessory()}
          </View>
          {error && showErrors && <ErrorMessage message={error.message!} />}
        </View>
      )}
      rules={rules}
    />
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 4,
  },
  label: { fontWeight: 500, fontSize: 16 },
  input: { flex: 1 },
  error: { borderColor: Colors.dark.error },
});

export default BaseTextInput;
