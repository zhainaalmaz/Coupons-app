import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchCoupons } from "../../../api/api";


export interface SearchCouponState {
    searchedCoupons: any
    isLoading: boolean
}


const initialState: SearchCouponState = {
    searchedCoupons: [],
    isLoading: true
};


export const getSearchedCouponsAsync = createAsyncThunk<any, string, {}>(
    'coupons/getAllCoupons',
    async (text: string) => {
        const response = await searchCoupons(text);
        return response.data;
    }
);


export const searchSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        clearState:(state)=> {
            state.searchedCoupons = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchedCouponsAsync.fulfilled, (state, action) => {
            state.searchedCoupons = action.payload.results;
            state.isLoading = false;
        })
        builder.addCase(getSearchedCouponsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
    },
});
export const {clearState} =  searchSlice.actions
export default searchSlice.reducer;