import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import styles from "./ChangePassword.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import AuthButton from "../../../UI/authButton/AuthButton";
import { ReactComponent as EyeClose } from "../../../../assets/auth-svg/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../../../assets/auth-svg/eye-open.svg";
import { changePasswordThunk } from "../../../../store/slices/changePasswordSlise";

interface IPassword {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
}

const initialValue: IPassword = {
  old_password: "",
  new_password: "",
  new_password_repeat: "",
};

const passwordSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(1, "Too Short!")
    .max(12, "Too Long!")
    .required("Введите пароль"),
  new_password: Yup.string()
    .min(1, "Too Short!")
    .max(12, "Too Long!")
    .required("Повторите пароль"),
  new_password_repeat: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

export interface IProps {
  setTitle: Function;
}

const ChangePassword: React.FC<IProps> = ({ setTitle }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { status } = useAppSelector((state) => state.changePassword);

  useEffect(() => {
    setTitle("Пароль успешно изменен");
    if (status === "fulfilled") navigate("/success-page");
  }, [status]);

  return (
    <div className={styles.changePassword}>
      <div className="container">
        <div className={styles.wrapper}>
          <h3>Сменить пароль</h3>
          <Formik
            initialValues={initialValue}
            validationSchema={passwordSchema}
            onSubmit={(values, actions) => {
              dispatch(
                changePasswordThunk({
                  old_password: values.old_password,
                  new_password: values.new_password,
                  new_password_repeat: values.new_password_repeat,
                })
              );
            }}
          >
            <Form className={styles.form}>
              <div className={styles.inputsWrapper}>
                <div className={styles.inputWrapper}>
                  <Field
                    className={styles.formItem}
                    type="password"
                    name="old_password"
                    placeholder="Текущий пароль"
                  />
                  {status === "rejected" && <div className={styles.errorPassword}>Неверный пароль</div>}
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="old_password"
                    component="p"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Field
                    className={styles.formItem}
                    type={show ? "text" : "password"}
                    name="new_password"
                    placeholder="Придумайте пароль"
                  />
                  {show ? (
                    <EyeOpen
                      onClick={() => setShow(false)}
                      className={styles.eyeHandler}
                    />
                  ) : (
                    <EyeClose
                      onClick={() => setShow(true)}
                      className={styles.eyeHandler}
                    />
                  )}
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="new_password"
                    component="p"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Field
                    className={styles.formItem}
                    type={show2 ? "text" : "password"}
                    name="new_password_repeat"
                    placeholder="Повторите пароль"
                  />
                  {show2 ? (
                    <EyeOpen
                      onClick={() => setShow2(false)}
                      className={styles.eyeHandler}
                    />
                  ) : (
                    <EyeClose
                      onClick={() => setShow2(true)}
                      className={styles.eyeHandler}
                    />
                  )}

                  <ErrorMessage
                    className={styles.errorMessage}
                    name="new_password_repeat"
                    component="p"
                  />
                </div>
                <AuthButton type="submit">
                  <p>Сохранить</p>
                </AuthButton>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
