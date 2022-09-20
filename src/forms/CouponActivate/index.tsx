import React, { useEffect } from "react";
import successImg from "../../assets/card/success.svg";
import styles from "./CouponActivate.module.scss";
import closeImg from "../../assets/card/close.svg";
import ticketImg from "../../assets/card/tickets.svg";
import timeImg from "../../assets/card/wall-clock.svg";
import { ICoupon } from "../../components/CouponDetails/CouponDetails";

type Props = {
  isModalActivate: boolean;
  setIsModalActivate: (value: boolean) => void;
  coupon: ICoupon;
};

const CouponActivate = ({
  isModalActivate,
  setIsModalActivate,
  coupon,
}: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    setIsModalActivate(!isModalActivate);
  };

  const regex = /\-/g;
  const startDate = coupon.start_active_date.replace(regex, ".");
  const endDate = coupon.end_active_date.replace(regex, ".");

  return (
    <div className={styles.form}>
      <div className={[styles.form__body, styles.success].join(" ")}>
        <img
          src={closeImg}
          className={styles.form__close}
          onClick={closeModal}
        />
        <img src={successImg} alt="Success" />

        <div className={styles.form__title}>Купон успешно активирован </div>
        <div className={styles.form__info}>
          <span>{coupon.title}</span>
          <span>{coupon.title}</span>
          <span>{coupon.title}</span>
          <span>{coupon.title}</span>

          <div className={styles.form__heading}>
            <div className={styles.form__discount}>
              {coupon.discount_percent}%
            </div>

            <div className={styles.form__period}>
              <p className={styles.form__subtitle}>Период действия акции:</p>
              <span>
                <small>с {startDate}</small>
                <small>по {endDate}</small>
              </span>
            </div>
          </div>

          <div className={styles.form__meta}>
            <div className={styles.metaItem}>
              <img src={ticketImg} alt="Ticket" />
              <div className={styles.form__subtitle}>714 купонов купили</div>
            </div>
            <div className={styles.metaItem}>
              <img src={timeImg} alt="Time" />
              <div className={styles.form__subtitle}>
                Время продаж ограничено!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponActivate;
