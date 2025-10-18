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
    <HomeHeader
      style={[
        styles.header,
        style,
        { marginTop: Platform.OS === "ios" ? 60 : statusBarHeight },
      ]}
    >
      {withBack && (
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Feather name="chevron-left" size={20} />
        </TouchableOpacity>
      )}
      {title && <CustomText style={styles.title}>{title}</CustomText>}
      {children && (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            end: 20,
            top: Platform.OS === "ios" ? statusBarHeight + 14 : null,
          }}
        >
          {children}
        </View>
      )}
    </HomeHeader>
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
    left: 10,
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
