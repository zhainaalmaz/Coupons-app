import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePhone } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
}

const initialState: IInitialState = {
  status: "loading",
  error: "",
};

export const changePhoneThunk = createAsyncThunk(
  "changePhone",
  async (data: object) => {
    const response = await changePhone(data);
    return response;
  }
);

const changePhoneSlice = createSlice({
  name: "changePhone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePhoneThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePhoneThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(changePhoneThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const changePhoneAction = changePhoneSlice.actions;
export default changePhoneSlice.reducer;
