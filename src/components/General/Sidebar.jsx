import React, { useState } from "react";
import { FaUser, FaPaintBrush, FaCube, FaCalendar, FaMoneyCheck, FaHamburger } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const items = [
    { name: "Dashboard", icon: <FaCube />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUser />, path: "/admin/users" },
    { name: "Artworks", icon: <FaPaintBrush />, path: "/admin/artworks" },
    { name: "Materials", icon: <FaCube />, path: "/admin/materials" },
    { name: "Exhibitions", icon: <FaCalendar />, path: "/admin/exhibitions" },
    { name: "Commissions", icon: <FaMoneyCheck />, path: "/admin/commissions" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const currentPath = window.location.pathname;

  return (
    <nav className={`lg:w-72 lg:px-2 bg-white border-r border-gray-200 h-screen overflow-y-auto ${isMobile? 'hidden' : 'block'}`}>
      <div className="list-group list-group-flush mx-3 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <a href="/"><img src="/logo.png" alt="Articuverse" /></a>
          {/* {isMobile && ( */}
            <button onClick={toggleMobileMenu} className="block lg:hidden">
             Menu
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          {/* )} */}
        </div>
        <p href="#" className="list-group-item list-group-item-action py-2">
          Menu
        </p>
        {items.map((item, index) => (
          <a
            href={item.path}
            className={`list-group-item list-group-item-action py-2 ${currentPath === item.path ? "active" : ""}`}
            key={index}
            onClick={closeMobileMenu} // Close mobile menu on item click
          >
            <div className="flex mx-2">
              <div className="mr-2">{item.icon}</div>
              {item.name}
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
};

export const AdminSidebar = () => {
  return <Sidebar />;
};

export default Sidebar;
