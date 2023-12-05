import React, { useEffect, useState } from "react";
import Navi from "../../components/General/Navbar.jsx";
import { MiniButton } from '../../components/General/Button.jsx';
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    // avatar: userData.avatar,
    // username: 'Username',
    // name: 'User Name',
    // description: 'This user has no description.',
  });

  useEffect(() => {
    // Fetch user data from your backend
    // Update the endpoint based on your backend routing
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          
        });
        if (response.ok) {
          const data = await response.json();
          console.log('User Data:', data);
          setUserData(data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
        
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUserData();
  }, []);

  const token = localStorage.getItem('token');
console.log('Token:', token);


  const imageStyle = {
    margin: "0 0 20px 0",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const [activeTab, setActiveTab] = useState('works');

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  const ava = (user) => {
    if (user.avatar == null) {
      return '/image/artist1.jpg'
    } else {
      return user.avatar 
    }

  }

  return (
    <div className="font-roboto">
      <Navi /> 
      <div className="h-screen flex flex-col items-center justify-center mt-32">
        <div className="text-center">
          <img
            src={ava(userData)}
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
                activeTab === 'works' ? 'border-b-2' : ''
              }`}
              onClick={() => switchTab('works')}
            >
              Works
            </button>
            <button
              className={`text-lg font-bold ${
                activeTab === 'saved' ? 'border-b-2' : ''
              }`}
              onClick={() => switchTab('saved')}
            >
              Saved
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {activeTab === 'works' ? (
              <>
                <div className="bg-gray-200 w-full h-32 rounded-lg" />
                <div className="bg-gray-200 w-full h-32 rounded-lg" />
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
