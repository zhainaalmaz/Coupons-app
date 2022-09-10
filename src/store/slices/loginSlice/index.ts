import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../../api/api";

interface IInitialState {
    status: string;
    error?: string;
}

const initialState: IInitialState = {
    status: 'loading',
    error: ''
};

export const loginThunk = createAsyncThunk(
    'login',
    async (data: object) => {
        // console.log(data);

        const response = await login(data)
        // console.log(response);
        return response
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = "loading"
            }).addCase(loginThunk.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.error = action.meta.requestStatus

                localStorage.setItem('currentUser', JSON.stringify(action.payload))

            }).addCase(loginThunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
                console.log("login", action.error.message)

                // Request failed with status code 400
            })
    },

})


export const loginmAction = loginSlice.actions;
export default loginSlice.reducer;