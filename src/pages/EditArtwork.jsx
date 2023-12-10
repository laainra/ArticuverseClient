import React, { useState, useEffect } from "react";
import Navi from "../components/General/Navbar.jsx";
import { Button } from "../components/General/Button.jsx";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Link, useLocation } from "react-router-dom";
import ArtworkModal from "../pages/ArtworkModal.jsx";
import axios from "axios";

export default function EditArtwork({ artwork, handleClose }) {
  const [title, setTitle] = useState(artwork.title || "");
  const [description, setDescription] = useState(artwork.description || "");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [artworkData, setArtworkData] = useState({});
  const [id, setId] = useState("");
  const [media, setMedia] = useState(null);
  const [artist, setArtist] = useState(artwork.artist || "");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(artwork.genre || "");
  const [creation_year, setCreationYear] = useState(
    artwork.creation_year || ""
  );

  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({});

  console.log(localStorage.getItem("userId"));

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

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

  const handleEdit = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userId");

    try {
      const response = await axios.put(
        `http://localhost:8080/update-artwork/${artwork.id}`,
        {title,description,artist,creation_year,genre,user_id}
      );

      if (response.status === 200) {
        console.log("response", response);
        alert("Data berhasil diubah");
        setArtworkData(response.data.data);
        closeModal();
        window.location.reload()
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const fetchGenres = async () => {
    try {
      const genresResponse = await axios.get("http://localhost:8080/genre");
      console.log("genres Response:", genresResponse.data);

      const genresData = genresResponse.data.data || [];
      setGenres(
        Array.isArray(genresData) ? genresData.map((cat) => cat.name) : []
      );
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchUserData();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-10 fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 z-50">
      {showModal && (
        <ArtworkModal
          artwork={artwork}
          user={userData}
          onClose={closeModal}
        />
      )}

      <Navi />

      <div
          className="bg-white rounded-lg overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
          style={{ width: 900, height: 600 }}
        >
        <div className="flex justify-between p-4 items-center w-full">
          <div className="text-2xl font-bold text-center">
            Edit Artwork
          </div>
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
        <MDBRow className="items-center">


            <div className="mt-12  d-flex flex-col align-items-center justify-content-center">
            <img
              src={`http://localhost:8080/uploads/${artwork.media}`}
              alt="Art Upload"
              className="items-center"
              style={{ objectFit: 'cover', height: '200px', width:'300px' }}
            />

            <div className="align-items-left  d-flex flex-col w-full">
            <h6 className="text-bold">
              Title<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Add Your Title
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h6 className="text-bold">
              Artist<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Your Artist
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <h6 className="text-bold">
              Description<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-envelope mr-2"></i> Add Description Here
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              className="h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h6 className="text-bold ">
              Genre<span className="text-red-700">*</span>
            </h6>
            <select
              className="form-select mb-4"
              aria-label="Default select example"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled>
                Select a genre
              </option>
              {genres.map((genreItem, index) => (
                <option key={index} value={genreItem}>
                  {genreItem}
                </option>
              ))}
            </select>
            <h6 className="text-bold">
              Creation Year<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-envelope mr-2"></i> Creation Year
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              onChange={(e) => setCreationYear(e.target.value)}
              value={creation_year}
            />
            </div>
  

            <div className=" ml-12 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2">
              <Button
                title="Edit"
                onClick={handleEdit}
                className="mb-2 mb-md-0 px-5 ml-5 "
                size="lg"
              />
            </div>
            </div>


 
        </MDBRow>
      </div>
    </div>
  );
}
