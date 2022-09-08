import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../../pages/MainPage/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchPage from "../../pages/SearchPage/SearchPage";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path="/searchpage/:searchValue" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
