import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Table from "./components/Table";
import NameFilter from "./components/NameFilter";
import CityFilter from "./components/CityFilter";
import ClientFilter from "./components/ClientFilter";

function App() {
  const [selectedSeller, setSelectedSeller] = useState({ seller: "" });

  const handleSelectedSeller = (sellerData) => {
    setSelectedSeller(sellerData);
  };

  const [selectedDepartment, setSelectedDepartment] = useState({
    department: "",
  });

  const handleSelectedDepartment = (departmentData) => {
    setSelectedDepartment(departmentData);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<NameFilter onSellerSelected={handleSelectedSeller} />}
          />
          <Route
            path="/cityfilter"
            element={
              <CityFilter
                selectedSeller={selectedSeller}
                onDepartmentsSelected={handleSelectedDepartment}
              />
            }
          />
          <Route path="/clientfilter" element={<ClientFilter />} />
          <Route path="/table" element={<Table />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
