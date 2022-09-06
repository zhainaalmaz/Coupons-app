import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import headerSlice from "./slices/headerSlice"
import counterReducer from "./slices/counterSlice"

export const store = configureStore({
  reducer: {
    header: headerSlice,
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
