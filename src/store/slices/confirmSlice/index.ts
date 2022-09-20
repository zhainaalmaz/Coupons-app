import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { confirm, newPhoneConfirm } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
  statusCode?: number | string;
}

interface IState {
  loginConfirm: IInitialState;
  newPhoneConfirm: IInitialState;
}

const initialState: IState = {
  loginConfirm: {
    status: "loading",
    error: "",
    statusCode: "",
  },
  newPhoneConfirm: {
    status: "loading",
    error: "",
    statusCode: "",
  },
};

export const confirmThunk = createAsyncThunk(
  "confirm",
  async (data: object) => {
    const response = await confirm(data);
    return response;
  }
);
export const newPhoneConfirmThunk = createAsyncThunk(
  "newPhoneConfirmThunk",
  async (data: object) => {
    const response = await newPhoneConfirm(data);
    return response;
  }
);

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmThunk.pending, (state) => {
        state.loginConfirm.status = "loading";
      })
      .addCase(confirmThunk.fulfilled, (state, action) => {
        state.loginConfirm.status = "fulfilled";
        state.loginConfirm.statusCode = action.payload.status;
      })
      .addCase(confirmThunk.rejected, (state, action) => {
        state.loginConfirm.status = "rejected";
        state.loginConfirm.error = action.error.message;
      })

      .addCase(newPhoneConfirmThunk.pending, (state) => {
        state.newPhoneConfirm.status = "loading";
      })
      .addCase(newPhoneConfirmThunk.fulfilled, (state, action) => {
        state.newPhoneConfirm.status = "fulfilled";

        const newPhone = JSON.parse(localStorage.getItem("userPhone") || "")
        const user = JSON.parse(localStorage.getItem("currentUser") || "")

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...user,
            phone: newPhone
          })
        );

        state.newPhoneConfirm.statusCode = action.payload.message;
      })
      .addCase(newPhoneConfirmThunk.rejected, (state, action) => {
        state.newPhoneConfirm.status = "rejected";
        state.newPhoneConfirm.error = action.error.message;
      });
  },
});

export const confirmAction = confirmSlice.actions;
// export const { resetStatusConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
