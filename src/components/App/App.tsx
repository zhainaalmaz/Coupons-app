import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

import { asyncSubtitleTags } from "../../store/slices/tagSlice/tagSlice";
import "./App.css";
import Main from "../../pages/MainPage/Main";
import NewCouponsPage from "../../pages/NewCouponsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Signup from "../auth/signup/Signup";
import Confirm from "../auth/signup/Comfirm/Confirm";
import LoginSuccess from "../auth/signin/LoginSuccess/LoginSuccess";
import Signin from "../auth/signin/Signin";
import Enter from "../auth/signin/Enter/Enter";
import ChangePassword from "../auth/signin/ChangePassword/ChangePassword";

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
          <Route path={"/sign-up"} element={<Signup />} />
          <Route path={"/change-password"} element={<ChangePassword />} />
          <Route path={"/enter"} element={<Enter />} />
          <Route path={"/sign-in"} element={<Signin />} />
          <Route path={"/login-success"} element={<LoginSuccess />} />
          <Route path={"/confirm"} element={<Confirm />} />
          <Route path={"/"} element={<Main />} />
          <Route path={"/new-coupons"} element={<NewCouponsPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
