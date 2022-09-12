import React from "react";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import Profile from "../../UI/Profile/Profile";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <>
      <BreadCrumps />
      <div className={styles.layout}>
        <div className="container">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
