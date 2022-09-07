import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCouponsAsync} from "../../store/slices/couponsSlice";
import Card from "../../UI/Card/Card";
import styles from "./Main.module.scss"

export interface Icoupon {
    company_logo: string,
    company_name: string,
    conditions: string,
    description: string,
    discount_percent: number,
    id: number,
    is_active: boolean,
    old_price: string,
    order: number,
    preview_image: string,
    price: string,
    price_for_coupon: string,
    title: string
}

const Main = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCouponsAsync())

    }, [dispatch])
    const state = useAppSelector(state => state.coupons)
    return (
        <div className={styles.container}>
           <div className={styles.cardFlexContainer} >
               {
                   state.coupon.map((it:Icoupon) => {
                       return (
                           <Card key={it.id} it={it}/>
                       )
                   })
               }
           </div>
        </div>
    );
};

export default Main;