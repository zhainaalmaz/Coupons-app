import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card/Card";
import styles from "./CouponDetails.module.scss";
import defaultImage from "../../assets/couponsImg/defoltIMG.png";

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

interface ISimilar {
  company_logo: string;
  company_name: string;
  conditions: string;
  description: string;
  discount_percent: number;
  id: number;
  is_active: true;
  old_price: string;
  order: number;
  preview_image: string;
  price: string;
  price_for_coupon: string;
  title: string;
}

const CouponDetailsPage = ({ coupon }: Props) => {

  return (
    <div className={styles.coupon}>
      <div className={styles.heading}>
        <div className={styles.images}>
          <div className={styles.imagePreview}>
            <img
              src={coupon.preview_image ? coupon.preview_image : defaultImage}
              className={styles.previewImage}
              alt="Logo"
            />
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
        {coupon.similar_products &&
          coupon.similar_products.map((product: ISimilar, index) => {
            return (
              <Link to={"/coupon/" + product.id}>
                <Card it={product} key={index} />
              </Link>
            );
          })}
      </div>

      {coupon.map_locations && coupon.map_locations.length > 0 && (
        <div className={styles.map}>
          <div className={styles.geolocation}></div>
          <div className={styles?.adresses}>
            <div className={styles?.adress}>
              {coupon.map_locations[0].address}
            </div>
            <div className={styles?.adress}>
              {coupon.map_locations[0].address}
            </div>
            <div className={styles?.adress}>
              {coupon.map_locations[0].address}
            </div>
            <div className={styles?.adress}>
              {coupon.map_locations[0].address}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDetailsPage;
