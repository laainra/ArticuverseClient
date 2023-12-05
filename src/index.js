import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import Profile from "./pages/Auth/Profile";
import Explore from "./pages/Explore";
import Learn from "./pages/Auth/Learn";
import Exhibition from "./pages/Exhibition";
import UserTable from "./pages/admin/User";
import ExhibitionTable from "./pages/admin/Exhibitions.jsx";
import ArtworkTable from "./pages/admin/Artworks.jsx";
import MaterialTable from "./pages/admin/Materials.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import { AuthProvider } from 'react-auth-kit'
import EditProfile from "./pages/Auth/EditProfile.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
{/* <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}> */}
    <Routes path="/" element={<PrivateRoute />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="learn" element={<Learn />} />
      <Route path="exhibition" element={<Exhibition />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
      <Route path="admin/users" element={<UserTable />} />
      <Route path="admin/exhibitions" element={<ExhibitionTable />} />
      <Route path="admin/artworks" element={<ArtworkTable />} />
      <Route path="admin/materials" element={<MaterialTable />} />
    </Routes>

    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="home" element={<Home />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="explore" element={<Explore />} />
      <Route path="learn" element={<Learn />} />
      <Route path="exhibition" element={<Exhibition />} />
    </Routes>
 {/* </AuthProvider> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
