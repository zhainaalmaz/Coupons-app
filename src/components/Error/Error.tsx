import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Error.module.scss"

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.blockOutter}>
            <div className="container">
                <div className={styles.block}>
                    <h4>Ошибка</h4>
                    <span>404</span>
                    <p>Страница не найдена</p>
                    <button onClick={()=>navigate("/")}>На главную</button>
                </div>
            </div>
        </div>
    );
};

export default Error;