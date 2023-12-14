import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import ArtworkModal from './ArtworkModal';
import Footer from '../components/General/Footer';

const GenreResult = () => {
    const location = useLocation();
    const genreId = location.state?.genreId || '';
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const genreQuery = location.state?.genre || '';

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };
  useEffect(() => {
    const fetchArtworksByGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/genre-artworks/${genreId}`);
        if (response.status === 200) {
          const data = response.data.data;
          console.log("Artworks Data:", data);
          setArtworks(data);
        } else {
          console.error("Error fetching genre artworks:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchArtworksByGenre();
  }, [genreId]);

  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={closeArtworkModal} />
      )}

      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>
      <h1 className="text-3xl mt-5 text-center">Result for "<span className='text-bold text-red-950'>{artworks.length > 0 ? artworks[0].genre_name : ''}</span>"</h1>

      <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(artworks) && artworks.length > 0 ? (
          artworks.map((post, index) => (
            <div key={index} className="w-full">
              <PostCard
                artwork={post}
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

export default GenreResult;
