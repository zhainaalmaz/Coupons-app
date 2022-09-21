import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "../ScrollToTop";
import Error from "../Error/Error";

import "./App.scss";
import Main from "../../pages/MainPage/Main";
import NewCouponsPage from "../../pages/NewCouponsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContactPage from "../../pages/ContactPage";
import AboutPage from "../../pages/AboutUsPage/AboutPage";
import Confidential from "../Confidential/Confidential";
import HelpPage from "../../pages/HelpPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import FavoritesPage from "../../pages/Favorites/Favorites";

import Signup from "../auth/signup/Signup";
import Confirm from "../auth/signup/Comfirm/Confirm";
import Signin from "../auth/signin/Signin";
import Enter from "../auth/signin/Enter/Enter";
import ChangePassword from "../auth/signin/ChangePassword/ChangePassword";
import SuccessPage from "../auth/AuthComponents/SuccessPage/SuccessPage";
import RecoveryPassword from "../auth/signin/RecoveryPassword/RecoveryPassword";
import RecoveryPasswordCreatePassword from "../auth/signin/RecoveryPasswordCreatePassword/RecoveryPasswordCreatePassword";
import RecoveryPasswordConfirm from "../auth/signin/RecoveryPasswordConfirm/RecoveryPasswordConfirm";
import ChangePhone from "../auth/signin/ChangePhone/ChangePhone";
import NewPhoneConfirm from "../auth/signin/ChangePhone/NewPhoneConfirm/NewPhoneConfirm";

import CouponDetailsPage from "../../pages/CouponDetailsPage";
import ProfilePage from "../../pages/ProfilePage";
import MyCouponsPage from "../../pages/MyCouponsPage";
import CompanyPage from "../../pages/CompanyPage";

function App() {
  const [title, setTitle] = useState(null);

  return (
    <div className="App">
      <Header />
      <ScrollToTop />

      <Routes>
        {/* {routes.map(el => (
          <Route path={el.path} element={el.component}/>
        ))} */}
        <Route path={"/"} element={<Main />} />
        <Route path={"profile"} element={<ProfilePage />} />
        <Route path={"sign-up"} element={<Signup />} />
        <Route path={"enter"} element={<Enter />} />
        <Route path={"sign-in"} element={<Signin />} />

        <Route
          path={"change-password"}
          element={<ChangePassword setTitle={setTitle} />}
        />
        <Route
          path={"change-phone"}
          element={<ChangePhone setTitle={setTitle} />}
        />
        <Route
          path={"/change-phone/confirm"}
          element={<NewPhoneConfirm setTitle={setTitle} />}
        />
        <Route path={"recovery-password"} element={<RecoveryPassword />} />
        <Route
          path={"recovery-password/confirm"}
          element={<RecoveryPasswordConfirm />}
        />

        <Route
          path={"recovery-password/confirm/create-password"}
          element={<RecoveryPasswordCreatePassword setTitle={setTitle} />}
        />
        <Route path={"success-page"} element={<SuccessPage title={title} />} />
        <Route path={"confirm"} element={<Confirm setTitle={setTitle} />} />

        <Route path={"new-coupons"} element={<NewCouponsPage />} />
        <Route path={"about"} element={<AboutPage />} />
        <Route path={"contacts"} element={<ContactPage />} />
        <Route path={"help"} element={<HelpPage />} />

        <Route path={"favorites"} element={<FavoritesPage />} />
        <Route path={"confidential"} element={<Confidential />} />
        <Route path={"coupon/:id"} element={<CouponDetailsPage />} />
        <Route path={"company/:id"} element={<CompanyPage />} />
        <Route path={"my-coupons"} element={<MyCouponsPage />} />
        <Route path={"searchpage/:searchValue"} element={<SearchPage />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
