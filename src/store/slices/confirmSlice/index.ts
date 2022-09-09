import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { confirm } from "../../../api/api";

interface IInitialState {
    status: string;
    error?: string;
    statusCode?: number | string;
}

const initialState: IInitialState = {
    status: 'loading',
    error: '',
    statusCode: ''
};

export const confirmThunk = createAsyncThunk(
    'confirm',
    async (data: object) => {
        // console.log(data);
        
        const response = await confirm(data)
        // console.log(response);
        return response
    }
)

const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(confirmThunk.pending, (state) => {
                state.status = "loading"
            }).addCase(confirmThunk.fulfilled, (state, action) => {
                state.status = "fulfilled"
                // console.log(action);
                state.statusCode = action.payload.status

                
            }).addCase(confirmThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
                console.log('confirm-error:',action.error.message)
                // Request failed with status code 403
                // Request failed with status code 400
            })
    },

})


export const confirmAction = confirmSlice.actions;
export default confirmSlice.reducer;