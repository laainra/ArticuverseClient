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

} from "@coreui/react";
import { Image } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/General/Sidebar";

function ArtworkTable() {
  const [artworkData, setArtworkData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [poster, setPoster] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [showInsert, setShowInsert] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const UpdateDataExhibition = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/update-exhibition/${id}`,
        {
          name,
          description,
          location,
          poster,
          start_date,
          end_date,
        }
      );

      if (response.status === 200) {
        alert("Data berhasil diubah");
        window.location.replace("http://localhost:3000/admin/exhibitions");
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const InsertDataExhibition = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/insert-exhibition",
        {
          name,
          description,
          location,
          poster,
          start_date,
          end_date,
        }
      );

      if (response.status === 201) {
        alert("Data berhasil ditambahkan");
        window.location.replace("http://localhost:3000/admin/exhibitions");
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };
  const deleteExhibition = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-exhibition/${id}`
      );

      if (response.status === 200) {
        alert("Exhibition deleted successfully");
        window.location.replace("http://localhost:3000/admin/exhibitions");
      } else {
        alert("Failed to delete exhibition");
      }
    } catch (error) {
      console.error("An error occurred while deleting exhibition:", error);
      alert("An error occurred while deleting exhibition");
    }
  };

  const showModalUpdate = (data) => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);
    setLocation(data.location);
    setPoster(data.poster);
    setStartDate(data.start_date);
    setEndDate(data.end_date);
    setShowInsert(false);
    setShowUpdate(true);

    // Log existing data for verification
    console.log("Existing Data:", data);
  };

  const closeModal = () => {
    setId("");
    setName("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setShowInsert(false);
    setShowUpdate(false);
  };
  const showModalInsert = () => {
    setId("");
    setName("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setShowInsert(true);
    setShowUpdate(false);
  };

  const showModalDelete = (data) => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);

    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setName("");
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

  useEffect(() => {
    fetchArtworkData();
  }, []);

  return (
    <div className="container flex">
      <Sidebar />
      <div className="flex">
        <div className=" p-5">
          <h1 className="py-1">Artwork Data</h1>
          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Artwork Table</strong>
            </CCardHeader>
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
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {artworkData.map((artwork,index) => (
                    <CTableRow key={artwork.id}>
                      <CTableDataCell className="text-center">{index+1}</CTableDataCell>
                      <CTableDataCell className="text-center">{artwork.title}</CTableDataCell>
                      <CTableDataCell className="text-center">{artwork.description}</CTableDataCell>
                      <CTableDataCell className="text-center">
  <img src={`/${artwork.media}`}  alt={artwork.media} width="300px" height="200px"/>
</CTableDataCell>

                      <CTableDataCell className="text-center">{artwork.artist}</CTableDataCell>
                      <CTableDataCell className="text-center">{artwork.creation_date}</CTableDataCell>
                      <CTableDataCell className="text-center">{artwork.genre}</CTableDataCell>
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
