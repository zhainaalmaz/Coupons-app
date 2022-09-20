import React, { useEffect } from "react";
import successImg from "../../assets/card/success.svg";
import styles from "./CouponBuy.module.scss";
import closeImg from "../../assets/card/close.svg";

type Props = {
  isModalBuy: boolean;
  setIsModalBuy: (value: boolean) => void;
};

const CouponBuy = ({ isModalBuy, setIsModalBuy }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    setIsModalBuy(!isModalBuy);
  };

  return (
    <div className={styles.form}>
      <div className={[styles.form__body, styles.success].join(" ")}>
        <img
          src={closeImg}
          className={styles.form__close}
          onClick={closeModal}
        />
        <img src={successImg} alt="Success" />

        <div className={styles.form__title}>Спасибо за покупку! </div>
      </div>
    </div>
  );
};

export default CouponBuy;
