import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card/Card";
import { Map } from "../../UI/Map";
import Skeleton from "../../UI/Skeleton/Skeleton";
import { Icoupon } from "../NewCoupons/NewCoupons";
import styles from "./Company.module.scss";

import ok from "../../assets/footerIcons/odnoklassniki.svg";
import vk from "../../assets/footerIcons/vk.svg";
import fb from "../../assets/footerIcons/facebook.svg";
import insta from "../../assets/footerIcons/instagram.svg";
import mail from "../../assets/footerIcons/mail.svg";
import phone from "../../assets/footerIcons/phone.svg";

type Props = {
  isLoading: boolean;
  companyInfo: any;
};

const Company = ({ isLoading, companyInfo }: Props) => {
  const [active, setActive] = useState<string>("button1");

  let geo: any = [42.9430169, 74.6447229];
  if (companyInfo?.coordinates?.length > 0) {
    geo = companyInfo.coordinates[0]?.geolocation.split(",");
  }

  const myCouponsHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = e.target as HTMLButtonElement;
    setActive(id);
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={companyInfo.logo} />
        <div className={styles.info}>
          <div className={styles.title}>{companyInfo.company_name}</div>
          <div className={styles.description}>{companyInfo.description}</div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          id={"button1"}
          className={active === "button1" ? styles.activeButton : "null"}
          onClick={myCouponsHandler}
        >
          Акции
        </button>
        <button
          id={"button2"}
          className={active === "button2" ? styles.activeButton : "null"}
          onClick={myCouponsHandler}
        >
          Контакты
        </button>
      </div>

      {active === "button1" && (
        <div className={styles.myCoupons}>
          {companyInfo.coupons.length > 0 ? (
            companyInfo.coupons.slice(0, 8).map((item: Icoupon) => (
              <Link to={"/coupon/" + item.id} key={item.id}>
                <Card it={item} />
              </Link>
            ))
          ) : (
            <div className={styles.empty}>Список пуст</div>
          )}
        </div>
      )}

      {active === "button2" && (
        <>
          <div className={styles.infoWrapper}>
            <div className={styles.footerBlock}>
              <h4>Наши телефоны</h4>
              <div className={styles.footerInnerBlock}>
                <img src={phone} alt="phone" />
                <a href="tel:996555555555">+996 555 55 55 55</a>
              </div>
              <div className={styles.footerInnerBlock}>
                <img src={phone} alt="phone" />
                <a href="tel:996555555555">+996 555 55 55 55</a>
              </div>
              <div className={styles.footerInnerBlock}>
                <img src={phone} alt="phone" />
                <a href="tel:996555555555">+996 555 55 55 55</a>
              </div>
            </div>

            <div className={styles.footerBlock}>
              <h5>Email</h5>
              <div className={styles.footerInnerBlock}>
                <img src={mail} alt="mail" />
                <a href="mailto:owner@zeon.ltd">owner@zeon.ltd</a>
              </div>
              <h5>Наш адресс</h5>
              <div className={styles.footerInnerBlock}>
                <img src={phone} alt="phone" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
            <div className={styles.footerBlock}>
              <h4>Мы в социальных сетях</h4>
              <a target="_blank" href="https://vk.com/">
                <div className={styles.footerInnerBlock}>
                  <img src={vk} alt="vk" />
                  <span>Vkontacte</span>
                </div>
              </a>
              <a target="_blank" href="https://facebook.com/">
                <div className={styles.footerInnerBlock}>
                  <img src={fb} alt="facebook" />
                  <span>Facebook</span>
                </div>
              </a>
              <a target="_blank" href="https://ok.ru/">
                <div className={styles.footerInnerBlock}>
                  <img src={ok} alt="odnoklassniki" />
                  <span>Odnoklassniki</span>
                </div>
              </a>
              <a target="_blank" href="https://instagram.com/">
                <div className={styles.footerInnerBlock}>
                  <img src={insta} alt="instagram" />
                  <span>Instagram</span>
                </div>
              </a>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: 400,
              marginTop: 50,
              maxHeight: 400,
              overflow: "hidden",
            }}
          >
            <Map dol={geo[0]} shir={geo[1]} />
          </div>
        </>
      )}
    </>
  );
};

export default Company;
