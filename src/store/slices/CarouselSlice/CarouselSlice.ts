import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getCarousel} from "../../../api/api";

export interface carouselState{
    img:[],
    status : "idle" | "loading" | "failed"
}

const initialState: carouselState = {
    img:[],
    status: "idle"
}

export const getCarouselAsync = createAsyncThunk<any, void, {}>(
    "carousel/getCarousel",
    async () => {
        const response = await getCarousel()
        return response.data
    }
)

export const  carouselSice = createSlice({
    name: "CarouselState",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getCarouselAsync.pending, (state => {
                state.status = "loading"
            }))
            .addCase(getCarouselAsync.fulfilled, ((state, action) => {
                state.img = action.payload
                state.status = "idle"
            })).addCase(getCarouselAsync.rejected, (state => {
            state.status = "failed"
        }))
    })

})
export default carouselSice.reducer