import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import ArtworkModal from './ArtworkModal';
import Footer from '../components/General/Footer';
import MaterialCard from '../components/MaterialCard';

const CategoryResult = () => {
    const location = useLocation();
    const categoryId = location.state?.categoryId || '';
    const [Materials, setMaterials] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const CategoryQuery = location.state?.Category || '';

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };
  useEffect(() => {
    const fetchMaterialsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/materials-category/${categoryId}`);
        if (response.status === 200) {
          const data = response.data.data;
          console.log("Materials Data:", data);
          setMaterials(data);
        } else {
          console.error("Error fetching Category Materials:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchMaterialsByCategory();
  }, [categoryId]);

  const getYoutubeThumbnail = (url) => {

    return `http://img.youtube.com/vi/${url}/maxresdefault.jpg`;
  };
  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      
      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>
      <h1 className="text-3xl mt-5 text-center">Result for "<span className='text-bold text-red-950'>{Materials.length>0? Materials[0].category_name: ''}</span>"</h1>

      <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(Materials) && Materials.length > 0 ? (
          Materials.map((mat, index) => (
            <Link to={`/material/${mat.id}`}>
            <MaterialCard
              title={mat.title}
              desc={mat.desc}
              img={getYoutubeThumbnail(mat.path)}
              to={mat.id}
            />
          </Link>
          ))
        ) : (
          <p className='text-center'>No material found</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryResult;
