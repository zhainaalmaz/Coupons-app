import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import AuthButton from "../../UI/AuthButton/AuthButton";
import NameInput from "../auth/AuthComponents/NameInput/NameInput";
import SurnameInput from "../auth/AuthComponents/SurnameInput/SurnameInput";
import styles from "./MyProfile.module.scss";
import * as Yup from "yup";
import { changeProfile } from "../../api/api";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../store/slices/userSlice";

interface IUser {
  access: string;
  token: string;
  first_name: string;
  last_name: string;
  phone: string;
}

type Props = {
  user: IUser;
};

interface IValues {
  first_name: string;
  last_name: string;
}

const ProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Слишком короткое имя")
    .max(70, "Слишком длинное имя")
    .required("Введите имя"),
  last_name: Yup.string()
    .min(2, "Слишком короткое фамилия")
    .max(70, "Слишком длинное фамилия")
    .required("Введите фамилию"),
});

const MyProfile = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
  };
  console.log(initialValues);
  const onSubmit = async (values: IValues) => {
    const response = await changeProfile({
      first_name: values.first_name,
      last_name: values.last_name,
    });
    if (response.data) {
      
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...user,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        })
      );
      dispatch(setUser())
    }
  };

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>Профиль</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <Field
              name="first_name"
              className={styles.item}
              component={NameInput}
              placeholder="Введите ваше имя"
            />
            <ErrorMessage
              component="p"
              className={styles.errorMessage}
              name="first_name"
            />
          </div>
          <div className={styles.inputWrapper}>
            <Field
              name="last_name"
              className={styles.item}
              component={SurnameInput}
              placeholder="Введите ваше фамилие"
            />
            <ErrorMessage
              component="p"
              className={styles.errorMessage}
              name="last_name"
            />
          </div>
          <div className={styles.saveBtn}>
            <AuthButton type="submit">
              <p>Сохранить</p>
            </AuthButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MyProfile;
