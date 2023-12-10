import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CButton,
} from "@coreui/react";
import { Modal, Form, Button } from "react-bootstrap";
import { Image } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/General/Sidebar";
import { useNavigate } from "react-router-dom"; 

function ArtworkTable() {
  const [artworkData, setArtworkData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [artist, setArtist] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [creation_year, setCreationYear] = useState("");

  // const [user_id, setUserId] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [userData, setUserData] = useState({
  });

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
}
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
      const genresResponse = await axios.get(
        "http://localhost:8080/genre"
      );
      console.log("genres Response:", genresResponse.data);

      const genresData = genresResponse.data.data || [];
      setGenres(
        Array.isArray(genresData)
          ? genresData.map((cat) => cat.name)
          : []
      );
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    fetchArtworkData();
    fetchGenres();
    fetchUserData();
  }, []);
  const UpdateDataArtwork = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("title", title); // Use the state variable directly
    formData.append("description", description); // Use the state variable directly
    // formData.append("media", media);
    formData.append("artist", artist); // Use the state variable directly
    formData.append("creation_year", creation_year); // Use the state variable directly
    formData.append("genre", genre); // Use the state variable directly
    formData.append("user_id", user_id);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/update-artwork/${id}`,
        {title,description,media,artist,creation_year,genre,user_id},

        
      );

      

      if (response.status === 200) {
        console.log("response",response)
        alert("Data berhasil diubah");
        closeModal(); // Close the modal instead of reloading the window
        fetchArtworkData(); // Fetch updated data
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const InsertDataArtwork = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("media", media); // assuming media is a File object
    formData.append("artist", artist);
    formData.append("creation_year", creation_year);
    formData.append("genre", genre);
    formData.append("user_id", user_id);

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
        alert("Data berhasil ditambahkan");
        closeModal(); // Close the modal instead of reloading the window
        fetchArtworkData(); // Fetch updated data
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const deleteArtwork = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-artwork/${id}`
      );

      if (response.status === 200) {
        alert("artwork deleted successfully");
        closeModalDelete(); // Close the delete modal
        fetchArtworkData(); // Fetch updated data;
      } else {
        alert("Failed to delete artwork");
      }
    } catch (error) {
      console.error("An error occurred while deleting artwork:", error);
      alert("An error occurred while deleting artwork");
    }
  };

  const showModalUpdate = (data) => {
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setMedia(data.media);
    setArtist(data.artist);
    setCreationYear(data.creation_year);
    setGenre(Array.isArray(data.genre) ? data.genre[0] : "");
    // setUserId(data.user_id);
    setShowInsert(false);
    setShowUpdate(true);

    // Log existing data for verification
    console.log("Existing Data:", data);
  };

  const closeModal = () => {
    setId("");
    setTitle("");
    setDescription("");
    setMedia("");
    setCreationYear("");
    setGenre("");
    // setUserId("");
    setShowInsert(false);
    setShowUpdate(false);
  };
  const showModalInsert = () => {
    setId("");
    setTitle("");
    setDescription("");
    setMedia("");
    setCreationYear("");
    setGenre("");
    // setUserId("");
    setShowInsert(true);
    setShowUpdate(false);
  };

  const showModalDelete = (data) => {
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setTitle("");
    setDescription("");
    setShowDelete(false);
  };

  const fetchArtworkData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/artwork");
      if (Array.isArray(response.data.data)) {
        setArtworkData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  console.log("genres:", genres);
  return (
    <div className="container flex">
      <Sidebar />
      <div className="flex">
        <div className=" p-5">
        <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure to delete this data?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">Artwork Name</p>
                      <p className="col-6 card-text">: {title}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Description</p>
                      <p className="col-6 card-text">: {description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="primary"
                className="px-4"
                onClick={() => deleteArtwork(id)}
              >
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showInsert} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Insert Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={InsertDataArtwork} encType="multipart/form-data">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Artist</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setArtist(e.target.value)}
                    // value={artist}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Creation Year</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setCreationYear(e.target.value)}
                    value={creation_year}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>genre</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                  >
                    <option value={genre} disabled>
                      Select a genre
                    </option>
                    {genres.map((genreItem, index) => (
                      <option key={index} value={genreItem}>
                        {genreItem}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Media Artwork</Form.Label>
                  {/* <h6 className="text-xs">
                    if link https://www.youtube.com/watch?v=(vx6g-c2jYp0), use
                    only (vx6g-c2jYp0)
                  </h6> */}
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png"
                    // onChange={(e) => setMedia(e.target.value)}
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Button type="submit" color="primary" className="px-4 mt-2">
                  Insert
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showUpdate} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={UpdateDataArtwork}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Artist</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setArtist(e.target.value)}
                    value={artist}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Creation Year</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setCreationYear(e.target.value)}
                    value={creation_year}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>genre</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setGenre([e.target.value])}
                    value={genre}
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {genres.map((genreItem, index) => (
                      <option key={index} value={genreItem}>
                        {genreItem}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Media Artwork</Form.Label>
                  {/* <h6 className="text-xs">
                    if link https://www.youtube.com/watch?v=(vx6g-c2jYp0), use
                    only (vx6g-c2jYp0)
                  </h6> */}
                  <Form.Control
                    // onChange={handleFileChange}
                    type="text"
                    onChange={(e) => setMedia([e.target.value])}
                    value={media}
                    disabled
                    
                  />
                </Form.Group>
                <Button type="submit" color="primary" className="px-4 my-4">
                  Update
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <h1 className="py-1">Artwork Data</h1>
          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Artwork Table</strong>
            </CCardHeader>
            <CButton
              className="btn btn-default text-white center"
              onClick={showModalInsert}
            >
              Add Artwork
            </CButton>
            <CCardBody>
              <p className="text-medium-emphasis small">
                This table displays Artwork data.
              </p>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <strong>No</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Title</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Description</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Media</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Artist</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Creation Date</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Genre</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Action</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {artworkData.map((artwork, index) => (
                    <CTableRow key={artwork.id}>
                      <CTableDataCell className="text-center">
                        {index + 1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {artwork.title}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {artwork.description}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <img
                          src={`http://localhost:8080/uploads/${artwork.media}`}
                          alt={artwork.title}
                          width="200px"
                          height="70px"
                        />
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        {artwork.artist}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {artwork.creation_year}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {artwork.genre}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <Button
                          variant="primary"
                          className="mb-3"
                          onClick={() => showModalUpdate(artwork)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => showModalDelete(artwork)}
                        >
                          Delete
                        </Button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default ArtworkTable;
