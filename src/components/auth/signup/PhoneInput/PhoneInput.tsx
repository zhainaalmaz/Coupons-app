import React, { useCallback } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormValues } from "../Signup";
import styles from "./PhoneInput.module.scss";

interface IFieldObject {
  name: string;
  value: string;
  onBlur: (event: Event) => void;
  onChange: (value: any) => string;
}
interface IErrors {
  firstName?: string;
  surname?: string;
  phone?: string;
  password?: string;
  password_confirm?: string;
}
interface IForm {
  values: FormValues;
  errors: IErrors;
  setErrors: (value: IErrors) => void;
  handleChange: (value: any) => void;
}

interface IPhoneInput {
  field: IFieldObject;
  form: IForm;
  className: string;
  type: string;
  id: string;
}

const PhoneInputField: React.FC<IPhoneInput> = ({
  field,
  form,
  className,
  id,
  type,
}) => {
  //   const blurHandler = () => {
  //     console.log('[pbluerr');
  //     form.setErrors({ phone: "Введите номер" });
  //   };

  function onChange(e: string) {
    delete form.errors.phone;
    form.setErrors({ ...form.errors, phone: "" });
    form.values.phone = e;
    console.log(form);
  }

  return (
    <div className="input-field">
      <PhoneInput
        autoComplete="off"
        defaultCountry="KG"
        onChange={onChange}
        placeholder="Номер телефона"
        name={field.name}
        type={type}
        id={id}
        className={className}
      />
    </div>
  );
};

export default PhoneInputField;
