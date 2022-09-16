import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tagSlice from "./slices/tagSlice/tagSlice";
import couponSlice from "./slices/couponsSlice";
import contactSlice from "./slices/contactSlice"
import authSlice from "./slices/authSlice";
import confirmSlice from "./slices/confirmSlice";
import loginSlice from "./slices/loginSlice";
import checkSlice from "./slices/checkSlice";
import changePasswordSlice from "./slices/changePasswordSlise/index";
import recoveryPasswordSlise from "./slices/recoveryPasswordSlise/index";
import changePhoneSlice from "./slices/changePhoneSlice";

export const store = configureStore({
  reducer: {
    coupons: couponSlice,
    tag: tagSlice,
    contacts: contactSlice,
    auth: authSlice,
    confirm: confirmSlice,
    login: loginSlice,
    check: checkSlice,
    changePassword: changePasswordSlice,
    recoveryRassword: recoveryPasswordSlise,
    changePhone: changePhoneSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
