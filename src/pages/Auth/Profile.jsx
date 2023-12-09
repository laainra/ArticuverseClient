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
        const response = await axios.get(
          `http://localhost:8080/artworks-user/${userData.id}`
        );

        if (response.status === 200) {
          const data = response.data;
          console.log("Artworks Data:", data);
          setArtworks(data);
        } else {
          console.error("Error fetching artworks:", response.statusText);
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

    fetchUserData();
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

  const ava = (user) => {
    if (user.avatar == null) {
      return "/image/profile.jpg";
    } else {
      return user.avatar;
    }
  };

  return (
    <div className="font-roboto">
      <Navi />
      <div className="h-screen flex flex-col items-center justify-center mt-32">
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={closeArtworkModal} />
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
              <span>Total Works</span>
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
          <div className="grid grid-cols-2 gap-8 mt-4">
            {activeTab === "works" ? (
              <>
                              {artworks.map((artwork,index) => (
                <div key={artwork.id} className="bg-gray-200 w-full h-32 rounded-lg">
            <PostCard
              image={artwork.media}
              title={artwork.title}
              artist={artwork.artist}
              love="12"
              save="3"
              onClick={() => openArtworkModal(artwork)}
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
    </div>
  );
};

export default Profile;
