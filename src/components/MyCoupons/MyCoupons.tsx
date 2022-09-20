import { Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Card from "../../UI/Card/Card";
import { Icoupon } from "../../pages/MainPage/Main";
import styles from "./MyCoupons.module.scss";

const MyCoupons: FC = () => {
  const [active, setActive] = useState<string>("button1");
  const [data, setData] = useState([]);

  const user =
    localStorage.getItem("currentUser") &&
    JSON.parse(localStorage.getItem("currentUser") || "");

  const state = useAppSelector((state) => state.usersCoupons.usersCoupons);
  const myCoupons = state.find((item: any) => item.token === user.token);

  const myCouponsHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = e.target as HTMLButtonElement;
    setActive(id);
  };

  useEffect(() => {
    if (!myCoupons) setData([]);
    else if (active === "button1") setData(myCoupons.boughtCoupons);
    else if (active === "button2") setData(myCoupons.activatedCoupons);
    else if (active === "button3") setData([]);
  }, [active]);

  return (
    <>
      <div className={styles.info}>
        <h2>Мои купоны</h2>
        <Divider className={styles.divider} />
        <div className={styles.buttons}>
          <button
            id={"button1"}
            className={active === "button1" ? styles.activeButton : "null"}
            onClick={myCouponsHandler}
          >
            Активные
          </button>
          <button
            id={"button2"}
            className={active === "button2" ? styles.activeButton : "null"}
            onClick={myCouponsHandler}
          >
            Активированные
          </button>
          <button
            id={"button3"}
            className={active === "button3" ? styles.activeButton : "null"}
            onClick={myCouponsHandler}
          >
            Истекшие
          </button>
        </div>
        <div className={styles.myCoupons}>
          {data.length > 0 ? (
            data.map((item: Icoupon) => (
              <Link to={"/coupon/" + item.id} key={item.id}>
                <Card it={item} />
              </Link>
            ))
          ) : (
            <div className={styles.empty}>Список пуст</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCoupons;
