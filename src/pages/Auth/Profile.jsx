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
  const [userArtworks, setUserArtworks] = useState([]);
  const userId = localStorage.getItem("userId");
  const [totalCommission, setTotalCommission] = useState(0);

  useEffect(() => {
    const fetchTotalCommission = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-commission/${userId}`,
          {}
        );

        if (response.status === 200) {
          const data = response.data.data;
          console.log("Total Commission Data:", data);
          setTotalCommission(data);
        } else {
          console.error(
            "Error fetching total commission:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchTotalCommission();
  }, [userId]);

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  useEffect(() => {
    const fetchUserArtworks = async () => {
      try {
        
        const response = await axios.get(
          `http://localhost:8080/saved-artworks/${userData.id}`
        );
        setUserArtworks(response.data);
        console.log("Saved Artworks", response.data);
      } catch (error) {
        console.error("Error fetching user artworks:", error);
      }
    };

    fetchUserArtworks();
  }, [userData.id]);

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

    document.title = userData.name + " | Articuverse";
    return () => {
      document.title = "Articuverse";
    };
  }, []);

  const token = localStorage.getItem("token");

  console.log("User:", userId);

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
      document.title = "Articuverse";
    };
  }, []);

  return (
    <div className="font-roboto flex-col">
      <Navi />
      <div className="h-screen flex flex-col items-center mt-32">
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            user={userData}
            onClose={closeArtworkModal}
          />
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
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex space-x-8 pb-2">
            <button
              className={`text-lg font-bold ${
                activeTab === "works" ? "border-b-2 border-red-700" : ""
              }`}
              onClick={() => switchTab("works")}
            >
              Works
            </button>
            <button
              className={`text-lg font-bold ${
                activeTab === "commission" ? "border-b-2 border-red-700" : ""
              }`}
              onClick={() => switchTab("commission")}
            >
              Commission
            </button>
            <button
              className={`text-lg font-bold ${
                activeTab === "saved" ? "border-b-2 border-red-700" : ""
              }`}
              onClick={() => switchTab("saved")}
            >
              Saved
            </button>
          </div>
        </div>
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {activeTab === "works" && (
            <>
              {artworks.length > 0 ? (
                artworks.map((post, index) => (
                  <div key={index} className="lg:w-full sm:w-1/2 md:w-1/3">
                    <PostCard
                      artwork={post}
                      onClick={() => openArtworkModal(post)}
                    />
                  </div>
                ))
              ) : (
                <p>This user doesn't have any artworks.</p>
              )}
            </>
          )}
          {activeTab === "commission" && (
            <>
              <div className="w-full h-30 bg-red-50 items-center justify-center text-center mt-4 p-3">
                <h1>Commission Earned: </h1>
                <h1 className="font-bold text-red-600">
                  {" "}
                  {totalCommission ? formatCurrency(totalCommission) : 0}
                </h1>
              </div>
            </>
          )}
          {activeTab === "saved" && (
            <>
              {userArtworks.length > 0 ? (
                userArtworks.map((post, index) => (
                  <div key={index} className="lg:w-full sm:w-1/2 md:w-1/3">
                    <PostCard
                      artwork={post}
                      onClick={() => openArtworkModal(post)}
                    />
                  </div>
                ))
              ) : (
                <p>This user doesn't have any saved artworks.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
