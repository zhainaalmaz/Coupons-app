import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getConfidentialtAsync } from "../../store/slices/confidentialSlice";
import BreadCrumps from "../BreadCrumps/BreadCrumps";
import styles from "./Confidential.module.scss";

const Confidential = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.confidential);
  useEffect(() => {
    dispatch(getConfidentialtAsync());
  }, []);
  return (
    <>
      <BreadCrumps />
      <div className={styles.background}>
        <div className="container">
          <div className={styles.box}>
            <h2 className={styles.title}>{state.title}</h2>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: state.description }}
              id="description"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confidential;
