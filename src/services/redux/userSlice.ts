import { ILoginResponse } from "@/network/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser extends ILoginResponse {
  isAdmin?: boolean;
}
export interface IUserSlice {
  user: null | IUser;
}

const initialState: IUserSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      state.user = {
        ...action.payload,
        isAdmin: action.payload.username === "emilys",
      };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
