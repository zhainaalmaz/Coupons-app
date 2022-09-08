import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchCoupons } from "../../api/api";
import Card from "../../UI/Card/Card";
import { ISearchItem } from "../../components/Search/Search";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const params = useParams();
  const searchItem = params.searchValue;
  const [searchedCoupons, setSearchedCoupons] = useState([]);

  useEffect(() => {
    async function search() {
      if (searchItem) {
        const response = await searchCoupons(searchItem);
        setSearchedCoupons(response.data.results);
      }
    }
    search();
  }, [searchItem]);
  return (
    <div className={styles.searchPage}>
      <div className="container">
        <h2 className={styles.searchTitle}>Результаты поиска</h2>
        {searchedCoupons.length > 0 ? (
          <div className={styles.cardFlexContainer}>
            {searchedCoupons.map((it: ISearchItem) => (
              <Card key={it.id} it={it} />
            ))}
          </div>
        ) : (
          <div className={styles.noSearchItems}>
            <h2>По этому запросу ничего не найдено</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
