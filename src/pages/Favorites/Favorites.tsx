import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import { useAppSelector, useAutoFetchData } from "../../hooks";
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

  const [state, setState] = useState(
    user ? AuthFavoriteCoupons : favoriteCoupons
  );
  const [limit, setLimit] = useState(0);

  console.log(state);

  useEffect(() => {
    setState(user ? AuthFavoriteCoupons : favoriteCoupons);
  }, [AuthFavoriteCoupons.length, favoriteCoupons.length]);

  useEffect(() => {
    setLimit(8);
    applyFilters();
  }, []);

  const changeLimit = (num: number) => {
    setLimit((prev) => prev + num);
  };

  useAutoFetchData(changeLimit);

  function applyFilters(_sorted = "name") {
    const sortedState = state.slice().sort((a: Icoupon, b: Icoupon) => {
      switch (_sorted) {
        case "priceDesc":
          return +b.price - +a.price;
        case "priceAsc":
          return +a.price - +b.price;
        default:
          return a.company_name.localeCompare(b.company_name);
      }
    });
    setState(sortedState);
  }

  const handleChange = (sorted: any) => {
    applyFilters(sorted.target.value);
  };

  return (
    <>
      <BreadCrumps />
      <div className={styles.favorite}>
        <div className="container">
          <div className={styles.header}>
            <h2>Избранное</h2>

            {state.length > 0 && (
              <div className={styles.select}>
                <Select
                  onChange={handleChange}
                  label="Сортировать по"
                  name="sort"
                  options={[
                    {
                      label: "Name",
                      value: "name",
                    },
                    {
                      label: "Price High",
                      value: "priceDesc",
                    },
                    {
                      label: "Price Low",
                      value: "priceAsc",
                    },
                  ]}
                />
              </div>
            )}
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
