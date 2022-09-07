import React from "react";
import style from "./AuthButton.module.scss";

type Props = {
    children: JSX.Element;
    type: string;
}

const AuthButton:React.FC<Props> = ({children}) => {
  return (
    <button className={style.btn}>
      {children}
    </button>
  );
};

export default AuthButton;