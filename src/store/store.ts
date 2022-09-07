import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactSlice from "./slices/contactSlice"
import counterReducer from "./slices/counterSlice"

export const store = configureStore({
  reducer: {
    contacts: contactSlice,
    counter: counterReducer,
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
