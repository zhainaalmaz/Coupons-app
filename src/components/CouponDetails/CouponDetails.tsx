import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./CouponDetails.module.scss";

type Props = {
  coupon: ICoupon;
};

interface ILocation {
  id: number;
  address: string;
  geolocation: string;
}

interface ICoupon {
  id: number;
  title: string;
  description: string;
  conditions: string;
  preview_image: string;
  discount_percent: number;
  price_for_coupon: string;
  price: string;
  old_price: string;
  company_id: number;
  company_name: string;
  company_logo: string;
  start_active_date: string;
  end_active_date: string;
  bought_quantity: number;
  images: [];
  similar_products: [];
  qr_coupon: null;
  map_locations: ILocation[];
}

const CouponDetailsPage = ({ coupon }: Props) => {
  console.log(coupon);

  return (
    <div className={styles.coupon}>
      <div className={styles.heading}>
        <div className={styles.images}>
          <div className={styles.imagePreview}>
            <img src={coupon.preview_image} alt="Logo" />
          </div>
          <div className={styles.images}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.company}>
            <img
              className={styles.logo}
              src={coupon.company_logo}
              alt="Companu Logo"
            />
            <p className={styles.title}>{coupon.company_name}</p>
          </div>

          <div className={styles.description}>
            <p className={styles.descriptionDiscount}>Купон на скидку 50%</p>
            <span className={styles.descriptionInfo}>{coupon.title}</span>
            <span className={styles.descriptionInfo}>{coupon.title}</span>
            <span className={styles.descriptionInfo}>{coupon.title}</span>
            <span className={styles.descriptionInfo}>{coupon.title}</span>
          </div>
        </div>
      </div>
      <div className={styles.content}></div>

      <p dangerouslySetInnerHTML={{ __html: coupon.conditions }}></p>
      <p dangerouslySetInnerHTML={{ __html: coupon.description }}></p>

      <div className={styles.similar_products}>
        {coupon.similar_products.map((product, index) => {
          return <Card it={product} key={index} />;
        })}
      </div>

      <div className={styles.map}>
        <div className={styles.geolocation}>
        </div>
        <div className={styles.adresses}>
          <div className={styles.adress}>{coupon.map_locations[0].address}</div>
          <div className={styles.adress}>{coupon.map_locations[0].address}</div>
          <div className={styles.adress}>{coupon.map_locations[0].address}</div>
          <div className={styles.adress}>{coupon.map_locations[0].address}</div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailsPage;
