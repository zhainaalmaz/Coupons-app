import { Route, Routes } from "react-router-dom";

import ScrollToTop from "../ScrollToTop";
import Error from "../Error/Error";

import "./App.css";
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
import LoginSuccess from "../auth/signin/LoginSuccess/LoginSuccess";
import Signin from "../auth/signin/Signin";
import Enter from "../auth/signin/Enter/Enter";
import CouponDetailsPage from "../../pages/CouponDetailsPage";
import MyCoupons from "../MyCoupons/MyCoupons";

function App() {
  return (
    <div className="App">
      <Header />
      <ScrollToTop />
     
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"sign-up"} element={<Signup />} />
        <Route path={"enter"} element={<Enter />} />
        <Route path={"sign-in"} element={<Signin />} />
        <Route path={"login-success"} element={<LoginSuccess />} />
        <Route path={"confirm"} element={<Confirm />} />

        <Route path={"new-coupons"} element={<NewCouponsPage />} />
        <Route path={"about"} element={<AboutPage />} />
        <Route path={"contacts"} element={<ContactPage />} />
        <Route path={"help"} element={<HelpPage />} />
        
        <Route path={"favorites"} element={<FavoritesPage />} />
        <Route path={"confidential"} element={<Confidential />} />
        <Route path={"coupon/:id"} element={<CouponDetailsPage />} />
        <Route path={"my-coupons"} element={<MyCoupons />} />
        <Route path="searchpage/:searchValue" element={<SearchPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
