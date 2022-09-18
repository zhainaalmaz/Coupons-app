import React, { useState } from "react";
import { IProps } from "../NameInput/NameInput";
import styles from "./RepeatPasswordInput.module.scss";

import { ReactComponent as EyeClose } from "../../../../assets/auth-svg/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../../../assets/auth-svg/eye-open.svg";

const RepeatPasswordInput: React.FC<IProps> = ({
  name,
  type,
  className,
  placeholder,
  form,
}) => {
  const [show, setShow] = useState(false);
  const eyeHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShow(!show);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete form.errors.password2;
    form.setErrors({ ...form.errors, password2: "" });
    form.values.password2 = e.target.value;
  };
  return (
    <div className={styles.repeatPassword}>
      <input
        type={show ? "text" : type}
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
      {show ? (
        <EyeOpen onClick={eyeHandler} className={styles.eyeHandler} />
      ) : (
        <EyeClose onClick={eyeHandler} className={styles.eyeHandler} />
      )}
    </div>
  );
};

export default RepeatPasswordInput;
