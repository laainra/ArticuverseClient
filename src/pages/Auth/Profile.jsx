import React, { useEffect, useState } from "react";
import Navi from "../../components/General/Navbar.jsx";
import { MiniButton } from "../../components/General/Button.jsx";
import axios from "axios";
import PostCard from "../../components/PostCard.jsx";
import ArtworkModal from "../ArtworkModal.jsx";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };



  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        if (userData.id) {
          // Ensure userData.id is available before making the request
          const response = await axios.get(
            `http://localhost:8080/artworks-user/${userData.id}`
          );

          if (response.status === 200) {
            const data = response.data.data;
            console.log("Artworks Data:", data);
            setArtworks(data);
          } else {
            console.error("Error fetching artworks:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchArtworks();
  }, [userData.id]);

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
    
    document.title = userData.name + ' | Articuverse'; 
    return () => {
      document.title = 'Articuverse';
    };

    
  }, []);

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const imageStyle = {
    margin: "0 0 20px 0",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const [activeTab, setActiveTab] = useState("works");

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    document.title = userData.name; 
    return () => {
      document.title = 'Articuverse';
    };
  }, []);
  

  return (
    <div className="font-roboto flex-col">
      <Navi />
      <div className="h-screen flex flex-col items-center mt-32">
        {selectedArtwork && (
          <ArtworkModal artwork={selectedArtwork} user={userData} onClose={closeArtworkModal} />
        )}
        <div className="text-center">
          <img
            src={
              userData.avatar != null
                ? `http://localhost:8080/uploads/${userData.avatar}`
                : "/image/profile.jpg"
            }
            alt="User Avatar"
            className="w-48 h-48 rounded-full mx-auto"
            style={imageStyle}
          />
          <h1 className="text-4xl font-bold mt-4">{userData.name}</h1>
          <p className="text-gray-500 text-lg">@{userData.username}</p>
          <p className="text-lg">{userData.description}</p>
          <div className="flex justify-center">
            <MiniButton to="/edit-profile" title="Edit Profile" />
          </div>
          <div className="mt-4 text-xl font-bold">
            <div className="flex items-center justify-center space-x-4">
              <span>Total Works : {artworks.length}</span>
              {/* <span>Followers</span>
            <span>Following</span> */}
            </div>
          </div>
        </div>
  
        <div className="mt-8">
          <div className="flex space-x-8 pb-2">
            <button
              className={`text-lg font-bold ${
                activeTab === "works" ? "border-b-2" : ""
              }`}
              onClick={() => switchTab("works")}
            >
              Works
            </button>
            <button
              className={`text-lg font-bold ${
                activeTab === "saved" ? "border-b-2" : ""
              }`}
              onClick={() => switchTab("saved")}
            >
              Saved
            </button>
          </div>

      </div>
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {activeTab === "works" ? (
              <>
                {artworks.map((post, index) => (
                  <div key={index} className="lg:w-full sm:w-1/2 md:w-1/3 ">
                    <PostCard
                      artwork={post}
                      onClick={() => openArtworkModal(post)}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="bg-gray-200 w-full h-32 rounded-lg" />
                <div className="bg-gray-200 w-full h-32 rounded-lg" />
              </>
            )}
          </div>
        </div>
    </div>
  );
  
};

export default Profile;
