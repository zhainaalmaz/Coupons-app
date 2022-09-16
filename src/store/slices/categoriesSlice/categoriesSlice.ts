import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getCategories} from "../../../api/api";

export interface CategoriesState {
    id: number,
    title:string,
    subcategories:[],
    status : "idle" | "loading" | "failed"
}

const initialState: CategoriesState = {
    id: 0,
    title: "",
    subcategories: [],
    status: "idle"
}

export const getCategoriesAsync = createAsyncThunk<any, void, {}>(
    'Categories/getCategories',
    async () => {
        const response = await getCategories();
        return response.data[0];
    }
);

export const categoriesSlice = createSlice({
    name:"CategoriesState",
    initialState,
    reducers:{},
    extraReducers: (builder => {
        builder
            .addCase(getCategoriesAsync.pending, (state => {
                state.status ="loading"
            })).addCase(getCategoriesAsync.fulfilled, ((state, action) => {
            state.status="idle"
            state.id = action.payload.id
            state.subcategories = action.payload.subcategories
            state.title = action.payload.title
        })).addCase(getCategoriesAsync.rejected , state => {
            state.status = "failed"
        })
    })
})
export default categoriesSlice.reducer