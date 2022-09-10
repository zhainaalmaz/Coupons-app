import React from "react";
import styles from "./LoginSuccess.module.scss";
import { ReactComponent as Success } from "../../../../assets/auth-svg/success.svg";
import AuthButton from "../../../../UI/AuthButton/AuthButton";
import { Link } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <div className={styles.loginSuccess}>
      <div className="container">
        <div className={styles.wrapper}>
          <Success />
          <h3>Телефон подтвержден</h3>
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

export default LoginSuccess;
