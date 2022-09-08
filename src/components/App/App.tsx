import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Confidential from "../Confidential/Confidential";

import "./App.css";
import Main from "../../pages/MainPage/Main";
import NewCouponsPage from "../../pages/NewCouponsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContactPage from "../../pages/ContactPage";
import AboutPage from "../../pages/AboutUsPage/AboutPage";
import HelpPage from "../../pages/HelpPage";
import SearchPage from "../../pages/SearchPage/SearchPage";

import Signup from "../auth/signup/Signup";
import ScrollToTop from "../ScrollToTop";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"sign-up"} element={<Signup />} />
          <Route path={"new-coupons"} element={<NewCouponsPage />} />
          <Route path={"about"} element={<AboutPage />} />
          <Route path={"contacts"} element={<ContactPage />} />
          <Route path={"help"} element={<HelpPage />} />
          <Route path="/searchpage/:searchValue" element={<SearchPage />} />
          <Route path={"/confidential"} element={<Confidential />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
