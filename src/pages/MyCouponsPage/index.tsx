import { FC } from "react";
import { Navigate } from "react-router-dom";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import MyCoupons from "../../components/MyCoupons/MyCoupons";
import Profile from "../../UI/Profile/Profile";
import styles from "./MyCouponsPage.module.scss";

const MyCouponsPage: FC = () => {
  const user =
    localStorage.getItem("currentUser") &&
    JSON.parse(localStorage.getItem("currentUser") || "");

  if (!user) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <>
      <BreadCrumps />
      <div className={styles.layout}>
        <div className="container">
          <div className={styles.wrapper}>
            <Profile />
            <MyCoupons />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCouponsPage;
