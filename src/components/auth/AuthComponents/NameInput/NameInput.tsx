import React from "react";
import { FormValues } from "../../signup/Signup";
import styles from "./NameInput.module.scss";

export interface IErrors {
  first_name?: string;
  last_name?: string;
  phone?: string;
  password?: string;
  password2?: string;
}

export interface IForm {
  values: FormValues;
  errors: IErrors;
  setErrors: (value: IErrors) => void;
}

export type IProps = {
  className: string;
  name: string;
  placeholder: string;
  type: string;
  form: IForm;
};
const NameInput: React.FC<IProps> = ({
  name,
  className,
  placeholder,
  type,
  form,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete form.errors.first_name;
    form.setErrors({ ...form.errors, first_name: "" });
    form.values.first_name = e.target.value;
  };
  return (
    <div className={styles.nameInput}>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default NameInput;
