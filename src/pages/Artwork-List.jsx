import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import ArtworkModal from './ArtworkModal';
import Footer from '../components/General/Footer';

const ArtworkList = () => {
  const location = useLocation();
  const searchResult = location.state?.searchResult || [];
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const searchQuery = location.state?.search || ''; 
  const [artData, setArtData] = useState([]);

  const fetchArtData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/artwork");
      if (Array.isArray(response.data.data)) {
        setArtData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };

  useEffect(() => {
    fetchArtData();
  }, []);


  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={closeArtworkModal} />
      )}

      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>
      <h1 className="text-3xl mt-5 text-center text-bold">Artworks</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {artData.map((post, index) => (
          <div key={index} className="w-full ">
            <PostCard
              artwork={post}
              love="12"
              save="3"
              onClick={() => openArtworkModal(post)}
            />
          </div>
        ))}


      </div>

      <Footer />
    </div>
  );
};

export default ArtworkList;
