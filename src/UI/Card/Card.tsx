import React from "react";
import { Icoupon } from "../../pages/MainPage/Main";
import styles from "../Card/Card.module.scss";
import defaultpreview from "../../assets/couponsImg/defoltIMG.png";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
  addFavorite,
  removeFromFavorite,
} from '../../store/slices/favoriteSlice/favoriteSlice';
import { ReactComponent as FavoriteIcon } from '../../assets/card/favorite.svg';
import { ReactComponent as FavoritedIcon } from '../../assets/card/favorited.svg';
import { ReactComponent as DiscountIcon } from '../../assets/card/discount.svg';
import { ReactComponent as PriceIcon } from '../../assets/card/price.svg';

type Props = {
  it: Icoupon;
};

const Card = ({ it }: Props) => {
  const isAuth =
    localStorage.getItem('currentUser') &&
    JSON.parse(localStorage.getItem('currentUser') || '');
  const dispatch = useAppDispatch();

  const favoriteItems = useAppSelector(
    (state) => state.favorite.favoriteCoupons
  );

  const AuthFavoriteItems = useAppSelector(
    (state) => state.favorite.authFavoriteCoupons
  );

  const state = isAuth ? AuthFavoriteItems : favoriteItems;
  const isFavorite = state.find((el: any) => el.id === it.id);
  
  const onAddFavoriteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isFavorite) {
      dispatch(removeFromFavorite(it));
    } else {
      dispatch(addFavorite(it));
    }
  };
  return (
    <>
        {
            <div className={styles.contentBox}>
            <div className={styles.discount}>
                {it.discount_percent}%
            </div>
            <div onClick={onAddFavoriteHandler} className={styles.favoriteIcon}>
                {isFavorite ? <FavoriteIcon/> : <FavoritedIcon/>}
            </div>
            <div className={styles.couponLogoBox}>
                <img
                    className={styles.couponLogoIMG}
                    src={it.preview_image || defaultpreview}
                    alt=""
                />
            </div>
            <div className={styles.companyInfo}>
                <img className={styles.companyLogo} src={it.company_logo} alt=""/>
                <p className={styles.companyTitile}>{it.company_name}</p>
            </div>
            <div className={styles.cardInfoBox}>
                <div
                    dangerouslySetInnerHTML={{__html: it.conditions}}
                    className={styles.description}
                ></div>
                <div className={styles.cardPriceBox}>
                    <div className={styles.price}>
                        <div className={styles.priceSVG}>
                            <DiscountIcon/>
                        </div>
                        <div className="priceContent">
                            <p className={styles.priceContentText}>???????? ???????????? ?? ??????????????:</p>
                            <div className={styles.priceContentPrice}>
                                {it.price}
                                <span className={styles.priceContentSpan}>{it.old_price}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <div className={styles.priceSVG}>
                            <PriceIcon/>
                        </div>
                        <div className="priceContent">
                            <p className={styles.priceContentText}>???????? ???? ??????????:</p>
                            <div className={styles.priceContentPrice}>
                                {it.price_for_coupon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        }
    </>
  )
}
export default Card;
