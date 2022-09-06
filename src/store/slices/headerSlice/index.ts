import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHeaderPhone } from "../../../api/api";

export interface PhoneState {
    phone: string | null
    status: string
}


const initialState: PhoneState = {
    phone: "", 
    status: "loading"
}

export const getPhoneAsync = createAsyncThunk<any, void, {}>(
    'phone/getPone', 
    async () => {
        const response = await getHeaderPhone()
        return response.data
    }
)

export const headerSlice = createSlice({
    name: "PhoneState", 
    initialState, 
    reducers: {
    }, 
    extraReducers: (builder) => {
    builder
    .addCase(getPhoneAsync.pending , (state) => {
            state.status = "loading"
        }).addCase(getPhoneAsync.fulfilled , (state, action) => {
            state.status = "finished"
            state.phone = action.payload.phone
        }).addCase(getPhoneAsync.rejected , (state) => {
            state.status = "failed"
        })
    }
})

export default headerSlice.reducer