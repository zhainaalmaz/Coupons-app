import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import styles from "./Enter.module.scss";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import AuthButton from "../../../../UI/AuthButton/AuthButton";
import { loginThunk } from "../../../../store/slices/loginSlice";

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
  const [userPhone, setUserPhone] = useState(
    JSON.parse(localStorage.getItem("user") || "")
  );
  return (
    <div className={styles.enter}>
      <div className={styles.wrapper}>
        <h3>Войдите, чтобы продолжить</h3>
        <div>{userPhone.phone}</div>
        <Formik
          initialValues={initialValues}
          validationSchema={EnterSchema}
          onSubmit={(values, actions) => {
            dispatch(
              loginThunk({
                phone: userPhone.phone,
                password: values.password,
              })
            );
            // status === "fulfilled" && navigate("/");
            console.log("try");
console.log(status);

            if (status === "rejected") {
              console.log("rejected");

              navigate("/");
            }

            actions.setSubmitting(false);
          }}
        >
          <Form className={styles.form}>
            <div className={styles.inputsWrapper}>
              <Field
                type="password"
                name="password"
                className={styles.formItem}
                placeholder="Введите код подтверждения"
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Enter;
