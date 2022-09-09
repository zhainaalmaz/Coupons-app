import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import Card from '../../UI/Card/Card';
import styles from './Favorites.module.scss';

export interface Icoupon {
  company_logo: string;
  company_name: string;
  conditions: string;
  description: string;
  discount_percent: number;
  id: number;
  is_active: boolean;
  old_price: string;
  order: number;
  preview_image: string;
  price: string;
  price_for_coupon: string;
  title: string;
}

const Favorites = () => {
  const favoriteCoupons = useAppSelector(
    (state) => state.favorite.favoriteCoupons
  );
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    setLimit(8);
  }, []);

  const changeLimit = (num: number) => {
    setLimit((prev) => prev + num);
  };

  const scrollHandler = (e: any) => {
    e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      100 && changeLimit(4);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className={styles.favorite}>
      <div className="container">
        <div className={styles.header}>
          <h2>Избранное</h2>
          <div>Sort</div>
        </div>
        <div className={styles.favorite_cards}>
          {favoriteCoupons
            .filter((i: any, card: any) => card < limit)
            .map((item: Icoupon) => (
              <Card it={item} key={item.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
