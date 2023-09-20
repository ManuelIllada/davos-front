import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import React, { useState } from "react";
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

  const [selectedClient, setSelectedClient] = useState({
    client: "",
  });

  const handleSelectedClient = (clientData) => {
    setSelectedClient(clientData);
  };

  return (
    <ThemeProvider>
      <Router>
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
                onSellerSelected={handleSelectedSeller}
                onDepartmentsSelected={handleSelectedDepartment}
              />
            }
          />
          <Route
            path="/clientfilter"
            element={
              <ClientFilter
                selectedSeller={selectedSeller}
                selectedDepartment={selectedDepartment}
                onSellerSelected={handleSelectedSeller}
                onDepartmentsSelected={handleSelectedDepartment}
                onClientsSelected={handleSelectedClient}
              />
            }
          />
          <Route
            path="/table"
            element={
              <Table
                selectedSeller={selectedSeller}
                selectedDepartment={selectedDepartment}
                selectedClient={selectedClient}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
