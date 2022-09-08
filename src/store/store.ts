import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactSlice from "./slices/contactSlice"
import couponSlice from './slices/couponsSlice';
import searchSlice from './slices/searchSlice';


export const store = configureStore({
  reducer: {
    contacts: contactSlice,
    coupons: couponSlice,
    search: searchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
