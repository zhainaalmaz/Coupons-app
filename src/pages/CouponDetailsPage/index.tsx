import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponAsync } from "../../store/slices/couponDetailsSlice";
import styles from "./CouponDetailsPage.module.scss";
import CouponDetails from "../../components/CouponDetails/CouponDetails"

const CouponDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { coupon, status } = useAppSelector((state) => state.couponDetails);

  useEffect(() => {
    dispatch(getCouponAsync(id));
  }, []);

  return (
    <div className="container">
      {status === "loading" ? <div>LOADING</div> : <CouponDetails coupon={coupon}/>}
    </div>
  );
};

export default CouponDetailsPage;
