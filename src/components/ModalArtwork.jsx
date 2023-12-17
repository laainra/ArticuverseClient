import { FaUpload } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useMediaQuery } from "react-responsive";
import React, { useState } from "react";

// UploadArtworkModal component
const UploadArtworkModal = ({ onClose }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
      setShowModal(false);
      // Optionally, you can call the onClose prop to notify the parent component
      if (onClose) {
        onClose();
      }
    };

    
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg overflow-hidden flex flex-col items-center "
        style={{ width: isMobile ? "100%" : 800, height: isMobile ? "100%" : 500 }}
      >
        <div className="flex justify-between p-4 items-center w-full">
          <div className="text-2xl font-bold text-center">
            Share Your Art Work
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
        <div className="flex flex-grow items-center">
          <div className="box w-full">
            <div className="rectangle border-dashed border-2 border-gray-700 m-3 rounded-lg flex items-center justify-center" style={{ width: 700, height: 350 }}>
              <div className="flex flex-col items-center my-10 mx-24">
                <div className="bg-white w-24 h-24 rounded-full mb-3 flex items-center justify-center text-black">
                  <a href="/upload-artwork"><FaUpload className="text-2xl" /></a>
                </div>
                <div className="text-center font-roboto text-24px ">
                  Choose a file or drag and drop it here
                </div>
                <div className="text-center font-roboto text-xs mt-14">
                Use high-quality jpg, jpeg, or png files less than 20 MB.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArtworkModal;
