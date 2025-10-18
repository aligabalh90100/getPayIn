import { showMessage } from "react-native-flash-message";

export function successToast(message: string) {
  showMessage({ message, type: "success", icon: "success" });
}
export function errorToast(message: string) {
  showMessage({ message, type: "danger", icon: "danger" });
}
