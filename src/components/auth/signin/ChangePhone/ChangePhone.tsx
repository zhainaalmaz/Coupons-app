import React, { useEffect } from "react";
import styles from "./ChangePhone.module.scss";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changePhoneThunk } from "../../../../store/slices/changePhoneSlice/index";
import PhoneInputField from "../../signup/PhoneInput/PhoneInput";
import AuthButton from "../../../../UI/AuthButton/AuthButton";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const passwordSchema = Yup.object().shape({
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(15, "Too Long!")
    .required("Введите номер")
    .matches(phoneRegExp, "Неправильно введен номер"),
});

export interface IProps {
  setTitle: Function;
}
interface IPhone {
  phone: string;
}

const initialValue: IPhone = {
  phone: "",
};

const ChangePhone: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.changePhone);
  const onSubmit = (values: IPhone) => {
    dispatch(
      changePhoneThunk({
        phone: values.phone,
      })
    );
    localStorage.setItem("userPhone", JSON.stringify(values.phone));
  };

  useEffect(() => {
    if (status === "rejected") {
      navigate("/change-phone/confirm");
    }
  }, [status]);

  return (
    <div className={styles.changePhone}>
      <div className="container">
        <Formik
          initialValues={initialValue}
          validationSchema={passwordSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className={styles.form}>
            <h3>Смена номера </h3>
            <div className={styles.description}>
              Введите новый номер телефона чтобы отправить код подтверждения
            </div>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={styles.formItem}
                  type="tel"
                  name="phone"
                  component={PhoneInputField}
                  placeholder="Новый номер телефона"
                />
                {error === "Request failed with status code 406" && (
                  <div className={styles.errorPhone}>
                    Такой номер телефона уже существует
                  </div>
                )}
                <ErrorMessage
                  className={styles.errorMessage}
                  name="phone"
                  component="p"
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

export default ChangePhone;
