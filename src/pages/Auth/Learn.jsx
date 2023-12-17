import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "../../components/General/Navbar";
import SearchBar from "../../components/SearchBar";
import Cath from "../../components/Cath";
import MaterialCard from "../../components/MaterialCard";
import Footer from "../../components/General/Footer";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function Learn() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleCategoryClick = (category) => {
 
    navigate('/category-result', { state: { categoryId: category.id } });
  };

  useEffect(() => {
    document.title = 'Learning | Articuverse'; 
    return () => {

      document.title = 'Articuverse';
    };
  }, []);
  const [materialData, setMaterialData] = useState([]);
  const [catData, setCatData] = useState([]);
  const fetchMaterialData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/material");
      if (Array.isArray(response.data.data)) {
        setMaterialData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCatData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category");
      if (Array.isArray(response.data.data)) {
        setCatData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMaterialData();
  }, []);

  useEffect(() => {
    fetchCatData();
  }, []);

  const getYoutubeThumbnail = (url) => {

    return `http://img.youtube.com/vi/${url}/maxresdefault.jpg`;
  };


  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />

      <div className="md:max-w-xl w-full p-3">
      <SearchBar currentPage="learn" />
      </div>

      <h1 className="text-3xl mt-8">Top Materials</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {materialData.slice(0,3).map((mat, index) => (
          <div key={index} className="w-full " >
          <Link to={`/material/${mat.id}`}>
            <MaterialCard
              title={mat.title}
              desc={mat.desc}
              img={getYoutubeThumbnail(mat.path)}
              to={mat.id}
            />
          </Link>
          </div>
        ))}
      </div>

      <h1 className="text-3xl mt-8">Learn by Categories</h1>

      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 sm:grid-cols-1">
        {catData.map((cath, index) => (
          <Cath key={index} name={cath.name} img={cath.img}  onClick={() => handleCategoryClick(cath)}/>
        ))}
      </div>

      <Footer />
    </div>
  );
}
