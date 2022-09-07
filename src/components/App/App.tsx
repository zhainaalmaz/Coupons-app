import React, { useEffect } from 'react';
import { asyncSubtitleTags } from '../../store/slices/tagSlice/tagSlice';
// import { Counter } from '../Counter/Counter';
import NewCoupons from '../NewCoupons/NewCoupons';
import { useAppDispatch } from '../../hooks';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSubtitleTags());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <NewCoupons />
        </div>
        {/* <Counter /> */}
      </header>
    </div>
  );
}

export default App;
