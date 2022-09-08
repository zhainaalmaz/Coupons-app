import React, { useEffect, useState } from 'react';
import Navigation from '../../UI/Navigation/Navigation';
import styles from './About.module.scss';

interface IAboutInfo {
  data: {};
  description: string;
}

const AboutPage = () => {
  const [data, setData] = useState({} as IAboutInfo);
  const getInfo = async () => {
    try {
      const response = await fetch(
        `http://185.178.44.117/api/v1/info/about-us`
      );
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={styles.layout}>
      <div className="container">
        <div className={styles.wrapper}>
          <Navigation />
          <div className={styles.info}>
            <h2>О нас</h2>
            <div>{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
