import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContactInfo } from "../../../api/api";

export interface InfoState {
    vk: string
    insta: string
    facebook: string
    odnoklassniki: string
    wa: string | null
    email: string | null
    phone: string | null
    status: string
}


const initialState: InfoState = {
    vk: "", 
    insta: "", 
    facebook: "", 
    odnoklassniki:"",
    wa: "", 
    email:"",
    phone: "", 
    status: "loading"
}

export const getContactAsync = createAsyncThunk<any, void, {}>(
    'contact/getContactInfo', 
    async () => {
        const response = await getContactInfo()
        return response.data
    }
)

export const contactSlice = createSlice({
    name: "InfoState", 
    initialState, 
    reducers: {
    }, 
    extraReducers: (builder) => {
    builder
    .addCase(getContactAsync.pending , (state) => {
            state.status = "loading"
    }).addCase(getContactAsync.fulfilled, (state, action) => {
        state.status = "finished"
        state.vk = action.payload.vkontakte
        state.insta = action.payload.instagram
        state.facebook = action.payload.facebook
        state.odnoklassniki = action.payload.odnoklassniki
        state.wa = action.payload.whatsapp
        state.email = action.payload.email
        state.phone = action.payload.phone
        }).addCase(getContactAsync.rejected , (state) => {
            state.status = "failed"
        })
    }
})

export default contactSlice.reducer