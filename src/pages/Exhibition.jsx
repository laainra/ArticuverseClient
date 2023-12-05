import React, { useEffect, useState } from "react";
import axios from "axios";
import Navi from "../components/General/Navbar";
import SearchBar from "../components/SearchBar";
import ExhibiitonCard from "../components/ExhibitiionCard";
import Footer from "../components//General/Footer";

export default function Exhibition() {
  const [exhibitionData, setExhibitionData] = useState([]);

  const currentDate = new Date();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript dates
  };
  
  const PastExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter((exh) => formatDate(exh.end_date) < currentDate);
  };
  
  const CurrentExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter(
      (exh) => formatDate(exh.start_date) <= currentDate && formatDate(exh.end_date) >= currentDate
    );
  };
  
  const UpcomingExhibitions = ({ exhibitionData }) => {
    return exhibitionData.filter((exh) => formatDate(exh.start_date) > currentDate);
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

  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />

      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>

      <h1 className="text-3xl mt-8">Current Exhibition</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {CurrentExhibitions({ exhibitionData }).map((exh, index) => (
          <div key={exh.id} className="w-full">
            <ExhibiitonCard
              title={exh.name}
              location={exh.location}
              date={`${exh.start_date}-${exh.end_date}`}
              desc={exh.description}
              img={exh.poster}
              to={exh.to}
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl mt-8">Upcoming Exhibition</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {UpcomingExhibitions({ exhibitionData }).map((exh, index) => (
          <div key={exh.id} className="w-full">
            <ExhibiitonCard
              title={exh.name}
              location={exh.location}
              date={`${exh.start_date}-${exh.end_date}`}
              desc={exh.description}
              img={exh.poster}
              to={exh.to}
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl mt-8">Past Exhibition</h1>

<div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {PastExhibitions({ exhibitionData }).map((exh, index) => (
    <div key={exh.id} className="w-full">
      <ExhibiitonCard
        title={exh.name}
        location={exh.location}
        date={`${exh.start_date}-${exh.end_date}`}
        desc={exh.description}
        img={exh.poster}
        to={exh.to}
      />
    </div>
  ))}
</div>

      <Footer />
    </div>
  );
}
