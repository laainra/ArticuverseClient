import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { isAuthenticated } from "../Auth/AuthHelper";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

const AvatarDropdown = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
  });

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

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  
  useEffect(() => {

    fetchUserData();
  }, []);
  const handleProfileClick = () => {
    // Redirect to the user's profile page
    const username = "get_user_from_api"; // Replace with the actual username from your API
    navigate(`/profile`); // Use navigate instead of history.push
  };

  const handleLogoutClick = () => {
    // Handle logout, e.g., clear local storage and redirect to the login page
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login")
// Use navigate instead of history.push
  };

  return (
    <div>
      {isAuthenticated() && (
        <div className="avatar-container" onClick={handleAvatarClick}>
          {/* Replace 'user_avatar_url' with the actual URL from your API */}

          <Dropdown>
          <Dropdown.Toggle id="custom-dropdown-toggle" className="bg-transparent border-none shadow-none">
            <div className="w-12 h-12">
                <img
                  className="w-12 h-12 rounded-full mx-auto object-cover"
                  alt="Ellipse"
                  src={
                    userData.avatar != null
                      ? `http://localhost:8080/uploads/${userData.avatar}`
                      : "/image/profile.jpg"
                  }
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleProfileClick}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
