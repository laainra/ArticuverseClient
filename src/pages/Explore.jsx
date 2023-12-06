import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "../components/General/Navbar";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import ArtistCard from "../components/ArtistCard";
import Cath from "../components/Cath";
import Footer from "../components//General/Footer";
import { FaBookmark, FaHeart } from "react-icons/fa";
import {

  MDBCol,
  MDBRow,

} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MiniButton } from "../components/General/Button";
import {

  Avatar,

} from '@mui/material';


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
  const [genreData, setGenreData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  
  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };
  
  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };
  

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
  const ArtworkModal = ({ artwork, onClose }) => {
    const [showModal, setShowModal] = useState(true);
  
    const handleClose = () => {
      setShowModal(false);
      // Optionally, you can call the onClose prop to notify the parent component
      if (onClose) {
        onClose();
      }
    };
  
    return (
      <div className="mt-10 fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 z-50">
        <div
          className="bg-white rounded-lg overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
          style={{ width: 800, height: 500 }}
        >
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-center">Detail Artwork</div>
            <div className="cursor-pointer" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="box w-full p-4 flex ">
            <MDBRow>
              <MDBCol className="text-center items-center">
                <img
                  src={"/"+artwork.media}
                  alt={artwork.title}
                  className="w-80 h-80 mr-60 object-cover"
                />
              </MDBCol>
              <MDBCol className="text-center">
                <h1 className="text-xl font-bold text-left">Title</h1>
                <p className="text-sm mb-2 text-left mb-4">
                {artwork.description}
                </p>
                <div className="flex  mb-2">
                <Avatar
            src={artwork.artist}
            alt={artwork.artist}
            sx={{ width: 27, height: 27, borderRadius: '50%' }}
            
          />
                  <div className="text-left">
                    <p className=" text-sm font-bold mb-1">{artwork.artist} </p>
                    <p className="text-sm">@{artwork.artist.split(' ')[0]}</p>
                    
                  </div>
                  <div className="ml-20"><MiniButton onClick={""} title="Support"/></div>
                  
                </div>
                <div className="flex items-center mb-4">
                  <div className="">
                    <button className="mr-2">
                      <FaHeart className="text-sm text-gray-500" />
                    </button>
                    <span className="text-sm font-bold mr-2">20</span>
                    <button className="mr-2">
                      <FaBookmark className="text-sm text-gray-500" />
                    </button>
  
                  </div>
                </div>
                <div className="border-t-2 mt-1 pt-4">
              <h2 className="text-lg font-bold mb-2 text-left">Comments</h2>
              <div className="flex items-center mb-2">
                <img
                  src="/image/artist1.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border p-2 w-full rounded bg-red-50"
                />
              </div>
              {/* Additional comments can be added here */}
            </div>
              </MDBCol>
            </MDBRow>
  
          </div>
        </div>
      </div>
    );
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

      <h1 className="text-3xl mt-8 text-center">Top Genre</h1>

      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 sm:grid-cols-1 mr-3">
        {genreData.map((genre, index) => (
          <Cath key={index} name={genre.name} img={genre.img} />
        ))}
      </div>
      <h1 className="text-3xl mt-5 text-center">Top ArtWorks</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {artData.map((post, index) => (
          <div key={index} className="w-full ">
            <PostCard
              image={post.media}
              title={post.title}
              artist={post.artist}
              love="12"
              save="3"
              onClick={() => openArtworkModal(post)}
            />
          </div>
        ))}
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
