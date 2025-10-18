import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBar } from "react-native";
export interface SettingsState {
  theme: "light" | "dark";
  networkConnected: boolean;
  sessionExpired: boolean;
}

const initialState: SettingsState = {
  theme: "light",
  networkConnected: true,
  sessionExpired: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      StatusBar.setBarStyle(
        state.theme === "light" ? "dark-content" : "light-content"
      );
    },
    setNetworkStatus(state, action: PayloadAction<boolean>) {
      state.networkConnected = action.payload;
    },
    setSessionExpire(state, action: PayloadAction<boolean>) {
      state.sessionExpired = action.payload;
    },
  },
});

export const { toggleTheme, setNetworkStatus, setSessionExpire } =
  settingsSlice.actions;

export default settingsSlice.reducer;
