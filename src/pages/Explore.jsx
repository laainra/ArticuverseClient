import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "../components/General/Navbar";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import ArtistCard from "../components/ArtistCard";
import Cath from "../components/Cath";
import ArtworkModal from "./ArtworkModal.jsx";
import Footer from "../components//General/Footer";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Button, MiniButton } from "../components/General/Button";
import { Avatar } from "@mui/material";

const dataArtists = [
  {
    image: "/image/artist1.jpg",
    name: "Liz",
    desc: "Artist from South Korea, Loves to Draw and Sing",
  },
  {
    image: "/image/artist2.jpg",
    name: "Juyy",
    desc: "Love me if you love arts",
  },
  {
    image: "/image/artist3.jpg",
    name: "ElJH",
    desc: "Arts are about your personality",
  },
];

const Explore = () => {
  useEffect(() => {
    document.title = 'Explore | Articuverse'; 
    return () => {

      document.title = 'Articuverse';
    };
  }, []);
  const [genreData, setGenreData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log("User Data:", data);
          setUserData(data.user);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchGenreData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/genre");
      if (Array.isArray(response.data.data)) {
        setGenreData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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

  useEffect(() => {
    fetchGenreData();
    fetchArtData();
  }, []);

  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          user={userData}
          onClose={closeArtworkModal}
        />
      )}

      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>

      <h1 className="text-3xl mt-8 text-center">Top Genre</h1>

      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 sm:grid-cols-1 mr-3">
        {genreData.map((genre, index) => (
          <Cath key={index} name={genre.name} img={genre.img} />
        ))}
      </div>
      <h1 className="text-3xl mt-5 text-center">Top ArtWorks</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {artData.slice(0, 6).map((post, index) => (
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
      <div className="flex mt-3 justify-center">
          <Button to="/artworks-list" title="More Artworks" />
        </div>
      <h1 className="text-3xl mt-5 text-center">Top Artists</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {dataArtists.map((artist, index) => (
          <ArtistCard
            key={index}
            image={artist.image}
            name={artist.name}
            desc={artist.desc}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
