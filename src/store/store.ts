import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import couponSlice from './slices/couponsSlice';

export const store = configureStore({
  reducer: {
    coupons: couponSlice,

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
