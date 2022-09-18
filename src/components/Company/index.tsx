import React from "react";
import styles from "./Company.module.scss";

type Props = {
  isLoading: boolean;
  companyInfo: any;
};

const Company = ({ isLoading, companyInfo }: Props) => {
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className={styles.header}>
      <img className={styles.logo} src={companyInfo.logo} />
      <div className={styles.info}>
        <div className={styles.title}>{companyInfo.company_name}</div>
        <div className={styles.description}>{companyInfo.description}</div>
      </div>
    </div>
  );
};

export default Company;
