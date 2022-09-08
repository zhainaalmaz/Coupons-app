import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

import { asyncSubtitleTags } from "../../store/slices/tagSlice/tagSlice";
import "./App.css";
import Main from "../../pages/MainPage/Main";
import NewCouponsPage from "../../pages/NewCouponsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Signup from '../auth/signup/Signup';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSubtitleTags());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App-header">
        <Header />
          <Routes>
            <Route path={"sign-in"} element={<Signup />} />
            <Route path={"/"} element={<Main />} />
            <Route path={"/new-coupons"} element={<NewCouponsPage />} />
          </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
