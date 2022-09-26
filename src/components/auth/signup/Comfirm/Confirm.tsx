import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import AuthButton from "../../../../UI/AuthButton/AuthButton";
import styles from "./Comfirm.module.scss";
import * as Yup from "yup";
import { confirmThunk } from "../../../../store/slices/confirmSlice";
import { loginThunk } from "../../../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import ComfirmInput, {
  FormValues,
} from "../../AuthComponents/ConfirmInput/ComfirmInput";
import { setUser } from "../../../../store/slices/userSlice";

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

interface IProps {
  setTitle: Function;
}

const Confirm: React.FC<IProps> = ({ setTitle }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { statusCode, error } = useAppSelector(
    (state) => state.confirm.loginConfirm
  );
  const user = JSON.parse(localStorage.getItem("user") || "");

  const login = async () => {
    await dispatch(
      loginThunk({
        phone: user.phone,
        password: user.password,
      })
    );
    await dispatch(setUser());
    setTitle("Телефон подтвержден");
    navigate("/success-page");
  };

  if (statusCode) {
    login();
  }

  const onSubmit = (values: FormValues) => {
    dispatch(
      confirmThunk({
        ...user,
        confirmation_code: values.confirmation_code,
      })
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
            <h3 className={styles.title}>Подтверждение номера телефона</h3>
            <div>
              <p className={styles.number}> {user.phone}</p>
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
                <>Подтвердить</>
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

export default Confirm;
