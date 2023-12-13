import { MiniButton } from "./General/Button.jsx";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaWhatsapp,
  FaWhatsappSquare,
} from "react-icons/fa";

// ModalSuccess component
const ModalSuccess = ({ onClose, artwork }) => {
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
        style={{ width: 800, height: 500 }}
      >
        <div className="flex justify-between p-4 items-center w-full">
          <div className="text-2xl font-bold text-center">
            Support Our Artist
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
            <div
              className="rectangle border-dashed border-2 border-gray-700 m-3 rounded-lg flex items-center justify-center"
              style={{ width: 700, height: 350 }}
            >
              <div className="flex flex-col items-center my-10 mx-24">
                <h4 className="text-xl my-5">
                  Support <span className="text-red-400">@{artwork.user_username}  </span>with an additional contribution
                </h4>
                <div className=" flex text-center font-roboto text-24px ">
                  <h6 className="mt-3 mr-2">Amount:</h6>
                  Amount From Support Form
                  <div className="mt-1 ml-2">
                  <MiniButton title="Support" onClick={""} />
                  </div>
                  
                </div>
                <div className="text-center font-roboto text-sm mt-14">
                  Or contribute with share this artwork to help @{artwork.user_username}:
                </div>
                <div className=" flex text-center justify-between font-roboto text-2xl mt-14 pb-3">
                  <div className="mx-2">
                  <FaWhatsappSquare /> 
                  </div>
                  <div className="mx-2">
                  <FaInstagram />
                  </div>
                  <div className="mx-2">
                  <FaFacebook /> 
                  </div>
                  <div className="mx-2">
                  <FaTwitter />
                  </div>
                  <div className="mx-2">
                  <FaLink />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
