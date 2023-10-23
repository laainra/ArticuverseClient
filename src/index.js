import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Learn from './pages/Learn';
import Exhibition from './pages/Exhibition';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/learn" element={<Learn />} />
    <Route path="/exhibition" element={<Exhibition />} />
    <Route path="/" element={<App />}>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Not Found</p>
            </main>
          }
        />
      </Route>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
