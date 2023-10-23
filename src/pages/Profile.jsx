import React, { useState } from 'react';
import Navi from "../components/General/Navbar.jsx";
import { MiniButton } from '../components/General/Button.jsx';

const Profile = () => {
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

  return (
    <div className="font-roboto">
      <Navi /> 
      <div className="h-screen flex flex-col items-center justify-center mt-32">
        <div className="text-center">
          <img
            src="/image/artist1.jpg"
            alt="User Avatar"
            className="w-48 h-48 rounded-full mx-auto"
            style={imageStyle}
          />
          <h1 className="text-4xl font-bold mt-4">User Name</h1>
          <p className="text-gray-500 text-lg">@username</p>
          <p className="text-lg">Description</p>
                    <div className="flex justify-center">
            <MiniButton to="/editprofile" title="Edit Profile" />
          </div>
          <div className="mt-4 text-xl font-bold">
            <div className="flex items-center justify-center space-x-4">
              <span>Total Works</span>
              <span>Followers</span>
              <span>Following</span>
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
