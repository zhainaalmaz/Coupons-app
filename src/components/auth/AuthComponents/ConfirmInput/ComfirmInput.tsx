import React from "react";
import styles from "./ComfirmInput.module.scss";

export interface IErrors {
  confirmation_code?: string;
}
export interface FormValues {
  confirmation_code: string;
}

interface IForm {
  values: FormValues;
  errors: IErrors;
  setErrors: (value: IErrors) => void;
}

type IProps = {
  name: string;
  type: string;
  className: string;
  placeholder: string;
  form: IForm;
};

const ComfirmInput: React.FC<IProps> = ({
  name,
  type,
  className,
  placeholder,
  form,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete form.errors.confirmation_code;
    form.setErrors({ ...form.errors, confirmation_code: "" });
    form.values.confirmation_code = e.target.value;
  };
  return (
    <div className={styles.comfirmInput}>
      <input
        type={type}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default ComfirmInput;
