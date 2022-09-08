import React, { useEffect } from "react";
import { Hidden, IconButton, SwipeableDrawer } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/zeon-logo.svg";
import heartIcon from "../../assets/headerIcons/heart.svg";
import couponIcon from "../../assets/headerIcons/coupon.svg";
import logOut from "../../assets/headerIcons/log-in.svg";
import Search from "../Search/Search";
import BurgerIcon from "../../assets/headerIcons/burgerIcon.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getContactAsync } from "../../store/slices/contactSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.contacts);
  useEffect(() => {
    dispatch(getContactAsync());
  }, [dispatch]);
  return (
    <header>
      <div className={styles.headerLines}>
        <div className="container">
          <Hidden mdDown>
            <div className={styles.headerTop}>
              <div className={styles.headerTopLeft}>
                <Link to="about">
                  <span className={styles.links}>О нас</span>
                </Link>
                <Link to="help">
                  <span className={styles.links}>Помощь</span>
                </Link>
                <Link to="news">
                  <span className={styles.links}>Новости</span>
                </Link>
              </div>
              <div className={styles.headerTopRight}>
                <div>
                  <span>Тел. для справки:</span>
                  {state.status === "loading" ? (
                    <span>Loading...</span>
                  ) : (
                    <a href="tel:+996 500 123 456">{state.phone}</a>
                  )}
                </div>
              </div>
            </div>
          </Hidden>
        </div>
      </div>
      <div className={styles.headerLines}>
        <div className="container">
          <div className={styles.headerBottom}>
            <Hidden mdUp>
              <div className={styles.menuBurger} onClick={() => setOpen(true)}>
                <img src={BurgerIcon} alt="burger-icon" />
              </div>
            </Hidden>
            <Link to="/">
              <div className={styles.logo}>
                <img src={logo} alt="the logo" />
              </div>
            </Link>
            <Search />
            <Hidden mdDown>
              <div className={styles.headerExtraInfo}>
                <Link to="favorites">
                  <div className={styles.iconWrapper}>
                    <img src={heartIcon} alt="heart-icon" />
                    <span className={styles.headerOption}>Избранное</span>
                  </div>
                </Link>
                <Link to="my-coupons">
                  <div className={styles.iconWrapper}>
                    <img src={couponIcon} alt="coupon-icon" />
                    <span className={styles.headerOption}>Мои купоны</span>
                  </div>
                </Link>

                <Link to="sign-up">
                  {" "}
                  <div className={styles.iconWrapper}>
                    <img src={logOut} alt="log-out" />
                    <span className={styles.headerOptionLog}>Войти</span>
                  </div>
                </Link>
              </div>
            </Hidden>
          </div>
        </div>
      </div>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div onClick={() => setOpen(false)} className={styles.burgerList}>
          <div>
            <div className={styles.closeWrapper}>
              <p>Меню</p>
              <IconButton
                onClick={() => setOpen(false)}
                onKeyPress={() => setOpen(false)}
                role="button"
                tabIndex={0}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className={styles.burgerTop}>
              <div className={styles.burgerTopLeft}>
                <Link to="about">
                  <span className={styles.links}>О нас</span>
                </Link>
                <Link to="help">
                  <span className={styles.links}>Помощь</span>
                </Link>
                <Link to="news">
                  <span className={styles.links}>Новости</span>
                </Link>
                <hr className={styles.burgerLine} />
              </div>
            </div>
            <div>
              <div className={styles.iconWrapper}>
                <img src={heartIcon} alt="heart-icon" />
                <p className={styles.headerSelected}>Избранное</p>
              </div>
              <div className={styles.iconWrapper}>
                <img
                  style={{
                    width: "20px",
                    marginRight: "-1px",
                    marginTop: "-3px",
                  }}
                  src={couponIcon}
                  alt="coupon"
                />
                <p>Мои купоны</p>
              </div>
            </div>
          </div>
          <div className={styles.burgerBottom}>
            <p>Свяжитесь с нами</p>
            <div className={styles.burgerTopRight}>
              <p>
                Тел: <a href="tel:+996 500 123 456">+996 500 123 456</a>
              </p>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </header>
  );
};

export default Header;
