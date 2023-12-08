import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./Auth/AuthHelper.js";

const IsLoginOrRegisterPathChecker = () => {
  const location = useLocation();
  return location.pathname === "/login" || location.pathname === "/register";
};

const PrivateRoute = ({ element }) => {
  if (isAuthenticated()) {
    return <Route element={element} />;
  } else {
    if (IsLoginOrRegisterPathChecker()) {
      return <Route element={element} />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default PrivateRoute;
