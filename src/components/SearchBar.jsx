import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8080/search-artwork', {
        search: search,
      });

      if (response.data.status === 'success') {
        console.log(response.data.result);
        navigate('/search-result', { state: { searchResult: response.data.result , search: search } });
      } else {
        console.error('Search failed');
        navigate('/search-result', { state: { searchResult: "Ohh noo... No Artwork Found" } });
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="bg-pink-50 h-14 w-full px-12 rounded-lg focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span
        className="absolute top-4 right-8 border-l"
        onClick={handleSearch}
        style={{ cursor: 'pointer' }}
      >
        <i className="absolute text-gray-400  ">
          <FaSearch />
        </i>
      </span>
    </div>
  );
};

export default SearchBar;
