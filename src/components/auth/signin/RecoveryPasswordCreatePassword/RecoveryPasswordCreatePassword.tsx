import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import styles from "./RecoveryPasswordCreatePassword.module.scss";
import * as Yup from "yup";
import AuthButton from "../../../UI/authButton/AuthButton";
import RepeatPasswordInput from "../../AuthComponents/RepeatPasswordInput/RepeatPasswordInput";
import CreatePasswordInput from "../../AuthComponents/CreatePasswordInput/CreatePasswordInput";
import { IProps } from "../ChangePassword/ChangePassword";
import { recoveryPasswordThunk } from "../../../../store/slices/recoveryPasswordSlise";

export interface FormValues {
  password: string;
  password2: string;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Too Short!")
    .max(70, "Too Long!")
    .required("Введите пароль"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

const RecoveryPasswordCreatePassword: React.FC<IProps> = ({ setTitle }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const confirmation_code = JSON.parse(
    localStorage.getItem("confirmation_code") || ""
  );
  const user = JSON.parse(localStorage.getItem("userPhone") || "");

  const initialValues: FormValues = {
    password: "",
    password2: "",
  };

  const onSubmit = (values: FormValues) => {
    dispatch(
      recoveryPasswordThunk({
        phone: user.phone,
        confirmation_code: confirmation_code,
        new_password: values.password,
        new_password_repeat: values.password2,
      })
    );
    setTitle("Пароль успешно изменен");
    navigate("/success-page");
  };

  return (
    <div className={styles.createNewPassword}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          <Form className={styles.form}>
            <h2 className={styles.heading}>Восстановление пароля</h2>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type="password"
                  id="password"
                  component={CreatePasswordInput}
                  name="password"
                  placeholder="Введите новый пароль"
                />
                <ErrorMessage
                  component="p"
                  className={styles.errorMessage}
                  name="password"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type="password"
                  id="password2"
                  name="password2"
                  component={RepeatPasswordInput}
                  placeholder="Повторите новый пароль"
                />
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

export default RecoveryPasswordCreatePassword;
