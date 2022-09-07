import { FormValues } from "../../../components/auth/signup/Signup";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../../api/api";


const initialState: FormValues = {
    firstName: '',
    surname: '',
    phone: '',
    password: '',
    password_confirm: '',
};


const authThunk = createAsyncThunk(
    'signup',
    async () => {
        try {
            // const res = await auth()
        } catch (err) {
            console.error(err)
        }
    }

)


const authSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: {},

})


export const signupAction = authSlice.actions;
export default authSlice.reducer;