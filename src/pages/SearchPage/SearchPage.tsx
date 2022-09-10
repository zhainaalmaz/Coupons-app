import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { searchCoupons } from "../../api/api";
import Card from "../../UI/Card/Card";
import { ISearchItem } from "../../components/Search/Search";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const params = useParams();
  const searchItem = params.searchValue;
  const [searchedCoupons, setSearchedCoupons] = useState<any[]>([]);
  const [sortModal, setSortModal] = useState(false);
  const [sort, setSort] = useState("lowPrice");
  const modalRef = useRef<HTMLHeadingElement>(null);
  const [count, setCount] = useState(8);

  const generateMoreCoupns = () => {
    setCount((count) => count + 8);
  };

  useEffect(() => {
    // console.log("searchItem");

    async function search() {
      if (searchItem) {
        const response = await searchCoupons(searchItem);
        setSearchedCoupons(
          response.data.results.sort((a: any, b: any) => +a.price - +b.price)
        );
      }
    }
    search();
  }, [searchItem]);

  const handleClick = (_sort: string) => {
    setSort(_sort);
    sortCoupons(_sort);
  };

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!modalRef.current?.contains(event.target as Element)) {
        setTimeout(() => setSortModal(false), 0);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  function sortCoupons(_sort: string) {
    console.log(_sort);
    if (_sort === "alphabet") {
      setSearchedCoupons(
        searchedCoupons.sort(function (a, b) {
          return a.company_name.localeCompare(b.company_name);
        })
      );
    } else if (_sort === "lowPrice") {
      setSearchedCoupons(searchedCoupons.sort((a, b) => +a.price - +b.price));
    } else if (_sort === "highPrice") {
      setSearchedCoupons(searchedCoupons.sort((a, b) => +b.price - +a.price));
    }
    setTimeout(() => setSortModal(false), 0);
  }
  return (
    <div className={styles.searchPage}>
      <div className="container">
        <div className={styles.searchTop}>
          <h2 className={styles.searchTitle}>Результаты поиска</h2>
          <div
            ref={modalRef}
            onClick={() => setSortModal(true)}
            className={styles.sort}
          >
            <p>Сортировать по</p>
            <span>&#9660;</span>
            {sortModal && (
              <div className={styles.sortBox}>
                <div className={styles.sortBoxInner}>
                  <div className={styles.sorts}>
                    <p>Сортировать по</p>
                    <span>&#9660;</span>
                  </div>
                  <button
                    onClick={() => {
                      handleClick("alphabet");
                    }}
                  >
                    По алфавиту
                  </button>
                  <button
                    onClick={() => {
                      handleClick("lowPrice");
                    }}
                  >
                    По цене (низкая {">"} высокая)
                  </button>
                  <button
                    onClick={() => {
                      handleClick("highPrice");
                    }}
                  >
                    По цене (высокая {">"} низкая)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {searchedCoupons.length > 0 ? (
          <>
            <div className={styles.cardFlexContainer}>
              {searchedCoupons.slice(0, count).map((it: ISearchItem) => (
                <Card key={it.id} it={it} />
              ))}
            </div>
            {count < searchedCoupons.length && (
              <div className={styles.moreButtonBox}>
                <button
                  className={styles.moreButton}
                  onClick={generateMoreCoupns}
                >
                  Загрузить еще
                </button>
              </div>
            )}
          </>
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
