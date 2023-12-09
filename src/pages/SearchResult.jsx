import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import ArtworkModal from './ArtworkModal';
import Footer from '../components/General/Footer';

const SearchResult = () => {
  const location = useLocation();
  const searchResult = location.state?.searchResult || [];
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const searchQuery = location.state?.search || ''; 

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={closeArtworkModal} />
      )}

      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>
      <h1 className="text-3xl mt-5 text-center">Result for "<span className='text-bold text-red-950'>{searchQuery}</span>"</h1>

      <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((post, index) => (
            <div key={index} className="w-full">
              <PostCard
                image={post.media}
                title={post.title}
                artist={post.artist}
                love="12"
                save="3"
                onClick={() => openArtworkModal(post)}
              />
            </div>
          ))
        ) : (
          <p className='text-center'>No artwork found</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResult;
