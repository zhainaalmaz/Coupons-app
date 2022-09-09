import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUSer } from "../../../api/api";

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

export const checkThunk = createAsyncThunk(
    'check',
    async (data: object) => {
        // console.log(data);

        const response = await checkUSer(data)
        // console.log(response);
        return response
    }
)

const checkSlice = createSlice({
    name: "check",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkThunk.pending, (state) => {
                state.status = "loading"
            }).addCase(checkThunk.fulfilled, (state, action) => {
                state.status = "fulfilled"
                console.log(action.payload);
                state.statusCode = action.payload.status


            }).addCase(checkThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
                console.log('confirm-error:', action.error.message)
                // Request failed with status code 403
                // Request failed with status code 400
            })
    },

})


export const checkAction = checkSlice.actions;
export default checkSlice.reducer;