import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConfidentials } from "../../../api/api";

export interface ConfidentialState {
    title: string
    description: string
    isLoading: boolean
}


const initialState: ConfidentialState = {
    title: "", 
    description: "", 
    isLoading:true
}

export const getConfidentialtAsync = createAsyncThunk<any, void, {}>(
    'info/getConfidentialInfo', 
    async () => {
        const response = await getConfidentials()
        return response.data
    }
)

export const confidentialSlice = createSlice({
    name: "ConfidentialState", 
    initialState, 
    reducers: {
    }, 
    extraReducers: (builder) => {
    builder
    .addCase(getConfidentialtAsync.pending , (state) => {
            state.isLoading = true
    }).addCase(getConfidentialtAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.title = action.payload.title
        state.description = action.payload.description
        }).addCase(getConfidentialtAsync.rejected , (state) => {
            state.isLoading = true
        })
    }
})

export default confidentialSlice.reducer