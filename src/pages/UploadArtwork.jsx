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
import ArtworkModal from "../components/ArtworkModal.jsx";
import axios from "axios";

export default function UploadArtwork() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [artworkData, setArtworkData] = useState([]);
  const [id, setId] = useState("");
  const [media, setMedia] = useState(null);
  const [artist, setArtist] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [creation_year, setCreationYear] = useState("");

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
        // Use response.data instead of response.json()
        const data = response.data;
        console.log("User Data:", data);
        setUserData(data.user); // Assuming your user data is nested under 'user' key
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
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

  const handleUpload = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userId");
    // setUser(user_id);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("media", media); // assuming media is a File object
    formData.append("artist", artist);
    formData.append("creation_year", creation_year);
    formData.append("genre", genre);
    formData.append("user_id", user_id);

    console.log(user_id)

    try {
      const response = await axios.post(
        "http://localhost:8080/insert-artwork",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        
        setShowModal(true);
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="font-roboto">
      {showModal && <ArtworkModal onClose={closeModal} />}

      <Navi />

      <MDBContainer fluid className="p-3 my-2 h-custom mt-5">
        <MDBRow>
          <MDBCol col="8" md="4" className="text-center items-center">
            <img
              src="/image/up_img.png"
              alt="Art Upload"
              className="w-80 h-80 ml-40 mt-32 mr-60 object-cover"
            />
            <MDBBtn
              tag="label"
              color="danger"
              rounded
              size="xl"
              htmlFor="artworkFile"
              className="ml-44 mt-3"
            >
              Upload Artwork
              <input
                type="file"
                onChange={handleFileChange}
                id="artworkFile"
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"
              />
            </MDBBtn>
            <h5 className="text-sm ml-44 mt-2 text-red-500">{media ? `Selected Media: ${media.name}` : ''}</h5>
          </MDBCol>
          <MDBCol col="4" md="4" className=" me-auto ms-auto">
            <div className="mt-12  d-flex flex-row align-items-center justify-content-center">
              <h5 className="lead fw-bold mb-0 me-3 text-3xl">
                Upload Artwork
              </h5>
            </div>

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
            <h6 className="text-bold">
              Genre<span className="text-red-700">*</span>
            </h6>
            <select
              className="form-select mb-4"
              aria-label="Default select example"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value={genre} disabled>
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

            <div className=" ml-32 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2">
              <Button
                title="Publish"
                onClick={handleUpload}
                className="mb-2 mb-md-0 px-5 ml-5 "
                size="lg"
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <Container className="mt-4"> */}
      {/* <Row> */}
      {/* Left Column */}
      {/* <Col md={4}>
            <div className="text-center">
              <img
                src="/path-to-your-avatar-image.jpg"
                alt="Avatar"
                className="w-32 h-32 rounded-circle"
              />
            </div>
            <Form.Group className="mt-3">
              <Form.File
                id="avatarFile"
                label="Upload Avatar"
                custom
                className="text-white bg-red-600 rounded"
              />
            </Form.Group>
          </Col> */}

      {/* Right Column */}
      {/* <Col md={8}>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="text-red-600">
                  Title<span className="text-red-600">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add your title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-red-100 rounded"
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Artist"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  disabled
                  className="bg-red-100 rounded"
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label className="text-red-600">
                  Description<span className="text-red-600">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add your description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-red-100 rounded"
                />
              </Form.Group>

              <Button title="Update" onClick={handleUpload}/>
            </Form>
          </Col> */}
      {/* </Row> */}
      {/* </Container> */}
    </div>
  );
}
