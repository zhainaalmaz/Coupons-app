import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import styles from "./Signup.module.scss";
import * as Yup from "yup";
import PhoneInputField from "./PhoneInput/PhoneInput";
import { authThunk } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import NameInput from "../AuthComponents/NameInput/NameInput";
import SurnameInput from "../AuthComponents/SurnameInput/SurnameInput";
import CreatePasswordInput from "../AuthComponents/CreatePasswordInput/CreatePasswordInput";
import RepeatPasswordInput from "../AuthComponents/RepeatPasswordInput/RepeatPasswordInput";
import AuthButton from "../../../UI/AuthButton/AuthButton";

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

export interface FormValues {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  password2: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    password2: "",
  };

  const onSubmit =  (values: FormValues) => {
     localStorage.setItem("user", JSON.stringify(values));
     dispatch(authThunk(values));
    

    navigate("/confirm");
  };

  return (
    <div className={styles.signup}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            onSubmit(values);
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
                  component={NameInput}
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
                  component={SurnameInput}
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
                  type="password"
                  id="password"
                  component={CreatePasswordInput}
                  name="password"
                  placeholder="Придумайте пароль"
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
                  placeholder="Повторите пароль"
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

export default Signup;
