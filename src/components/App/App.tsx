import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

import { asyncSubtitleTags } from "../../store/slices/tagSlice/tagSlice";
import "./App.css";
import Main from "../../pages/MainPage/Main";
import NewCouponsPage from "../../pages/NewCouponsPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSubtitleTags());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/new-coupons"} element={<NewCouponsPage />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
