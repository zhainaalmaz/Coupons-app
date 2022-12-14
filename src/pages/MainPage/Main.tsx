import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCouponsAsync } from "../../store/slices/couponsSlice";
import { getCategoriesAsync } from "../../store/slices/categoriesSlice/categoriesSlice";
import Card from "../../UI/Card/Card";
import styles from "./Main.module.scss";
import Categories from "../../components/Categories/categories";
import Carousel from "../../components/Carusel/Carousel";
import { getMainImgAsinc } from "../../store/slices/mainImgSlice/MainImgSlice";
import { Link, useNavigate } from "react-router-dom";
import { categoriesColors } from "../../data";
import Skeleton from "../../UI/Skeleton/Skeleton";

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

export interface Icategories {
  icon: string;
  id: number;
  sub_subcategories: [];
  title: string;
}

interface ImainImg {
  image: string;
}

const Main = () => {
  const navigate = useNavigate();

  const navigateCupons = () => {
    navigate("/new-coupons");
  };

  const [toggleCategoriesId, setToggleCategoriesId] = useState<number>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCouponsAsync(toggleCategoriesId));
    dispatch(getCategoriesAsync());
    dispatch(getMainImgAsinc());
  }, [toggleCategoriesId]);

  const { coupons, categories, mainImg } = useAppSelector((state) => state);
  const handleChangeCategories = (id: number) => {
    setToggleCategoriesId(toggleCategoriesId === id ? 0 : id);
  };

  const skeletons: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={styles.container}>
      <div className={styles.categoriesFlexContainer}>
        {categories?.subcategories.map((it: Icategories, idx: number) => {
          return (
            <Categories
              key={it.id}
              it={it}
              handleChangeCategories={handleChangeCategories}
              setToggleCategoriesId={setToggleCategoriesId}
              color={categoriesColors[idx]}
              toggleCategoriesId={toggleCategoriesId}
            />
          );
        })}
      </div>

      <h3 className={styles.mainTitle}>?????????? ????????????</h3>
      <div className={styles.cardFlexContainer}>
        {coupons?.coupon?.length > 0
          ? coupons.coupon.slice(0, 8).map((it: Icoupon) => {
              return coupons.status !== "idle" ? (
                <Skeleton key={it.id} />
              ) : (
                <Link to={"/coupon/" + it.id} key={it.id}>
                  <Card it={it} />
                </Link>
              );
            })
          : skeletons.map((item: number) => {
              return <Skeleton key={item} />;
            })}
      </div>

      <button onClick={navigateCupons} className={styles.mainBtn}>
        ???????????????????? ??????
      </button>

      <Carousel />

      <div className={styles.mainImgBox}>
        {mainImg.img.map((it: ImainImg) => {
          return (
            <>
              <div className="mainImg" key={it.image}>
                <img src={it.image} alt="Image" />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
