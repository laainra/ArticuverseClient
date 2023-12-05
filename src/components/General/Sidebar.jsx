import React from "react";
import { FaUser, FaPaintBrush, FaCube, FaCalendar } from "react-icons/fa";

const Sidebar = () => {
  const items = [
    { name: "Dashboard", icon: <FaCube />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUser />, path: "/admin/users" },
    { name: "Artworks", icon: <FaPaintBrush />, path: "/admin/artworks" },
    { name: "Materials", icon: <FaCube />, path: "/admin/materials" },
    { name: "Exhibitions", icon: <FaCalendar />, path: "/admin/exhibitions" },
  ];

  const currentPath = window.location.pathname;

  return (
    <nav
      className="lg:w-72 lg:px-2 bg-white border-r border-gray-200 h-screen overflow-y-auto"
      style={{ flex: "0 0 200px" }}
    >
      <div className="list-group list-group-flush mx-3 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <a href="/"><img src="/logo.png" alt="Articuverse" /></a>
        </div>
        <p href="#" className="list-group-item list-group-item-action py-2">
          Menu
        </p>
        {items.map((item, index) => (
          <a
            href={item.path}
            className={`list-group-item list-group-item-action py-2 ${
              currentPath === item.path ? "active" : ""
            }`}

            key={index}
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
