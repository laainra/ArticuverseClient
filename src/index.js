import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import EditProfile from "./pages/Auth/EditProfile.jsx";
import UploadArtwork from "./pages/UploadArtwork.jsx";
import ArtworkModal from "./components/ArtworkModal.jsx";
import MaterialDetail from "./pages/Learning.jsx";
import { isAuthenticated } from "./Auth/AuthHelper.js";
import SearchResult from "./pages/SearchResult.jsx";
import ArtworkList from "./pages/Artwork-List.jsx";
import SupportModal from "./components/ModalSupport.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/Payment.jsx";
import AdminCommission from "./pages/admin/Commission.jsx";
import GenreResult from "./pages/GenreResult.jsx";
import CategoryResult from "./pages/CategoryResult.jsx";

const isAdmin = () => {
  // You may want to check the user's role in the token or make an additional API call
  // For simplicity, assuming the presence of an "admin" role in the token
  const role = localStorage.getItem("role");
  console.log(role)
  return role === "admin";
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="explore" element={<Explore />} />
      <Route path="search-result" element={<SearchResult />} />
      <Route path="artworks-list" element={<ArtworkList />} />
      <Route path="genre-result" element={<GenreResult />} />
      <Route path="category-result" element={<CategoryResult />} />
      <Route path="exhibition" element={<Exhibition />} />
      <Route path="/material/:id" element={<MaterialDetail />} />
      <Route path="artwork" element={<ArtworkModal />} />
      
      {isAdmin() && (
        <>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UserTable />} />
          <Route path="admin/exhibitions" element={<ExhibitionTable />} />
          <Route path="admin/artworks" element={<ArtworkTable />} />
          <Route path="admin/materials" element={<MaterialTable />} />
          <Route path="admin/commissions" element={<AdminCommission />} />
        </>
      )}
      {/* Conditional Rendering based on Authentication */}
      {isAuthenticated() ? (
        <>
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="learn" element={<Learn />} />

          <Route path="upload-artwork" element={<UploadArtwork />} />
          <Route path="edit-artwork" element={<UploadArtwork />} />
          <Route path="support-artwork/:id" element={<Payment />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          
        </>
      ) : (
        <>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
