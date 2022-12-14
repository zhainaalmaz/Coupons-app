import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userName: string;
}

const user =
  localStorage.getItem("currentUser") &&
  JSON.parse(localStorage.getItem("currentUser") || "");

const initialState: IUser = {
  userName: user?.first_name,
};

export const userSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setUser: (state) => {
      const user =
        localStorage.getItem("currentUser") &&
        JSON.parse(localStorage.getItem("currentUser") || "");

      state.userName = user.first_name;
    },
    clearUser: (state) => {
      state.userName = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
