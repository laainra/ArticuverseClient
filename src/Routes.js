import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Make sure to import these components from 'react-router-dom'
import App from './App';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Learn from './pages/Learn';
import Exhibition from './pages/Exhibition';

const RoutesConfig = () => (

    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {/* Use 'index' for the default route */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="explore" element={<Explore />} />
        <Route path="learn" element={<Learn />} />
        <Route path="exhibition" element={<Exhibition />} />
        <Route path="*" element={ // Handle 404 (Not Found) route
          <main style={{ padding: "1rem" }}>
            <p>Not Found</p>
          </main>
        } />
      </Route>
    </Routes>
);

export default RoutesConfig;
