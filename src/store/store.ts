import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tagSlice from "./slices/tagSlice/tagSlice";
import couponSlice from "./slices/couponsSlice";
import confidentialSlice from "./slices/confidentialSlice";

import contactSlice from "./slices/contactSlice";
import categoriesSlice from "./slices/CarouselSlice/CarouselSlice";
import helpInfoSlice from "./slices/helpInfoSlice/helpInfoSlice";
import searchSlice from "./slices/searchSlice";
import authSlice from "./slices/authSlice";
import confirmSlice from "./slices/confirmSlice";
import loginSlice from "./slices/loginSlice";
import checkSlice from "./slices/checkSlice";
import favoriteSlice from "./slices/favoriteSlice/favoriteSlice";
import couponDetailsSlice from "./slices/couponDetailsSlice";

import carouselSice from "./slices/CarouselSlice/CarouselSlice";
import mainImgSlice from "./slices/MainImgSlice/MainImgSlice";

export const store = configureStore({
  reducer: {
    coupons: couponSlice,
    tag: tagSlice,
    contacts: contactSlice,
    help: helpInfoSlice,
    categories: categoriesSlice,
    search: searchSlice,
    confidential: confidentialSlice,
    auth: authSlice,
    confirm: confirmSlice,
    login: loginSlice,
    check: checkSlice,
    favorite: favoriteSlice,
    carousel: carouselSice,
    mainImg: mainImgSlice,
    couponDetails: couponDetailsSlice
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
