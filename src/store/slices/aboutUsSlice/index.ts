import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAboutUsInfo } from "../../../api/api";

interface IAboutInfo {
  data: "";
  status: "idle" | "loading" | "error";
}

const initialState: IAboutInfo = {
  data: "",
  status: "loading",
};

export const aboutsUsInfo = createAsyncThunk<any, void, {}>(
  "aboutUs",
  async () => {
    try {
      const response = await getAboutUsInfo();
      return response.data.description;
    } catch (error) {
      console.log(error, "error");
    }
  }
);

const aboutsUsSlice = createSlice({
  name: "help",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(aboutsUsInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(aboutsUsInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(aboutsUsInfo.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const helpInfo = aboutsUsSlice.actions;
export default aboutsUsSlice.reducer;
