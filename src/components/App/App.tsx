import React, { useEffect, useState } from "react";
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
import LoginSuccess from "../auth/AuthComponents/SuccessPage/SuccessPage";
import Signin from "../auth/signin/Signin";
import Enter from "../auth/signin/Enter/Enter";
import ChangePassword from "../auth/signin/ChangePassword/ChangePassword";
import SuccessPage from "../auth/AuthComponents/SuccessPage/SuccessPage";
import RecoveryPassword from "../auth/signin/RecoveryPassword/RecoveryPassword";
import RecoveryPasswordConfirm from "../auth/signin/RecoveryPasswordConfirm/RecoveryPasswordConfirm";
import RecoveryPasswordCreatePassword from "../auth/signin/RecoveryPasswordCreatePassword/RecoveryPasswordCreatePassword";

function App() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    dispatch(asyncSubtitleTags());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <Routes>
          <Route path={"/sign-up"} element={<Signup />} />
          <Route
            path={"/change-password"}
            element={<ChangePassword setTitle={setTitle} />}
          />
          <Route path={"/enter"} element={<Enter />} />
          <Route path={"/sign-in"} element={<Signin />} />
          <Route path={"/recovery-password"} element={<RecoveryPassword />} />
          <Route
            path={"/recovery-password/confirm"}
            element={<RecoveryPasswordConfirm />}
          />
          <Route
            path={"/recovery-password/confirm/create-password"}
            element={<RecoveryPasswordCreatePassword setTitle={setTitle} />}
          />
          <Route
            path={"/success-page"}
            element={<SuccessPage title={title} />}
          />
          <Route path={"/confirm"} element={<Confirm setTitle={setTitle} />} />
          <Route path={"/"} element={<Main />} />
          <Route path={"/new-coupons"} element={<NewCouponsPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
