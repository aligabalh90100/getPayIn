import { PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import Loading from "./Loading";
import { Colors } from "@/constants/Colors";

interface TBaseButton extends PropsWithChildren<TouchableOpacityProps> {
  loading?: boolean;
  textColor?: string;
}

const BaseButton = ({
  loading = false,
  children,
  textColor,
  style,
  disabled,
  ...rest
}: TBaseButton) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabledButton, style]}
      onPress={rest.onPress}
      {...rest}
    >
      {children && (
        <Loading loading={loading}>
          <Text style={styles.text}>{children}</Text>
        </Loading>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.button,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
  },
  disabledButton: {
    backgroundColor: Colors.dark.disabledButton,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});
export default BaseButton;
