import { FaBookmark, FaHeart } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import {

  MDBCol,
  MDBRow,

} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MiniButton } from "./General/Button";

// UploadArtworkModal component
const ArtworkModal = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    // Optionally, you can call the onClose prop to notify the parent component
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="mt-10 fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 z-50">
      <div
        className="bg-white rounded-lg overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
        style={{ width: 800, height: 500 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-center">Detail Artwork</div>
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
        <div className="box w-full p-4 flex ">
          <MDBRow>
            <MDBCol className="text-center items-center">
              <img
                src="/image/up_img.png"
                alt="Art Upload"
                className="w-80 h-80 mr-60 object-cover"
              />
            </MDBCol>
            <MDBCol className="text-center">
              <h1 className="text-xl font-bold text-left">Title</h1>
              <p className="text-sm mb-2 text-left mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
                minus ad illum vitae id, error porro nihil, eveniet praesentium
                soluta vel nobis ea rem optio at laudantium impedit explicabo
                numquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo tempore quaerat ab doloribus rem quia cumque veniam corporis blanditiis sint?
              </p>
              <div className="flex  mb-2">
                <img
                  src="/image/artist1.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div className="text-left">
                  <p className=" text-sm font-bold mb-1">Liz Art </p>
                  <p className="text-sm">@lizzzz__</p>
                  
                </div>
                <div className="ml-20"><MiniButton onClick={""} title="Support"/></div>
                
              </div>
              <div className="flex items-center mb-4">
                <div className="">
                  <button className="mr-2">
                    <FaHeart className="text-sm text-gray-500" />
                  </button>
                  <span className="text-sm font-bold mr-2">20</span>
                  <button className="mr-2">
                    <FaBookmark className="text-sm text-gray-500" />
                  </button>

                </div>
              </div>
              <div className="border-t-2 mt-1 pt-4">
            <h2 className="text-lg font-bold mb-2 text-left">Comments</h2>
            <div className="flex items-center mb-2">
              <img
                src="/image/artist1.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="border p-2 w-full rounded bg-red-50"
              />
            </div>
            {/* Additional comments can be added here */}
          </div>
            </MDBCol>
          </MDBRow>

        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
