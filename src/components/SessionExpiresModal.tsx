import React, { forwardRef } from "react";
import {
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import CustomText from "./CustomText";
import { useThemeColor } from "@/hooks/useThemeColor";
import BaseButton from "./BaseButton";
import { useAppDispatch, useAppSelector } from "@/services/redux";
import useAppNavigation from "@/navigation/routes";
import { setSessionExpire } from "@/services/redux/settingSlice";

type TModalProps = Partial<ModalProps>;

interface TBaseModal extends TModalProps {
  header?: string;
  contentCustomStyles?: StyleProp<ViewStyle>;
}

export interface BaseModalRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SessionExpiresModal = forwardRef<BaseModalRef, TBaseModal>(
  ({ children, header, contentCustomStyles, ...rest }, ref) => {
    const { reset } = useAppNavigation();
    const dispatch = useAppDispatch();
    const { sessionExpired } = useAppSelector((state) => state.settings);
    const themeColors = useThemeColor();
    function handleBackToLogin() {
      dispatch(setSessionExpire(false));
      reset({ index: 0, routes: [{ name: "Auth" }] });
    }
    return (
      <Modal
        visible={sessionExpired}
        style={[styles.modal]}
        transparent
        {...rest}
      >
        <View style={[styles.container]}>
          <View
            style={[
              styles.content,
              { backgroundColor: themeColors.background },
            ]}
          >
            <CustomText style={styles.text}>Session Expired</CustomText>
            <BaseButton onPress={handleBackToLogin}>
              Back to login screen
            </BaseButton>
          </View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  modal: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
    gap: 20,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: 700,
  },
});
SessionExpiresModal.displayName = "SessionExpiresModal";
export default SessionExpiresModal;
