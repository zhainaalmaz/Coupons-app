import React from "react";
import styles from "./AuthButton.module.scss";

type Props = {
  children: JSX.Element;
  type: "submit";
};

const AuthButton: React.FC<Props> = ({ children, type }) => {
  return (
    <button className={styles.btn} type={type}>
      {children}
    </button>
  );
};

export default AuthButton;
