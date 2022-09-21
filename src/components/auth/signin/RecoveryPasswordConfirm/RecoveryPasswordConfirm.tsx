import React, { useEffect } from "react";
import styles from "./RecoveryPasswordConfirm.module.scss";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ComfirmInput, {
  FormValues,
} from "../../AuthComponents/ConfirmInput/ComfirmInput";
import { recoveryPasswordConfirmThunk } from "../../../../store/slices/recoveryPasswordSlise";
import AuthButton from "../../../../UI/AuthButton/AuthButton";

const ConfirmSchema = Yup.object().shape({
  confirmation_code: Yup.string()
    .min(1, "Too Short!")
    .max(15, "Too Long!")
    .required("Введите код"),
});

interface IConfCode {
  confirmation_code: string;
}

const initialValues: IConfCode = {
  confirmation_code: "",
};

const RecoveryPasswordConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.recoveryRassword.recoveryPasswordConfirm);
  const user = JSON.parse(localStorage.getItem("userPhone") || "");

  useEffect(() => {
    if (status === "fulfilled") {

      navigate("/recovery-password/confirm/create-password");
    }
  }, [status]);

  const onSubmit = (values: FormValues) => {

    dispatch(
      recoveryPasswordConfirmThunk({
        ...user,
        confirmation_code: values.confirmation_code,
      })
    );
    localStorage.setItem(
      "confirmation_code",
      JSON.stringify(values.confirmation_code)
    );
  };
  return (
    <div className={styles.confirm}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={ConfirmSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className={styles.form}>
            <h3 className={styles.title}>Восстановление пароля</h3>
            {/* <div className={styles.description}>
              Введите номер телефона чтобы отправить код подтверждения
            </div> */}
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

            {/* <div>
              <div className={styles.message}>Не пришло SMS подтверждение?</div>
              <button className={styles.resendMessageBtn}>
                Отправить снова через 0:59
              </button>
            </div> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RecoveryPasswordConfirm;
