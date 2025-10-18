import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { useThemeColor } from "@/hooks/useThemeColor";
type THeaderProps = PropsWithChildren<{
  onBack?: () => void;
  title?: string;
  withBack?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

const ScreenHeader = ({
  onBack,
  title,
  children,
  withBack = true,
  style,
}: THeaderProps) => {
  const themeColors = useThemeColor();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const { goBack } = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <View
      style={[
        styles.header,
        style,
        { marginTop: Platform.OS === "ios" ? 60 : statusBarHeight },
      ]}
    >
      {withBack && (
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Feather name="chevron-left" size={20} color={themeColors.text} />
        </TouchableOpacity>
      )}
      {title && <CustomText style={styles.title}>{title}</CustomText>}
      {children && children}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 40,
  },
  backBtn: {
    width: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
export default ScreenHeader;
