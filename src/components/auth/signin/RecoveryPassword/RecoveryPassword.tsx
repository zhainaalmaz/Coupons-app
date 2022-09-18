import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { checkThunk } from "../../../../store/slices/checkSlice";
import AuthButton from "../../../../UI/AuthButton/AuthButton";
import PhoneInputField from "../../signup/PhoneInput/PhoneInput";
import styles from "./RecoveryPassword.module.scss";

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

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.check);

  const initialValues: FormValue = {
    phone: "",
  };

  const onSubmit = (values: FormValue) => {
    dispatch(
      checkThunk({
        phone: values.phone,
      })
    );
    localStorage.setItem("user", JSON.stringify(values));
  };

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/recovery-password/confirm");
    }
  }, [status]);

  return (
    <div className={styles.recoveryPassword}>
      <div className="container">
        <div className="wrapper">
          <h3 className={styles.title}>Восстановление пароля</h3>
          <div className={styles.description}>
            Введите номер телефона чтобы отправить код подтверждения
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => onSubmit(values)}
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
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
