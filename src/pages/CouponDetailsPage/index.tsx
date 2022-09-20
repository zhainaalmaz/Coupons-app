import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponAsync } from "../../store/slices/couponDetailsSlice";
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
import CouponBuy from "../../forms/CouponBuy";
import CouponActivate from "../../forms/CouponActivate";

const CouponDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { coupon, status } = useAppSelector((state) => state.couponDetails);
  const newState = useAppSelector((state) => state.couponDetails);
  const [isModalBuy, setIsModalBuy] = useState(false);
  const [isModalActivate, setIsModalActivate] = useState(false);

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
    (item: any) => item.token === user?.token
  );

  const navigateToCompany = () => {
    navigate("/company/" + coupon.company_id);
  };

  let isBought = false;
  let isActivated = false;

  if (currentUser) {
    isBought = currentUser.boughtCoupons.some(
      (item: ICoupon) => item.id === coupon.id
    );

    isActivated = currentUser.activatedCoupons.some(
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

    if (isActivated) {
      navigate("/my-coupons");
    }

    if (user && !isActivated) {
      if (isBought) {
        dispatch(activateUsersCoupon(coupon));
        setIsModalActivate(!isModalActivate);
      } else {
        dispatch(buyUsersCoupon(coupon));
        setIsModalBuy(!isModalBuy);
      }
    }
  };

  useEffect(() => {
    dispatch(getCouponAsync(id));
  }, [id]);

  console.log("DETAILS: ");
  console.log(coupon);
  console.log("newState");
  console.log(newState);

  return (
    <>
      <BreadCrumps />
      <div className="container">
        {status === "loading" ? (
          <div>LOADING</div>
        ) : (
          <>
            <CouponDetails
              coupon={coupon}
              isFavorite={isFavorite}
              isBought={isBought}
              isActivated={isActivated}
              favoriteHandler={favoriteHandler}
              couponHandler={couponHandler}
              navigateToCompany={navigateToCompany}
            />
            {isModalBuy && (
              <CouponBuy
                isModalBuy={isModalBuy}
                setIsModalBuy={setIsModalBuy}
              />
            )}
            {isModalActivate && (
              <CouponActivate
                isModalActivate={isModalActivate}
                setIsModalActivate={setIsModalActivate}
                coupon={coupon}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CouponDetailsPage;
