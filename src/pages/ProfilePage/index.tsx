import React from "react";
import { Navigate } from "react-router-dom";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import MyProfile from "../../components/MyProfile";
import Profile from "../../UI/Profile/Profile";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
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
            <MyProfile user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
