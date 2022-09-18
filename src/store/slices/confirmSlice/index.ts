import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { confirm } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
  statusCode?: number | string;
}

const initialState: IInitialState = {
  status: "loading",
  error: "",
  statusCode: "",
};

export const confirmThunk = createAsyncThunk(
  "confirm",
  async (data: object) => {
    return await confirm(data);
  }
);

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    // resetStatusConfirm(state) {
    //   state.statusCode = "";
    //   state.status = "loading";
    //   state.error = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.statusCode = action.payload.status;
      })
      .addCase(confirmThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
        console.log("error");
      });
  },
});

export const confirmAction = confirmSlice.actions;
// export const { resetStatusConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
