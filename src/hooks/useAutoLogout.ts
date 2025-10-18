import { useAppDispatch } from "@/services/redux";
import { setSessionExpire } from "@/services/redux/settingSlice";
import { clearUser } from "@/services/redux/userSlice";
import { useCallback, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function useAutoLogout() {
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const logout = useCallback(() => {
    dispatch(clearUser());
    dispatch(setSessionExpire(true));
  }, [dispatch]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 10000);
  }, [logout]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      resetTimer();
    });

    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      sub.remove();
    };
  }, [logout, resetTimer]);

  return { resetTimer };
}
