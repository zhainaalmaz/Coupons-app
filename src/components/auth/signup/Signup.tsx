import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import React, { useState } from "react";
import AuthButton from "../../UI/authButton/AuthButton";
import styles from "./Signup.module.scss";
import * as Yup from "yup";
import { ReactComponent as EyeClose } from "../../../assets/auth-svg/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../../assets/auth-svg/eye-open.svg";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import PhoneInputField from "./PhoneInput/PhoneInput";

export interface FormValues {
  firstName: string;
  surname: string;
  phone: string;
  password: string;
  password_confirm: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите имя"),
  surname: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите фамилию"),
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите номер"),
  password: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите пароль"),
    password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

const Signup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  function eyeHandler(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setShow(!show);
  }
  function eyeHandler2(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setShow2(!show2);
  }

  const initialValues: FormValues = {
    firstName: "",
    surname: "",
    phone: "",
    password: "",
    password_confirm: "",
  };


  return (
    <div className={styles.signup}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form className={styles.form}>
            <h2 className={styles.heading}>Регистрация</h2>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  id="firstName"
                  name="firstName"
                  placeholder="Имя"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="firstName"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  id="surname"
                  name="surname"
                  placeholder="Фамилия"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="surname"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  type="tel"
                  name="phone"
                  className={styles.formItem}
                  component={PhoneInputField}
                  placeholder="Номер телефона"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="phone"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Придумайте пароль"
                />
                {show ? (
                  <EyeOpen onClick={eyeHandler} className={styles.eyeHandler} />
                ) : (
                  <EyeClose
                    onClick={eyeHandler}
                    className={styles.eyeHandler}
                  />
                )}
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="password"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type={show2 ? "text" : "password"}
                  id="password2"
                  name="password_confirm"
                  placeholder="Повторите пароль"
                />
                {show2 ? (
                  <EyeOpen
                    onClick={eyeHandler2}
                    className={styles.eyeHandler}
                  />
                ) : (
                  <EyeClose
                    onClick={eyeHandler2}
                    className={styles.eyeHandler}
                  />
                )}
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="password_confirm"
                />
              </div>
              <AuthButton type="submit">
                <p>Далее</p>
              </AuthButton>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
