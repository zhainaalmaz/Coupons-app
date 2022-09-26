import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { join } from "path";
import { login } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
}

const initialState: IInitialState = {
  status: "loading",
  error: "",
};

export const loginThunk = createAsyncThunk("login", async (data: object) => {
  const response = await login(data);
  return response;
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.meta.requestStatus;

        const localToken = { ...action.payload }.access.split(".");
        const token = localToken[0] + Date.now()

        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...action.payload, token: token })
        );
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const loginmAction = loginSlice.actions;
export default loginSlice.reducer;
