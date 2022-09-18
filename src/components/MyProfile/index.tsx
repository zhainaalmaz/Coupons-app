import React, { useState } from "react";
import AuthButton from "../../UI/AuthButton/AuthButton";
import NameInput from "../auth/AuthComponents/NameInput/NameInput";
import styles from "./MyProfile.module.scss";

interface IUser {
  access: string;
  first_name: string;
  last_name: string;
  phone: string;
}

type Props = {
  user: IUser;
};

const MyProfile = ({ user }: Props) => {
  const [name, setName] = useState(user.first_name);
  const [surname, setSurname] = useState(user.last_name);

  const nameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const surnameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  return (
    <div className={styles.info}>
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.inputs}>
        <input
          value={name}
          onChange={nameInputHandler}
          placeholder="Введите ваше имя"
        />
        <input
          value={surname}
          onChange={surnameInputHandler}
          placeholder="Введите ваше фамилие"
        />
      </div>
      <div className={styles.saveBtn}>
        <AuthButton type="submit">
          <p>Сохранить</p>
        </AuthButton>
      </div>
    </div>
  );
};

export default MyProfile;
