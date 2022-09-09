import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tagSlice from './slices/tagSlice/tagSlice';
import couponSlice from './slices/couponsSlice';
import contactSlice from './slices/contactSlice';
import helpInfoSlice from './slices/helpInfoSlice/helpInfoSlice';
import favoriteSlice from './slices/favoriteSlice/favoriteSlice';

export const store = configureStore({
  reducer: {
    coupons: couponSlice,
    tag: tagSlice,
    contacts: contactSlice,
    help: helpInfoSlice,
    favorite: favoriteSlice,
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
