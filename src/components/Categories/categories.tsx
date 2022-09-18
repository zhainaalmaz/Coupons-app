import React, { ReactNode } from 'react';
import { Icategories } from '../../pages/MainPage/Main';
import styles from './categories.module.scss';
import { motion } from 'framer-motion';

interface Props {
  it: Icategories;
  color: {
    color: string;
    icon: ReactNode;
  };
  setToggleCategoriesId: (toggleCategoriesId: number) => void;
  handleChangeCategories: any;
  toggleCategoriesId: number | boolean;
}

const Categories = ({
  it,
  color,
  setToggleCategoriesId,
  toggleCategoriesId,
  handleChangeCategories,
}: Props) => {
  const choosed = toggleCategoriesId === it.id ? it.id : 0;

  return (
    <motion.div
      onClick={() => {
        if (!choosed) {
          setToggleCategoriesId(choosed);
          handleChangeCategories(it.id);
        }
      }}
      className={styles.categoriesBox}
      whileHover={{
        scale: 1.1,
      }}
    >
      <div
        style={{
          border: `2px solid ${color.color}`,
          transition: '1s',
          background: `${!!choosed ? `${color.color}` : 'none'}`,
        }}
        className={
          !choosed ? styles.categoriesIconBox : styles.categoriesSvgBox
        }
      >
        {color.icon}
      </div>
      <p>{it.title}</p>
    </motion.div>
  );
};

export default Categories;
