import React, { FC, useEffect, useState } from "react";
import styles from "./NewCoupons.module.scss";
import CouponsButton from "../../UI/CoupunsButton/CouponsButton";
import { useAppSelector } from "../../hooks";
import Card from "../../UI/Card/Card";
import { Link } from "react-router-dom";

interface Itags {
  data: never[];
  status: string;
  id: number;
  title: string;
  activeButtonId: number;
  is_active: boolean;
}

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

const NewCoupons: FC = () => {
  const [data, setData] = useState({ results: [] as any[] });
  const [activeButtonId, setActiveButtonId] = useState(4);
  const tags = useAppSelector((state) => state.tag);
  const [limit, setLimit] = useState(8);

  const countClickHandler = () => {
    setLimit((limit) => limit + 8);
  };

  const subCategoryHandler = async (id: number) => {
    try {
      const response = await fetch(
        `http://185.178.44.117/api/v1/coupons/subcategory/${id}`
      );
      const result = await response.json();
      setData(result);
      setActiveButtonId(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    subCategoryHandler(4);
  }, []);

  useEffect(() => {
    if(limit > 8) {
      setLimit(8)
    }
  }, [data])

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Новые купоны</h1>
      <div className={styles.subtitles}>
        {tags.data.map((item: Itags) => (
          <CouponsButton
            key={item.id}
            id={item.id}
            backgroundColor={activeButtonId === item.id ? "#4B5FA5" : "#EDF1FD"}
            color={activeButtonId === item.id ? "white" : "#4B5FA5"}
            radius="12px"
            fontSize="13px"
            padding="8px 16px"
            onClick={() => subCategoryHandler(item.id)}
            children={item.title}
          />
        ))}
      </div>
      <div className={styles.coupons}>
        {data?.results?.length > 0 ? (
          data.results.slice(0, limit).map((item: Icoupon) => (
            <Link to={"/coupon/" + item.id} key={item.id}>
              <Card it={item} />
            </Link>
          ))
        ) : (
          <div>В данной категории нет товаров</div>
        )}
      </div>
      {data.results.length >= limit && (
        <div className={styles.coupons_button}>
          <CouponsButton
            backgroundColor="#4B5FA5"
            color="#fff"
            radius="12px"
            padding="11.5px 20px"
            fontSize="13px"
            onClick={countClickHandler}
            children="Загрузить еще"
          />
        </div>
      )}
    </div>
  );
};

export default NewCoupons;
