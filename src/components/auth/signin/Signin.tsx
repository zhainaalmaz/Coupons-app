import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import styles from "./Signin.module.scss";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Link, useNavigate } from "react-router-dom";
import PhoneInputField from "../signup/PhoneInput/PhoneInput";
import AuthButton from "../../../UI/AuthButton/AuthButton";
import { checkThunk } from "../../../store/slices/checkSlice";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите номер")
    .matches(phoneRegExp, "Неправильно введен номер"),
});

interface FormValue {
  phone: string;
}

const initialValues: FormValue = {
  phone: "",
};

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, statusCode } = useAppSelector((state) => state.check);
  useEffect(() => {

    if (statusCode) {
      navigate("/enter");
    }
  }, [statusCode]);

  return (
    <div className={styles.signin}>
      <div className="container">
        <div className="wrapper">
          <h3 className={styles.title}>Войдите, чтобы продолжить</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={values => {
              dispatch(
                checkThunk({
                  phone: values.phone,
                })
              );
              localStorage.setItem("userPhone", JSON.stringify(values));
            }}
          >
            <Form className={styles.form}>
              <div className={styles.inputWrapper}>
                <Field
                  type="tel"
                  name="phone"
                  className={styles.formItem}
                  component={PhoneInputField}
                  placeholder="Введите номер телефона"
                />
                {error === "Request failed with status code 404" && (
                  <div className={styles.errorCode}>Такого номера нет</div>
                )}
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="phone"
                />
              </div>

              <AuthButton type="submit">
                <p>Войти</p>
              </AuthButton>
            </Form>
          </Formik>
          <Link to="/sign-up">
            <div className={styles.signup}>Зарегистрироваться</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
