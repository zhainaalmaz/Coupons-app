import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { recoveryPassword } from "../../../api/api";

interface IInitialState {
    status: string;
    error?: string;
}

const initialState: IInitialState = {
    status: 'loading',
    error: ''
};

export const recoveryPasswordThunk = createAsyncThunk(
    'recoveryPassword',
    async (data: object) => {
        const response = await recoveryPassword(data)
        return response
    }
)

const recoveryPasswordSlise = createSlice({
    name: "recoveryPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(recoveryPasswordThunk.pending, (state) => {
                state.status = "loading"
            }).addCase(recoveryPasswordThunk.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.error = action.meta.requestStatus
                console.log('fulfilled');

                // localStorage.setItem('currentUser', JSON.stringify(action.payload))

            }).addCase(recoveryPasswordThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
                console.log(state.status);
                console.log(state.error);


                // Request failed with status code 400
            })
    },

})


export const recoveryPasswordAction = recoveryPasswordSlise.actions;
export default recoveryPasswordSlise.reducer;