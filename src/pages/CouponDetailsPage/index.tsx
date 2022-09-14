import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponAsync } from "../../store/slices/couponDetailsSlice";
import styles from "./CouponDetailsPage.module.scss";
import CouponDetails from "../../components/CouponDetails/CouponDetails";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";

const CouponDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { coupon, status } = useAppSelector((state) => state.couponDetails);

  const state = useAppSelector((state) => state.favorite);
  const isFavorite = true;
  console.log(state);

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
          <CouponDetails coupon={coupon} isFavorite={isFavorite} />
        )}
      </div>
    </>
  );
};

export default CouponDetailsPage;
