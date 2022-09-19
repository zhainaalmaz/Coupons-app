import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userName: string;
}

const initialState: IUser = {
  userName: "",
};

export const userSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setUser: (state) => {
      const user =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user") || "");

      state.userName = user.first_name;
    },
    clearUser: (state) => {
      state.userName = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
