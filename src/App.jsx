import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Table from "./components/Table";
import NameFilter from "./components/NameFilter";
import { Routes, Route } from "react-router-dom";
import CityFilter from "./components/CityFilter";
import ClientFilter from "./components/ClientFilter";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NameFilter />} />
        <Route path="/cityfilter" element={<CityFilter />} />
        <Route path="/clientfilter" element={<ClientFilter />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
