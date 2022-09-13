import React from "react";
import styles from "./SuccessPage.module.scss";
import { ReactComponent as Success } from "../../../../assets/auth-svg/success.svg";
import AuthButton from "../../../UI/authButton/AuthButton";
import { Link } from "react-router-dom";

type IProps = {
  title?: string | null;
};

const SuccessPage = ({ title }: IProps) => {
  return (
    <div className={styles.successPage}>
      <div className="container">
        <div className={styles.wrapper}>
          <Success />
          <h3>{title}</h3>
          <Link to="/">
            <AuthButton type="button">
              <p>На главную</p>
            </AuthButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
