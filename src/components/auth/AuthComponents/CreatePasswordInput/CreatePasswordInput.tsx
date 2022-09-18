import React, { useState } from "react";
import styles from "./CreatePasswordInput.module.scss";
import { IProps } from "../NameInput/NameInput";
import { ReactComponent as EyeClose } from "../../../../assets/auth-svg/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../../../assets/auth-svg/eye-open.svg";

const CreatePasswordInput: React.FC<IProps> = ({
  name,
  className,
  placeholder,
  type,
  form,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete form.errors.password;
    form.setErrors({ ...form.errors, password: "" });
    form.values.password = e.target.value;
  };

  const [show, setShow] = useState(false);
  const eyeHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShow(!show);
  };
  return (
    <div>
      <input
        onChange={onChange}
        type={show ? "text" : type}
        className={className}
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

export default CreatePasswordInput;
