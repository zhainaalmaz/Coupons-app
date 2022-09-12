import React, { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Search.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSearchedCouponsAsync } from '../../store/slices/searchSlice';
import { useNavigate } from 'react-router-dom';
import SearchCard from './SearchCard';
import CloseIcon from '@mui/icons-material/Close';
import { clearState } from '../../store/slices/searchSlice';

export interface ISearchItem {
  company_logo: string;
  company_name: string;
  conditions: string;
  description: string;
  discount_percent: number;
  id: number;
  is_active: boolean;
  old_price: string;
  order: number;
  preview_image: string;
  price: string;
  price_for_coupon: string;
  title: string;
}

const Search = () => {
  const dispatch = useAppDispatch();
  let state = useAppSelector((state) => state.search);
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const ref = React.useRef<HTMLInputElement>(null);
  const handleSearch = (event: any) => {
    if (event.target.value) {
      let searchText = event.target.value;
      setSearchValue(searchText);
      dispatch(getSearchedCouponsAsync(searchText));
      setShow(true);
    } else {
      setShow(false);
      dispatch(clearState());
    }
  };
  const clearInput = () => {
    setSearchValue('');
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const handleNavigate = () => {
    setSearchValue('');
    navigate(`/searchpage/${searchValue}`);
    clearInput();
    setShow(false);
    setShowInput(false);
  };

  const inputHandler = () => {
    if (searchValue !== '') {
      setShow(true);
    }
  };

  const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const clearCouponsArray = () => {
    dispatch(clearState());
  };

  return (
    <div className={styles.searchOutter}>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            ref={ref}
            onBlur={() => setTimeout(() => setShow(false), 200)}
            onKeyDown={(e) => enterHandler(e)}
            onClick={() => inputHandler()}
            onChange={handleSearch}
            placeholder="Поиск"
            type="text"
          />
          <div className={styles.searchIcon}>
            <SearchIcon
              className={styles.searchIcon}
              onClick={handleNavigate}
            />
          </div>
        </div>
      </div>
      <div className={styles.smallSearch}>
        {showInput ? (
          <div onClick={() => setShowInput(false)}>
            <CloseIcon
              onClick={() => clearCouponsArray()}
              className={styles.searchIcon}
            />
          </div>
        ) : (
          <div onClick={() => setShowInput(true)}>
            <SearchIcon className={styles.searchIcon} />
          </div>
        )}
        {showInput ? (
          <div className={styles.smallSearchOutter}>
            <div className={styles.smallSearchInputs}>
              <input
                onBlur={() => setTimeout(() => setShow(false), 200)}
                ref={ref}
                onKeyDown={(e) => enterHandler(e)}
                onClick={() => inputHandler()}
                onChange={handleSearch}
                placeholder="Поиск"
                type="text"
              />
              <div className={styles.smallSearchIcon}>
                <SearchIcon onClick={handleNavigate} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {state.searchedCoupons.length != 0 && show && (
        <div className={styles.dataResultOutter}>
          <div className={styles.dataResult}>
            {state.searchedCoupons.map((item: ISearchItem, index: number) => (
              <SearchCard
                value={item}
                key={index}
                clearInput={clearInput}
                setShowInput={setShowInput}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
