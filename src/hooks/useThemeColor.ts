import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/services/redux";

export function useThemeColor() {
  const { theme } = useAppSelector((state) => state.settings);

  return Colors[theme];
}
