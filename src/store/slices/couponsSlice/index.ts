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

export const getCouponsAsync = createAsyncThunk<any, void, {}>(
    'coupons/getCoupons',
    async () => {
        // console.log('asd')
        const response = await getCoupons();
        return response.data;
    }
);

export const couponsSlice = createSlice({
    name: 'CouponState',
    initialState,
    reducers: {
        // getCouponsAsync:((state, action) => {
        //     state = {...action.payload.results}
        // })
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCouponsAsync.pending , (state) => {
            // console.log(state, "state")
            state.status = "loading"
        }).addCase(getCouponsAsync.fulfilled , (state, action) => {
            // console.log(action.payload, "action")
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
