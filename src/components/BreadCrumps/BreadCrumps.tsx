import React from "react";
import { useLocation, Link as RouterLink, useParams } from "react-router-dom";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import styles from "./BreadCrumps.module.scss";

function titleRussianCase(str: string) {
  if (str === "confidential") return "Политика конфиденциальности";
  if (str === "searchpage") return "Результаты поиска";
  if (str === "coupon") return "Купоны";
  if (str === "profile") return "Профиль";
  if (str === "favorites") return "Избранные";
  if (str === "my-coupons") return "Мои купоны";
  if (str === "about") return "О нас";
  if (str === "help") return "Помощь";
  if (str === "contacts") return "Контакты";
  if (str === "new-coupons") return "Новые купоны";
  return;
}

const BreadCrumps = () => {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="container">
      {pathnames.length > 0 && (
        <Breadcrumbs className={styles.breadcrumpBox}>
          <Link
            style={{ textDecoration: "none", color: "#4F70E2" }}
            className={styles.link}
            to="/"
            component={RouterLink}
          >
            Главная
          </Link>
          {pathnames.length > 1 ? (
            pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return last ? (
                <Typography style={{ color: "#4F70E2" }} key={to}>
                  {decodeURIComponent(value)}
                </Typography>
              ) : (
                <Typography style={{ color: "#4F70E2" }} key={index}>
                  <RouterLink style={{ color: "#4F70E2" }} to="/new-coupons">
                    {titleRussianCase(value)}
                  </RouterLink>
                </Typography>
              );
            })
          ) : (
            <Typography style={{ color: "#4F70E2" }}>
              {titleRussianCase(pathnames[0])}
            </Typography>
          )}
        </Breadcrumbs>
      )}
    </div>
  );
};

export default BreadCrumps;
