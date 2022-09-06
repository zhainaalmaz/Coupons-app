import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.scss"

const Search = () => {
    return (
      <div className={styles.searchOutter}>
        <div className={styles.search}>
          <div className={styles.searchInputs}>
            <input placeholder="Поиск" type="text" />
            <div className={styles.searchIcon}>
              <SearchIcon className={styles.searchIcon} />
            </div>
          </div>
        </div>
        <div className={styles.smallSearch}>
          <SearchIcon className={styles.searchIcon} />
          <div className={styles.smallSearchInputs}>
            <input placeholder="Поиск" type="text" />
            <div className={styles.smallSearchIcon}>
              <SearchIcon className={styles.searchIcon} />
            </div>
          </div>
        </div>
        {/* {filteredData.length != 0 && show && (
          <div className="data-result-outter">
            <div className="data-result">
              {filteredData.map((value, index) => (
                <SearchCard value={value} key={index} clearInput={clearInput} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    );
};

export default Search;