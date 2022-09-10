import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import React, { useState } from "react";
import AuthButton from "../../../UI/AuthButton/AuthButton";
import styles from "./Signup.module.scss";
import * as Yup from "yup";
import { ReactComponent as EyeClose } from "../../../assets/auth-svg/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../../assets/auth-svg/eye-open.svg";
import PhoneInputField from "./PhoneInput/PhoneInput";
import { authThunk } from "../../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export interface FormValues {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  password2: string;
}

const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите имя"),
    last_name: Yup.string()
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
    password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

const Signup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
    const navigate = useNavigate()
  const dispatch = useAppDispatch();
   

  function eyeHandler(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setShow(!show);
  }
  function eyeHandler2(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setShow2(!show2);
  }

  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    password2: "",
  };

  return (
    <div className={styles.signup}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            dispatch(authThunk(values));
            navigate('/confirm')
            localStorage.setItem('user', JSON.stringify(values))
            actions.setSubmitting(false);
          }}
        >
          <Form className={styles.form}>
            <h2 className={styles.heading}>Регистрация</h2>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  id="first_name"
                  name="first_name"
                  placeholder="Имя"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="first_name"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  id="last_name"
                  name="last_name"
                  placeholder="Фамилия"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="last_name"
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
                  name="password2"
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
                  name="password2"
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
