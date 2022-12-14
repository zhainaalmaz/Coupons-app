import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getCoupons} from '../../../api/api';


export interface CouponState {
    coupon: any
    count: number,
    next: string|null,
    prev : string|null,
    status : "idle" | "loading" | "failed"
}

const initialState: CouponState = {
    count: 0,
    next: "",
    coupon: [],
    prev: "",
    status: "idle"
};

export const getCouponsAsync = createAsyncThunk<any, number, {}>(
    'coupons/getCoupons',
    async (num:number) => {
        const response = await getCoupons( num );
        return response.data;
    }
);

export const couponsSlice = createSlice({
    name: 'CouponState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCouponsAsync.pending , (state) => {
            state.status = "loading"
        }).addCase(getCouponsAsync.fulfilled , (state, action) => {
            state.status = "idle"
            state.coupon = action.payload.results
            state.next = action.payload.next
            state.count = action.payload.count
            state.prev = action.payload.prev

        }).addCase(getCouponsAsync.rejected , (state) => {
            state.status = "failed"
        })
    }

});

export default couponsSlice.reducer;
