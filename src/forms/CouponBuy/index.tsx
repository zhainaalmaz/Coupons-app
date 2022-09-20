import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import successImg from "../../assets/card/success.svg";
import styles from "./CouponBuy.module.scss";
import closeImg from "../../assets/card/close.svg"

const CouponBuy = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.form}>
      <div className={[styles.form__body, styles.success].join(" ")}>
        <img src={closeImg} className={styles.form__close} />
        <img src={successImg} alt="Success" />

        <div className={styles.form__title}>Спасибо за покупку! </div>
        {/* <div className={styles.form__subtitle}>
          Ваша заявка была принята ожидайте, скоро Вам перезвонят
        </div>

        <button className={styles.form__submit} onClick={() => {}}>
          Продолжить покупки
        </button> */}
      </div>
    </div>
  );
};

export default CouponBuy;
