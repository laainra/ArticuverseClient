
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './Auth/AuthHelper.js';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? <Route element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
