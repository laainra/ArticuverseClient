import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative">
      <i className="absolute text-gray-400 top-5 left-4">
        <FaSearch />
      </i>
      <input
        type="text"
        placeholder="Search..."
        className="bg-pink-50 h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
        name=""
      />
      <span className="absolute top-4 right-5 border-l pl-4">
        <FaFilter className="text-gray-500 ml-4 hover:text-green-500 hover:cursor-pointer" />
      </span>
    </div>
  );
};

export default SearchBar;
