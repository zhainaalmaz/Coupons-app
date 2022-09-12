import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
}

const initialState: IInitialState = {
  status: "loading",
  error: "",
};

export const changePasswordThunk = createAsyncThunk(
  "changePassword",
  async (data: object) => {
    const response = await changePassword(data);
    return response;
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.meta.requestStatus;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const changePasswordAction = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
