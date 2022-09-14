import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponAsync } from "../../store/slices/couponDetailsSlice";
import styles from "./CouponDetailsPage.module.scss";
import CouponDetails from "../../components/CouponDetails/CouponDetails";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import {
  addFavorite,
  removeFromFavorite,
} from "../../store/slices/favoriteSlice/favoriteSlice";

const CouponDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
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

  const isFavorite = state.some((item: any) => item.id === coupon.id);
  console.log(isFavorite, "state");

  const favoriteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    isFavorite
      ? dispatch(removeFromFavorite(coupon))
      : dispatch(addFavorite(coupon));
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
            favoriteHandler={favoriteHandler}
          />
        )}
      </div>
    </>
  );
};

export default CouponDetailsPage;
