import useAutoLogout from "@/hooks/useAutoLogout";
import React, { createContext, useContext } from "react";

const AutoLogoutContext = createContext<{ resetTimer: () => void } | null>(
  null
);

export const AutoLogoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { resetTimer } = useAutoLogout();
  return (
    <AutoLogoutContext.Provider value={{ resetTimer }}>
      {children}
    </AutoLogoutContext.Provider>
  );
};

export const useResetTimer = () => {
  const ctx = useContext(AutoLogoutContext);
  if (!ctx)
    throw new Error("useResetTimer must be used inside AutoLogoutProvider");
  return ctx.resetTimer;
};
