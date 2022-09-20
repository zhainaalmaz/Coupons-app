import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import styles from "./NewPhoneConfirm.module.scss";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import ComfirmInput from "../../../AuthComponents/ConfirmInput/ComfirmInput";

import AuthButton from "../../../../../UI/AuthButton/AuthButton"
import { newPhoneConfirmThunk } from "../../../../../store/slices/confirmSlice";

const ConfirmSchema = Yup.object().shape({
  confirmation_code: Yup.string()
    .min(1, "Too Short!")
    .max(6, "Too Long!")
    .required("Введите код"),
});

interface IConfCode {
  confirmation_code: string;
}

const initialValues: IConfCode = {
  confirmation_code: "",
};

interface IProps {
  setTitle: Function;
}

const NewPhoneConfirm: React.FC<IProps> = ({ setTitle }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { statusCode, error } = useAppSelector(
    (state) => state.confirm.newPhoneConfirm
  );
  const state = useAppSelector(state => state.confirm)
  
  const phone = JSON.parse(localStorage.getItem("userPhone") || "");

  const onSubmit = (values: IConfCode) => {
    dispatch(
      newPhoneConfirmThunk({
        confirmation_code: values.confirmation_code,
        phone: phone,
      })
    );
  };

  useEffect(() => {
  console.log(statusCode);
  console.log(state);
  

    if (statusCode === "New phone is confirmed") {
      setTitle("Номер успешно изменен");
      navigate("/success-page");
    }
  }, [statusCode]);

  return (
    <div className={styles.confirm}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={ConfirmSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className={styles.form}>
            <h3 className={styles.title}>Подтверждение номера телефона</h3>
            <div>
              <p className={styles.number}> {phone}</p>
              <div className={styles.confirmationMessage}>
                Неверный номер телефона?
              </div>
            </div>
            <div className={styles.inputsWrapper}>
              <Field
                type="tel"
                component={ComfirmInput}
                name="confirmation_code"
                className={styles.formItem}
                placeholder="Введите код подтверждения"
              />
              {error && <div className={styles.errorCode}>Неверный код</div>}
              <ErrorMessage
                component="p"
                className={styles.errorMessage}
                name="confirmation_code"
              />
            </div>
            <div>
              <AuthButton type="submit">
                <p>Подтвердить</p>
              </AuthButton>
            </div>

            <div>
              <div className={styles.message}>Не пришло SMS подтверждение?</div>
              <button className={styles.resendMessageBtn}>
                Отправить снова через 0:59
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default NewPhoneConfirm;
