import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getMainImg} from "../../../api/api";

export interface mainImgState{
    img:[],
    status : "idle" | "loading" | "failed"
}

const initialState: mainImgState = {
    img:[],
    status: "loading"
}

export const getMainImgAsinc = createAsyncThunk<any, void, {}>(
    "mainImg/getMainImg",
    async () => {
        const response = await getMainImg()
        return response.data
    }
)

export const getMainImgSlice = createSlice({
    name: "mainImgState",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getMainImgAsinc.pending, (state => {
                state.status = "loading"
            }))
            .addCase(getMainImgAsinc.fulfilled, ((state, action) => {
                state.img = action.payload
                state.status = "idle"
            })).addCase(getMainImgAsinc.rejected, (state => {
            state.status = "failed"
        }))
    })
})
export default getMainImgSlice.reducer