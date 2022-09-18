import React from "react";
import { IProps } from "../NameInput/NameInput";
import styles from "./SurnameInput.module.scss";

const SurnameInput: React.FC<IProps> = ({
  name,
  className,
  placeholder,
  type,
  form,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete form.errors.last_name;
    form.setErrors({ ...form.errors, last_name: "" });
    form.values.last_name = e.target.value;
  };

  return (
    <div>
      <input
        type={type}
        onChange={onChange}
        className={className}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SurnameInput;
