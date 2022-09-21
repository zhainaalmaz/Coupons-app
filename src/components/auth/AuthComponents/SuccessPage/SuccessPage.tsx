import React from "react";
import styles from "./SuccessPage.module.scss";
import { ReactComponent as Success } from "../../../../assets/auth-svg/success.svg";
import AuthButton from "../../../../UI/AuthButton/AuthButton";
import { Link, useNavigate } from "react-router-dom";

type IProps = {
  title?: string | null;
};

const SuccessPage = ({ title }: IProps) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.successPage}>
      <div className="container">
        <div className={styles.wrapper}>
          <Success />
          <h3>{title}</h3>
          <p onClick={navigateHandler}>
            <AuthButton type="submit">
              <p>На главную</p>
            </AuthButton>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
