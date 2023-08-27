import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Table from "./components/Table";
import NameFilter from "./components/NameFilter";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NameFilter />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
