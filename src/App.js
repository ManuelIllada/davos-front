import React from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import TableCategories from "./components/Categories/TableCategories";
import TableProducts from "./components/Products/TableProducts";
import TableUsers from "./components/Users/TableUsers";
import CategoryModif from "./components/Categories/CategoryModif";
import CategoryNew from "./components/Categories/CategoryNew";
import Panel from "./components/Panel";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductNew from "./components/Products/ProductNew";
import ProductsModify from "./components/Products/ProductsModify";
import UsersNew from "./components/Users/UsersNew";
import UsersModify from "./components/Users/UsersModify";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import TableOrders from "./components/Orders/TableOrders";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Panel />
            </ProtectedRoutes>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="categories/edit" element={<CategoryModif />} />
          <Route path="categories/create" element={<CategoryNew />} />
          <Route path="categories" element={<TableCategories />} />
          <Route path="products/create" element={<ProductNew />} />
          <Route path="products/edit" element={<ProductsModify />} />
          <Route path="products" element={<TableProducts />} />
          <Route path="users/create" element={<UsersNew />} />
          <Route path="users/edit" element={<UsersModify />} />
          <Route path="users" element={<TableUsers />} />
          <Route path="orders" element={<TableOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
