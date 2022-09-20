import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCouponDetails } from "../../../api/api";

export interface CouponDetailsState {
  coupon: any;
  status: "idle" | "loading" | "failed";
}

const initialState: CouponDetailsState = {
  coupon: {},
  status: "loading",
};

export const getCouponAsync = createAsyncThunk<any, any, {}>(
  "coupons/getCouponsId",
  async (id) => {
    const response = await getCouponDetails(id);
    return response.data;
  }
);

export const CouponDetailsState = createSlice({
  name: "CouponDetailsState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCouponAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCouponAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("NEW ID !!!");

        state.coupon = action.payload;
      })
      .addCase(getCouponAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default CouponDetailsState.reducer;
