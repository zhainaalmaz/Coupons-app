import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../api/api";

interface IInitialState {
    firstName: string;
    surname: string;
    phone?: string;
    password: string;
    password_confirm: string;
    status: string;
    error?: string;
}

const initialState: IInitialState = {
    firstName: '',
    surname: '',
    phone: '',
    password: '',
    password_confirm: '',
    status: 'loading',
    error: ''
};

export const authThunk = createAsyncThunk(
    'signup',
    async (data: object) => {
        const response = await auth(data)
        console.log(response);
        return response
    }
)

const authSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.pending, (state) => {
                state.status = "loading"

            }).addCase(authThunk.fulfilled, (state, action) => {
                state.status = "fulfilled"
                
            }).addCase(authThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
                // Request failed with status code 400
            })
    },

})


export const signupAction = authSlice.actions;
export default authSlice.reducer;