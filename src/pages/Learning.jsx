import React, { useEffect, useState } from "react";
import Navi from "../components/General/Navbar.jsx";
import { MiniButton } from '../components/General/Button.jsx';
import axios from "axios";
import { useParams } from 'react-router-dom';

const MaterialDetail = () => {
  useEffect(() => {
    document.title = `${materialData.title} | Articuverse`; 
    return () => {

      document.title = 'Articuverse';
    };
  }, []);
  const { id } = useParams();
  const [materialData, setMaterialData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMaterialData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/material/${id}`);
      setMaterialData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterialData();
  }, [id]);

  return (
    <div className="font-roboto">
      <Navi /> 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center mt-16">
          <h1 className="text-4xl font-bold my-4">{materialData.title}</h1>
          <iframe
            width="1280"
            height="800"
            src={`https://www.youtube.com/embed/${materialData.path}`}
            title={materialData.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>


        </div>
      )}
      <div className="px-12">                <h2 className="text-2xl font-bold mt-4 text-left">Description</h2>
            <p className="text-left">{materialData.description}</p></div>

    </div>
  );
};

export default MaterialDetail;
