import React from 'react';
import { FaCompass, FaRegBookmark } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const Sidebar = ({ icon, items }) => {
  return (
    <nav className="lg:w-72 lg:px-6 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="list-group list-group-flush mx-3 mt-4">
        <p href="#" className="list-group-item list-group-item-action py-2">
          Menu
        </p>
        {items.map((item, index) => (
          <a href="#" className={`list-group-item list-group-item-action py-2 ${index === 0 ? 'active' : ''}`} key={index}>
            {icon}
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
