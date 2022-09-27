import React, { useEffect } from "react";
import styles from "./Contact.module.scss";
import Navigation from "../../UI/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getContactAsync } from "../../store/slices/contactSlice";

import { ReactComponent as PhoneIcon } from "../../assets/footerIcons/phone.svg";
import { ReactComponent as EmailIcon } from "../../assets/footerIcons/mail.svg";
import { ReactComponent as FacebookIcon } from "../../assets/footerIcons/facebook.svg";
import { ReactComponent as VkontakteIcon } from "../../assets/footerIcons/vk.svg";
import { ReactComponent as OdnoklassnikiIcon } from "../../assets/footerIcons/odnoklassniki.svg";
import { ReactComponent as InstagramIcon } from "../../assets/footerIcons/instagram.svg";
import { ReactComponent as LocationIcon } from "../../assets/navigator/location.svg";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import { Map } from "../../UI/Map";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getContactAsync());
  }, []);

  return (
    <>
      <BreadCrumps />
      <div className={styles.layout}>
        <div className="container">
          <div className={styles.wrapper}>
            <Navigation />
            <div className={styles.contacts}>
              <h2>Контакты</h2>
              <p className={styles.description}>
                Farfetch-один из крупнейших интернет-магазинов, который
                представлен сетью из более 100 современных магагазинов. Наш
                магазин открыт с 9:00 до 20:00, работаем без выходных и
                перерывов.
              </p>
              <div className={styles.info}>
                <div>
                  <h5 className={styles.subtitle}>Наши телефоны:</h5>
                  <div className={styles.phone_lists}>
                    <a href="tel:+996 (555) 55 55 55">
                      <p>
                        <PhoneIcon />
                        {data.phone}
                      </p>
                    </a>
                    <a href="tel:+996 (555) 55 55 55">
                      <p>
                        <PhoneIcon />
                        {data.phone}
                      </p>
                    </a>
                    <a href="tel:+996 (555) 55 55 55">
                      <p>
                        <PhoneIcon />
                        {data.phone}
                      </p>
                    </a>
                  </div>
                </div>
                <div className={styles.address}>
                  <div>
                    <h5 className={styles.subtitle}>Email:</h5>
                    <a href="mailto:qwerty123@gmail.com">
                      <p>
                        <EmailIcon />
                        {data.email}
                      </p>
                    </a>
                  </div>
                  <div>
                    <h5 className={styles.subtitle}>Наш адрес:</h5>
                    <p>
                      <LocationIcon />
                      г. Бишкек, пр-т Манаса, д. 5
                    </p>
                  </div>
                </div>

                <div className={styles.social_media}>
                  <h5 className={styles.subtitle}>Мы в социальных сетях:</h5>
                  <div>
                    <a target="_blank" href={data.vk} rel="noreferrer">
                      <VkontakteIcon />
                      <span>Вконтакте</span>
                    </a>
                    <a target="_blank" href={data.facebook} rel="noreferrer">
                      <FacebookIcon />
                      <span>Facebook</span>
                    </a>

                    <a target="_blank" href={data.insta} rel="noreferrer">
                      <InstagramIcon />
                      <span>Instagram</span>
                    </a>

                    <a
                      target="_blank"
                      href={data.odnoklassniki}
                      rel="noreferrer"
                    >
                      <OdnoklassnikiIcon />
                      <span>Одноклассники</span>
                    </a>
                  </div>
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
                <Map dol={"42.87462"} shir={"74.56976"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
