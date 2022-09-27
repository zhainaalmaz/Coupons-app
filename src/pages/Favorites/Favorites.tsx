import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import { useAppSelector, useAutoFetchData, useClickOutside } from "../../hooks";
import Card from "../../UI/Card/Card";
import Select from "../../UI/Sort/SortItem";
import styles from "./Favorites.module.scss";

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
  const user =
    localStorage.getItem("currentUser") &&
    JSON.parse(localStorage.getItem("currentUser") || "");

  const favoriteCoupons = useAppSelector(
    (state) => state.favorite.favoriteCoupons
  );

  const AuthFavoriteCoupons = useAppSelector(
    (state) => state.favorite.authFavoriteCoupons
  );

  const [state, setState] = useState<any[]>(
    user ? AuthFavoriteCoupons : favoriteCoupons
  );

  const [limit, setLimit] = useState(0);
  const [sortModal, setSortModal] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState(user ? AuthFavoriteCoupons : favoriteCoupons);
  }, [AuthFavoriteCoupons.length, favoriteCoupons.length]);

  useEffect(() => {
    setLimit(8);
    applyFilters("alphabet");
  }, []);

  const changeLimit = (num: number) => {
    setLimit((prev) => prev + num);
  };

  useAutoFetchData(changeLimit);
  useClickOutside(ref, setSortModal);

  function applyFilters(sortedState: string) {
    if (sortedState === "alphabet") {
      setState(
        [...state].sort((a, b) => a.company_name.localeCompare(b.company_name))
      );
    } else if (sortedState === "lowPrice") {
      setState([...state].sort((a, b) => +a.price - +b.price));
    } else if (sortedState === "highPrice") {
      setState([...state].sort((a, b) => +b.price - +a.price));
    }
    setTimeout(() => setSortModal(false), 0);
  }

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setSortModal(false);
  };

  const handleClick = (_sort: string) => {
    applyFilters(_sort);
  };

  return (
    <>
      <BreadCrumps />
      <div className={styles.favorite}>
        <div className="container">
          <div className={styles.header}>
            <h2>Избранное</h2>

            <div
              ref={ref}
              onClick={() => setSortModal(true)}
              className={styles.sort}
            >
              <p>Сортировать по</p>
              <span>&#9660;</span>
              {sortModal && (
                <div className={styles.sortBox} onClick={(e) => closeModal(e)}>
                  <div className={styles.sortBoxInner}>
                    <div className={styles.sorts}>
                      <p>Сортировать по</p>
                    </div>
                    <button
                      onClick={() => {
                        handleClick("alphabet");
                      }}
                    >
                      По алфавиту
                    </button>
                    <button
                      onClick={() => {
                        handleClick("lowPrice");
                      }}
                    >
                      По цене (низкая {">"} высокая)
                    </button>
                    <button
                      onClick={() => {
                        handleClick("highPrice");
                      }}
                    >
                      По цене (высокая {">"} низкая)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {state.length > 0 ? (
            <div className={styles.favorite_cards}>
              {state
                .filter((i: any, card: any) => card < limit)
                .map((item: Icoupon) => (
                  <Link to={"/coupon/" + item.id} key={item.id}>
                    <Card it={item} />
                  </Link>
                ))}
            </div>
          ) : (
            <p>У Вас пока нет избранных товаров</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
