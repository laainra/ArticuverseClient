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
