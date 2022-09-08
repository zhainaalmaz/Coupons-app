import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import couponSlice from './slices/couponsSlice';
import categoriesSlice from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    coupons: couponSlice,
    categories: categoriesSlice
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
