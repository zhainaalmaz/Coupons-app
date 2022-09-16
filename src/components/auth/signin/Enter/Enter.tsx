import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./Enter.module.scss";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import AuthButton from "../../../UI/authButton/AuthButton";
import { loginThunk } from "../../../../store/slices/loginSlice";
import CreatePasswordInput from "../../AuthComponents/CreatePasswordInput/CreatePasswordInput";

const EnterSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Too Short!")
    .max(6, "Too Long!")
    .required("Введите код"),
});

interface IConfCode {
  password: string;
}

const initialValues: IConfCode = {
  password: "",
};

const Enter: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.login);

   const user =  JSON.parse(localStorage.getItem("userPhone") || "")


  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/");
    }
  }, [status]);

  const onSubmit = (values: IConfCode) => {
    dispatch(
      loginThunk({
        phone: user?.phone,
        password: values.password,
      })
    );
  };

  return (
    <div className={styles.enter}>
      <div className={styles.wrapper}>
        <h3>Войдите, чтобы продолжить</h3>
        <div className={styles.phone}>{user?.phone}</div>
        <Formik
          initialValues={initialValues}
          validationSchema={EnterSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className={styles.form}>
            <div className={styles.inputsWrapper}>
              <Field
                type="password"
                name="password"
                component={CreatePasswordInput}
                className={styles.formItem}
                placeholder="Введите пароль"
              />
              {error === "Request failed with status code 401" && (
                <div className={styles.errorCode}>Неверный пароль.</div>
              )}
              <ErrorMessage
                component="p"
                className={styles.errorMessage}
                name="password"
              />
            </div>
            <AuthButton type="submit">
              <p>Войти</p>
            </AuthButton>
            <Link to="/recovery-password">
              <div className={styles.recovery}>Не помню пароль</div>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Enter;
