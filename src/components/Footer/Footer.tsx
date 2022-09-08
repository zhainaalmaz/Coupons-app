import React, { useEffect } from "react";
import styles from "./Footer.module.scss";
import ok from "../../assets/footerIcons/odnoklassniki.svg";
import vk from "../../assets/footerIcons/vk.svg";
import fb from "../../assets/footerIcons/facebook.svg";
import insta from "../../assets/footerIcons/instagram.svg";
import mail from "../../assets/footerIcons/mail.svg";
import phone from "../../assets/footerIcons/phone.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getContactAsync } from "../../store/slices/contactSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getContactAsync());
  }, []);

  return (
    <footer>
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.footerBlock}>
            <h4>Покупателям</h4>
            <p>Как сделать заказ</p>
            <p>Способы оплаты</p>
            <Link to="help">
            <p>Вопросы и ответы</p></Link>
            <Link to="confidential">
              <p>Политика конфиденциальности</p>
            </Link>
          </div>
          <div className={styles.footerBlock}>
            <h4>Компания</h4>
            
            <Link to="about"><p>О нас</p></Link>
            <Link to="contacts"><p>Контакты</p></Link>
  
          </div>
          <div className={styles.footerBlock}>
            <h4>Мы в соц сетях</h4>
            <a target="_blank" href={state.vk}>
              <div className={styles.footerInnerBlock}>
                <img src={vk} alt="vk" />
                <span>Вконтакте</span>
              </div>
            </a>
            <a target="_blank" href={state.facebook}>
              <div className={styles.footerInnerBlock}>
                <img src={fb} alt="facebook" />
                <span>Facebook</span>
              </div>
            </a>
            <a target="_blank" href={state.odnoklassniki}>
              <div className={styles.footerInnerBlock}>
                <img src={ok} alt="odnoklassniki" />
                <span>Одноклассники</span>
              </div>
            </a>
            <a target="_blank" href={state.insta}>
              <div className={styles.footerInnerBlock}>
                <img src={insta} alt="instagram" />
                <span>Instagram</span>
              </div>
            </a>
          </div>
          <div className={styles.footerBlock}>
            <h4>Свяжитесь с нами</h4>
            <div className={styles.footerInnerBlock}>
              <img src={mail} alt="mail" />
              {state.status === "loading" ? (
                <span>Loading...</span>
              ) : (
                <a href="owner@zeon.ltd">{state.email}</a>
              )}
            </div>
            <div className={styles.footerInnerBlock}>
              <img src={phone} alt="phone" />
              {state.status === "loading" ? (
                <span>Loading...</span>
              ) : (
                <a href="tel:+996 500 123 456">{state.phone}</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
