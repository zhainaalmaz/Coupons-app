import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchCoupons } from "../../api/api";
import Card from "../../UI/Card/Card";
import { ISearchItem } from "../../components/Search/Search";
import styles from "./SearchPage.module.scss";
import { useClickOutside } from "../../hooks";
import BreadCrumps from "../../components/BreadCrumps/BreadCrumps";
import Skeleton from "../../UI/Skeleton/Skeleton";

const SearchPage = () => {
  const params = useParams();
  const searchItem = params.searchValue;
  const [searchedCoupons, setSearchedCoupons] = useState<any[]>([]);
  const [sortModal, setSortModal] = useState(false);
  const [sort, setSort] = useState("lowPrice");
  const modalRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const generateMoreCoupns = () => {
    setCount((count) => count + 8);
  };

  useEffect(() => {
    async function search() {
      setIsLoading(true);
      if (searchItem) {
        const response = await searchCoupons(searchItem);
        setSearchedCoupons(
          response.data.results.sort((a: any, b: any) => +a.price - +b.price)
        );
        setTimeout(() => setIsLoading(false), 500);
      }
    }
    search();
  }, [searchItem]);

  const handleClick = (_sort: string) => {
    setSort(_sort);
    sortCoupons(_sort);
  };

  useClickOutside(modalRef, setSortModal);

  function sortCoupons(_sort: string) {
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

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setSortModal(false);
  };
  return (
    <>
      <BreadCrumps />
      <div className={styles.searchPage}>
        <div className="container">
          <div className={styles.searchTop}>
            <h2 className={styles.searchTitle}>???????????????????? ????????????</h2>

            <div
              ref={modalRef}
              onClick={() => setSortModal(true)}
              className={styles.sort}
            >
              <p>?????????????????????? ????</p>
              <span>&#9660;</span>
              {sortModal && (
                <div className={styles.sortBox} onClick={(e) => closeModal(e)}>
                  <div className={styles.sortBoxInner}>
                    <div className={styles.sorts}>
                      <p>?????????????????????? ????</p>
                    </div>
                    <button
                      onClick={() => {
                        handleClick("alphabet");
                      }}
                    >
                      ???? ????????????????
                    </button>
                    <button
                      onClick={() => {
                        handleClick("lowPrice");
                      }}
                    >
                      ???? ???????? (???????????? {">"} ??????????????)
                    </button>
                    <button
                      onClick={() => {
                        handleClick("highPrice");
                      }}
                    >
                      ???? ???????? (?????????????? {">"} ????????????)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {searchedCoupons.length > 0 ? (
            <>
              <div className={styles.cardFlexContainer}>
                {searchedCoupons.slice(0, count).map((it: ISearchItem) =>
                  isLoading ? (
                    <Skeleton key={it.id} />
                  ) : (
                    <Link to={"/coupon/" + it.id} key={it.id}>
                      <Card it={it} />
                    </Link>
                  )
                )}
              </div>
              {count < searchedCoupons.length && (
                <div className={styles.moreButtonBox}>
                  <button
                    className={styles.moreButton}
                    onClick={generateMoreCoupns}
                  >
                    ?????????????????? ??????
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noSearchItems}>
              <h2>???? ?????????? ?????????????? ???????????? ???? ??????????????</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
