// AvatarDropdown.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { isAuthenticated } from "../Auth/AuthHelper";
import { Dropdown } from "react-bootstrap";

const AvatarDropdown = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  

  const handleProfileClick = () => {
    // Redirect to the user's profile page
    const username = "get_user_from_api"; // Replace with the actual username from your API
    navigate(`/profile`); // Use navigate instead of history.push
  };

  const handleLogoutClick = () => {
    // Handle logout, e.g., clear local storage and redirect to the login page
    localStorage.removeItem("token");
    navigate("/login"); // Use navigate instead of history.push
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
                  src="/image/artist1.jpg"
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
