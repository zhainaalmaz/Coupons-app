import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../../pages/MainPage/Main";
import Confidential from "../Confidential/Confidential";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path="/searchpage/:searchValue" element={<SearchPage />} />
        <Route path={ "/confidential"} element={<Confidential/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
