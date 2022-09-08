import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tagSlice from "./slices/tagSlice/tagSlice";
import couponSlice from "./slices/couponsSlice";
import contactSlice from "./slices/contactSlice"
import categoriesSlice from "./slices/categoriesSlice";
import helpInfoSlice from './slices/helpInfoSlice/helpInfoSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    coupons: couponSlice,
    tag: tagSlice,
    contacts: contactSlice,
    help: helpInfoSlice,
    categories: categoriesSlice,
    search: searchSlice,
  }})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
