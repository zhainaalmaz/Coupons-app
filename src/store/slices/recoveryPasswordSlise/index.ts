import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recoveryPassword, recoveryPasswordConfirm } from "../../../api/api";

interface IInitialState {
  status: string;
  error?: string;
}

interface IState {
  recoveryPassword: IInitialState;
  recoveryPasswordConfirm: IInitialState;
}

const initialState: IState = {
  recoveryPassword: {
    status: "loading",
    error: "",
  },
  recoveryPasswordConfirm: {
    status: "loading",
    error: "",
  },
};

export const recoveryPasswordThunk = createAsyncThunk(
  "recoveryPassword",
  async (data: object) => {
    const response = await recoveryPassword(data);
    return response;
  }
);

export const recoveryPasswordConfirmThunk = createAsyncThunk(
  "recoveryConfirmPassword",
  async (data: object) => {
    const response = await recoveryPasswordConfirm(data);
    return response;
  }
);

const recoveryPasswordSlise = createSlice({
  name: "recoveryPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recoveryPasswordThunk.pending, (state) => {
        state.recoveryPassword.status = "loading";
      })
      .addCase(recoveryPasswordThunk.fulfilled, (state, action) => {
        state.recoveryPassword.status = "fulfilled";
        state.recoveryPassword.error = action.meta.requestStatus;
      })
      .addCase(recoveryPasswordThunk.rejected, (state, action) => {
        state.recoveryPassword.status = "rejected";
        state.recoveryPassword.error = action.error.message;
        console.log(state.recoveryPassword.error);
      })

      .addCase(recoveryPasswordConfirmThunk.pending, (state) => {
        state.recoveryPasswordConfirm.status = "loading";
      })
      .addCase(recoveryPasswordConfirmThunk.fulfilled, (state, action) => {
        state.recoveryPasswordConfirm.status = "fulfilled";
        state.recoveryPasswordConfirm.error = action.meta.requestStatus;
      })
      .addCase(recoveryPasswordConfirmThunk.rejected, (state, action) => {
        state.recoveryPasswordConfirm.status = "rejected";
        state.recoveryPasswordConfirm.error = action.error.message;
        console.log(state.recoveryPasswordConfirm.error);
      });
  },
});

export const recoveryPasswordAction = recoveryPasswordSlise.actions;
export default recoveryPasswordSlise.reducer;
