import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "../components/General/Navbar";
import SearchBar from "../components/SearchBar";
import ExhibiitonCard from "../components/ExhibitiionCard";
import Footer from "../components//General/Footer";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MiniButton } from "../components/General/Button";
import { Avatar } from "@mui/material";
import { useMediaQuery } from "react-responsive";

export default function Exhibition() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    document.title = "Exhibition | Articuverse";
    return () => {
      document.title = "Articuverse";
    };
  }, []);
  const [exhibitionData, setExhibitionData] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);

  const openExhibitionModal = (exhibition) => {
    setSelectedExhibition(exhibition);
  };

  const closeExhibitionModal = () => {
    setSelectedExhibition(null);
  };

  const currentDate = new Date();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  const PastExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter(
      (exh) => formatDate(exh.end_date) < currentDate
    );
  };

  const CurrentExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter(
      (exh) =>
        formatDate(exh.start_date) <= currentDate &&
        formatDate(exh.end_date) >= currentDate
    );
  };

  const UpcomingExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter(
      (exh) => formatDate(exh.start_date) > currentDate
    );
  };

  const fetchExhibitionData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/exhibition");
      if (Array.isArray(response.data.data)) {
        setExhibitionData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExhibitionData();
  }, []);

  const ExhibitionModal = ({ exhibition, onClose }) => {
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
      setShowModal(false);
      if (onClose) {
        onClose();
      }
    };

    const getDayOfWeek = (dateString) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(dateString);
      const dayOfWeek = daysOfWeek[date.getDay()];
      return dayOfWeek;
    };

    return (
      <div className="mt-10 fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 z-50">
        <div
          className="bg-white rounded-lg overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
          style={{
            width: isMobile ? "100%" : 800,
            height: isMobile ? "100%" : 500,
          }}
        >
          <div
            className={`flex justify-between items-center ${
              isMobile ? "mt-5" : ""
            }`}
          >
            <div className="text-xl font-bold text-center">
              Detail Exhibition
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
          <div className="box w-full p-4">
            <MDBRow className="flex flex-col-reverse sm:flex-row">
              <MDBCol className="text-center mb-4 sm:order-2">
                <img
                  src={`http://localhost:8080/uploads/${exhibition.poster}`}
                  alt={exhibition.name}
                  className="w-80 h-80 mx-auto object-cover"
                />
              </MDBCol>
              <MDBCol className="text-center sm:order-1">
                <h1 className="text-xl font-bold text-left mb-4">
                  {exhibition.name}
                </h1>
                <p className="text-left mb-4">
                  <span className="font-bold"> Location: </span>
                  {exhibition.location}
                </p>
                <p className="text-sm text-left mb-4">
                  {exhibition.description}
                </p>
                <p className="text-left mb-4">
                  <span className="font-bold"> Date: </span>
                  {`${getDayOfWeek(exhibition.start_date)}, ${
                    exhibition.start_date
                  }- ${getDayOfWeek(exhibition.end_date)}, ${
                    exhibition.end_date
                  }`}
                </p>
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
      {selectedExhibition && (
        <ExhibitionModal
          exhibition={selectedExhibition}
          onClose={closeExhibitionModal}
        />
      )}

      <div className="md:max-w-xl w-full p-3">
        {/* <SearchBar /> */}
      </div>

      <h1 className="text-3xl mt-8">Current Exhibition</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {CurrentExhibitions({ exhibitionData }).map((exh, index) => (
          <div key={exh.id} className="w-full">
            <ExhibiitonCard
              name={exh.name}
              location={exh.location}
              date={`${exh.start_date}-${exh.end_date}`}
              // desc={exh.description}
              img={`http://localhost:8080/uploads/${exh.poster}`}
              onClick={() => openExhibitionModal(exh)}
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl mt-8">Upcoming Exhibition</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {UpcomingExhibitions({ exhibitionData }).map((exh, index) => (
          <div key={exh.id} className="w-full">
            <ExhibiitonCard
              name={exh.name}
              location={exh.location}
              date={`${exh.start_date}-${exh.end_date}`}
              // desc={exh.description}
              img={`http://localhost:8080/uploads/${exh.poster}`}
              onClick={() => openExhibitionModal(exh)}
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl mt-8">Past Exhibition</h1>

      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {PastExhibitions({ exhibitionData }).map((exh, index) => (
          <div key={index} className="w-full">
            <ExhibiitonCard
              name={exh.name}
              location={exh.location}
              date={`${exh.start_date}-${exh.end_date}`}
              // desc={exh.description}
              img={`http://localhost:8080/uploads/${exh.poster}`}
              onClick={() => openExhibitionModal(exh)}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
