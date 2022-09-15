import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponAsync } from "../../store/slices/couponDetailsSlice";
import styles from "./CouponDetailsPage.module.scss";
import CouponDetails from "../../components/CouponDetails/CouponDetails";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import {
  addFavorite,
  removeFromFavorite,
} from "../../store/slices/favoriteSlice/favoriteSlice";
import { ICoupon } from "../../components/CouponDetails/CouponDetails";
import {
  activateUsersCoupon,
  buyUsersCoupon,
} from "../../store/slices/usersCouponsSlice";

const CouponDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { coupon, status } = useAppSelector((state) => state.couponDetails);

  const user =
    localStorage.getItem("currentUser") &&
    JSON.parse(localStorage.getItem("currentUser") || "");

  const favoriteCoupons = useAppSelector(
    (state) => state.favorite.favoriteCoupons
  );

  const AuthFavoriteCoupons = useAppSelector(
    (state) => state.favorite.authFavoriteCoupons
  );

  const state = user ? AuthFavoriteCoupons : favoriteCoupons;
  const isFavorite = state.some((item: ICoupon) => item.id === coupon.id);

  const usersCoupons = useAppSelector(
    (state) => state.usersCoupons.usersCoupons
  );

  const currentUser = usersCoupons.find(
    (item: any) => item.token === user?.access
  );
  let isBought = false;

  if (currentUser) {
    console.log(currentUser);

    isBought = currentUser.boughtCoupons.some(
      (item: ICoupon) => item.id === coupon.id
    );
  }

  const favoriteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    isFavorite
      ? dispatch(removeFromFavorite(coupon))
      : dispatch(addFavorite(coupon));
  };

  const couponHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      navigate("/sign-in");
      return;
    }

    if (user) {
      isBought
        ? dispatch(activateUsersCoupon(coupon))
        : dispatch(buyUsersCoupon(coupon));
    }
  };

  useEffect(() => {
    dispatch(getCouponAsync(id));
  }, [id]);

  return (
    <>
      <BreadCrumps />
      <div className="container">
        {status === "loading" ? (
          <div>LOADING</div>
        ) : (
          <CouponDetails
            coupon={coupon}
            isFavorite={isFavorite}
            isBought={isBought}
            favoriteHandler={favoriteHandler}
            couponHandler={couponHandler}
          />
        )}
      </div>
    </>
  );
};

export default CouponDetailsPage;
