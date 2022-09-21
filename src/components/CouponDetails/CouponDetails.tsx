import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card/Card";
import styles from "./CouponDetails.module.scss";

import defaultImage from "../../assets/couponsImg/defoltIMG.png";
import { ReactComponent as FavoriteIcon } from "../../assets/card/favorited.svg";
import { ReactComponent as FavoritedIcon } from "../../assets/card/favorite-outline.svg";
import ticketImg from "../../assets/card/tickets.svg";
import timeImg from "../../assets/card/wall-clock.svg";

import ok from "../../assets/card/ok.svg";
import vk from "../../assets/card/vk.svg";
import fb from "../../assets/card/fb.svg";
import tg from "../../assets/card/tg.svg";
import wa from "../../assets/card/wa.svg";
import { Map } from "../../UI/Map";

type Props = {
  coupon: ICoupon;
  isFavorite: boolean;
  favoriteHandler: any;
  isBought: boolean | ICoupon;
  isActivated: boolean | ICoupon;
  couponHandler: any;
  navigateToCompany: () => void;
};

interface ILocation {
  id: number;
  address: string;
  geolocation: string;
}

export interface ICoupon {
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

const CouponDetailsPage = ({
  coupon,
  isFavorite,
  favoriteHandler,
  couponHandler,
  isBought,
  isActivated,
  navigateToCompany,
}: Props) => {
  const regex = /\-/g;

  const startDate = coupon?.start_active_date.replace(regex, ".");
  const endDate = coupon?.end_active_date.replace(regex, ".");

  let geo: any = [42.9430169, 74.6447229];
  if (coupon?.map_locations.length > 0) {
    geo = coupon.map_locations[0]?.geolocation.split(",");
  }

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

          <p dangerouslySetInnerHTML={{ __html: coupon.conditions }}></p>
          <p dangerouslySetInnerHTML={{ __html: coupon.description }}></p>
        </div>
        <div className={styles.info}>
          <div className={styles.company} onClick={navigateToCompany}>
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

          <div className={styles.prices}>
            <div className={styles.priceForCoupon}>
              Цена за купон <span>от {coupon.price_for_coupon} сом</span>
            </div>
            <div className={styles.priceWithCoupon}>
              Цена с купоном
              <span>
                от {coupon.price} сом
                {coupon.old_price && <small>{coupon.old_price} сом</small>}
              </span>
            </div>
          </div>

          <div className={styles.buttons}>
            {isActivated ? (
              <button
                onClick={couponHandler}
                className={styles.buttonMyCoupons}
              >
                Мои купоны
              </button>
            ) : isBought ? (
              <button onClick={couponHandler} className={styles.buttonActivate}>
                Активирвать купон
              </button>
            ) : (
              <button onClick={couponHandler} className={styles.buttonBuy}>
                Купить купон
              </button>
            )}

            <button onClick={favoriteHandler} className={styles.buttonFavorite}>
              {isFavorite ? <FavoritedIcon /> : <FavoriteIcon />}
            </button>
          </div>

          <div className={styles.footer}>
            <div className={styles.period}>
              <p className={styles.subtitle}>Период действия акции:</p>
              <span>
                <small>с {startDate}</small>
                <small>по {endDate}</small>
              </span>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <img src={ticketImg} alt="Ticket" />
                <div className={styles.subtitle}>714 купонов купили</div>
              </div>
              <div className={styles.metaItem}>
                <img src={timeImg} alt="Time" />
                <div className={styles.subtitle}>Время продаж ограничено!</div>
              </div>
            </div>

            <p className={styles.share}>Поделиться</p>

            <div className={styles.socialMedia}>
              <div className={styles.footerBlock}>
                <a target="_blank" href="https://vk.com/">
                  <div className={styles.footerInnerBlock}>
                    <img src={vk} alt="vk" />
                  </div>
                </a>
                <a target="_blank" href="https://facebook.com/">
                  <div className={styles.footerInnerBlock}>
                    <img src={fb} alt="facebook" />
                  </div>
                </a>
                <a target="_blank" href="https://ok.ru/">
                  <div className={styles.footerInnerBlock}>
                    <img src={ok} alt="odnoklassniki" />
                  </div>
                </a>
                <a target="_blank" href="https://web.telegram.org/">
                  <div className={styles.footerInnerBlock}>
                    <img src={tg} alt="telegram" />
                  </div>
                </a>
                <a target="_blank" href="https://www.whatsapp.com/">
                  <div className={styles.footerInnerBlock}>
                    <img src={wa} alt="whatsapp" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {coupon.similar_products && coupon.similar_products.length > 0 && (
        <>
          <div className={styles.similarTitle}>Похожие товары</div>
          <div className={styles.similar_products}>
            {coupon.similar_products &&
              coupon.similar_products.map((product: ISimilar, index) => {
                return (
                  <Link to={"/coupon/" + product.id} key={index}>
                    <Card it={product} />
                  </Link>
                );
              })}
          </div>
        </>
      )}

      {geo && (
        <div style={{ width: "100%", height: 400, marginTop: 50, maxHeight: 400, overflow: "hidden" }}>
          <Map dol={geo[0]} shir={geo[1]} />
        </div>
      )}
    </div>
  );
};

export default CouponDetailsPage;
