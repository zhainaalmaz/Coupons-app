import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISearchItem } from "./Search";
import styles from "./Search.module.scss";

type Props = {
  value: ISearchItem;
  clearInput: () => void;
  setShowInput: (value: boolean) => void;
};

const SearchCard = ({ value, clearInput, setShowInput }: Props) => {
  const navigate = useNavigate();
  function checkDetails() {
    navigate(`/details/${value.id}`);
    clearInput();
    setShowInput(false);
  }
  return (
    <span key={value.id} onClick={checkDetails} className={styles.dataItem}>
      {value.title}
    </span>
  );
};

export default SearchCard;
