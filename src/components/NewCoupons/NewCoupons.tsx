import React, { FC, useEffect, useState } from 'react';
import styles from './NewCoupons.module.scss';
import CouponsButton from '../../UI/CoupunsButton/CouponsButton';
import { useAppSelector } from '../../hooks';

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

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>Новые купоны</h1>
      <div className={styles.subtitles}>
        {tags.data.map((item: Itags) => (
          <CouponsButton
            key={item.id}
            id={item.id}
            backgroundColor={activeButtonId === item.id ? '#4B5FA5' : '#EDF1FD'}
            color={activeButtonId === item.id ? 'white' : '#4B5FA5'}
            height="32px"
            radius="12px"
            fontSize="13px"
            onClick={() => subCategoryHandler(item.id)}
            children={item.title}
          />
        ))}
      </div>
      <div>
        {data?.results?.map((item: Icoupon) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCoupons;
