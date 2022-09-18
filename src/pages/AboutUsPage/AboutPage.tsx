import React, { useEffect, useState } from "react";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { aboutsUsInfo } from "../../store/slices/aboutUsSlice";
import Navigation from "../../UI/Navigation/Navigation";
import styles from "./About.module.scss";

const AboutPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.aboutUsInfo);

  useEffect(() => {
    dispatch(aboutsUsInfo());
  }, []);

  return (
    <>
      <BreadCrumps />
      <div className={styles.layout}>
        <div className="container">
          <div className={styles.wrapper}>
            <Navigation />
            <div className={styles.info}>
              <h2>О нас</h2>
              <div>{state.data}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
