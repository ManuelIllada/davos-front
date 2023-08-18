import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user.token) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
