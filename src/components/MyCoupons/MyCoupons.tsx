import { Card, Divider } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Profile from '../../UI/Profile/Profile';
import styles from './MyCoupons.module.scss';

// interface Icoupon {
//   company_logo: string;
//   company_name: string;
//   conditions: string;
//   description: string;
//   discount_percent: number;
//   id: number;
//   is_active: boolean;
//   old_price: string;
//   order: number;
//   preview_image: string;
//   price: string;
//   price_for_coupon: string;
//   title: string;
// }

const MyCoupons: FC = () => {
  const [active, setActive] = useState<string>('button1');
  const [data, setData] = useState([]);

  const getMyCoupons = async () => {
    const token = JSON.parse(localStorage.getItem('currentUser') || '');
    return axios({
      url: 'http://185.178.44.117/api/v1/coupons/my-stocks/?status=expired',
      headers: {
        Authorization: 'Bearer ' + token.access,
      },
    }).then((response) => {
      console.log(response.data);

      return response.data;
    });
  };
  useEffect(() => {
    getMyCoupons();
  }, []);

  const myCouponsHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = e.target as HTMLButtonElement;
    setActive(id);
  };

  return (
    <div className={styles.layout}>
      <div className="container">
        <div className={styles.wrapper}>
          <Profile />
          <div className={styles.info}>
            <h2>Мои купоны</h2>
            <Divider className={styles.divider} />
            <div className={styles.buttons}>
              <button
                id={'button1'}
                className={active === 'button1' ? styles.activeButton : 'null'}
                onClick={myCouponsHandler}
              >
                Активные
              </button>
              <button
                id={'button2'}
                className={active === 'button2' ? styles.activeButton : 'null'}
                onClick={myCouponsHandler}
              >
                Активированные
              </button>
              <button
                id={'button3'}
                className={active === 'button3' ? styles.activeButton : 'null'}
                onClick={myCouponsHandler}
              >
                Истекшие
              </button>
            </div>
            <div>Чтобы увидеть Активные купоны авторизуйтесь</div>
            {/* <div>
              {data?.results.map((item: Icoupon) => (
                <Card it={item} key={item.id} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoupons;
