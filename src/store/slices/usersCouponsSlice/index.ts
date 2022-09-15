import { createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "../../../components/CouponDetails/CouponDetails";

interface IUsersCoupons {
  token: string;
  boughtCoupons: [];
  activatedCoupons: [];
}

const initialState = {
  usersCoupons: localStorage.getItem("usersCoupons")
    ? JSON.parse(localStorage.getItem("usersCoupons") || "")
    : ([] as IUsersCoupons[]),
};

const usersCouponsSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    buyUsersCoupon: (state, action) => {
      const user =
        localStorage.getItem("currentUser") &&
        JSON.parse(localStorage.getItem("currentUser") || "");

      const usersCoupons = state.usersCoupons.find(
        (item: IUsersCoupons) => item.token === user.access
      );

      if (!usersCoupons) {
        state.usersCoupons.push({
          token: user.access,
          boughtCoupons: [action.payload],
          activatedCoupons: [],
        });
        localStorage.setItem(
          "usersCoupons",
          JSON.stringify(state.usersCoupons)
        );
      }

      if (usersCoupons) {
        const newUsersCoupons: any = { ...usersCoupons };
        newUsersCoupons.boughtCoupons.push(action.payload);
        const filteredCoupons: object[] = state.usersCoupons.filter(
          (item: IUsersCoupons) => item.token !== user.access
        );
        filteredCoupons.push(newUsersCoupons);

        localStorage.setItem("usersCoupons", JSON.stringify(filteredCoupons));
        state = { ...state, usersCoupons: filteredCoupons };
      }
    },
    activateUsersCoupon: (state, action) => {
      const user =
        localStorage.getItem("currentUser") &&
        JSON.parse(localStorage.getItem("currentUser") || "");

      const usersCoupons = state.usersCoupons.find(
        (item: IUsersCoupons) => item.token === user.access
      );

      if (usersCoupons) {
        const newUsersCoupons: any = { ...usersCoupons };

        newUsersCoupons.activatedCoupons.push(action.payload);
        newUsersCoupons.boughtCoupons = newUsersCoupons.boughtCoupons.filter(
          (item: any) => item.id !== action.payload.id
        );

        const filteredUsersCoupons: object[] = state.usersCoupons.filter(
          (item: IUsersCoupons) => item.token !== user.access
        );
        filteredUsersCoupons.push(newUsersCoupons);

        state.usersCoupons = filteredUsersCoupons;
        localStorage.setItem(
          "usersCoupons",
          JSON.stringify(filteredUsersCoupons)
        );
      }
    },
  },
});

export const { buyUsersCoupon, activateUsersCoupon } =
  usersCouponsSlice.actions;
export default usersCouponsSlice.reducer;
