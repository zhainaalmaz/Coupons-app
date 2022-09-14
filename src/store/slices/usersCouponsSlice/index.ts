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
        });
        localStorage.setItem(
          "usersCoupons",
          JSON.stringify(state.usersCoupons)
        );
      }

      if (usersCoupons) {
        const newUsersCoupons: any = {...usersCoupons};
        newUsersCoupons.boughtCoupons.push(action.payload);

        console.log(newUsersCoupons, 'A_SD_ASD_AS_D')

        state.usersCoupons.filter(
          (item: IUsersCoupons) => item.token !== user.access
        );

        state.usersCoupons.push(newUsersCoupons);

        localStorage.setItem(
          "usersCoupons",
          JSON.stringify(state.usersCoupons)
        );
      }
    },
    activateUsersCoupon: (state, action) => {},
  },
});

export const { buyUsersCoupon, activateUsersCoupon } =
  usersCouponsSlice.actions;
export default usersCouponsSlice.reducer;
