import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

import { asyncSubtitleTags } from '../../store/slices/tagSlice/tagSlice';
import './App.css';
import Main from '../../pages/MainPage/Main';
import NewCouponsPage from '../../pages/NewCouponsPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContactPage from '../../pages/ContactPage';
import AboutPage from '../../pages/AboutUsPage/AboutPage';
import HelpPage from '../../pages/HelpPage';

import Signup from '../auth/signup/Signup';
import Favorites from '../../pages/Favorites/Favorites';

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
          <Route path={'sign-in'} element={<Signup />} />
          <Route path={'/'} element={<Main />} />
          <Route path={'/new-coupons'} element={<NewCouponsPage />} />
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/contacts'} element={<ContactPage />} />
          <Route path={'/help'} element={<HelpPage />} />
          <Route path={'/favorite'} element={<Favorites />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
