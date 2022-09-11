import React, {ReactNode} from 'react';
import {Icategories} from "../../pages/MainPage/Main"
import styles from "../../components/categories/categories.module.scss";

interface Props {
    it:Icategories,
    color: {
        color:string,
        icon: ReactNode
    },
    setToggleCategoriesId: (toggleCategoriesId: number | boolean) => void ,
    handleChangeCategories: any,
    toggleCategoriesId:number|boolean
}

const Categories = ({ it, color,setToggleCategoriesId, toggleCategoriesId ,handleChangeCategories }: Props) => {

    const choosed = toggleCategoriesId === it.id ? it.id : false

    return (
        <div onClick={() => {
            if(!choosed) {
                setToggleCategoriesId(choosed)
                handleChangeCategories(it.id)
            }
        }} className={styles.categoriesBox} >
            <div style={{border: `2px solid ${color.color}`,transition:"1s", background: `${!!choosed? `${color.color}` : "none"}`}}  className={!choosed ? styles.categoriesIconBox : styles.categoriesSvgBox} >
                {color.icon}
            </div>
            <p>{it.title}</p>
        </div>
    );
};

export default Categories;