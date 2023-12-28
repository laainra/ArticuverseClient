import React, { useEffect, useState } from "react";

import {
  FaPaperPlane,
} from "react-icons/fa";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MiniButton } from "../components/General/Button";
import { Avatar, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { isAuthenticated } from "../Auth/AuthHelper.js";
import SupportModal from "../components/ModalSupport.jsx";
import axios from "axios";
import EditArtwork from "./EditArtwork.jsx";
import { Modal, Form, Button } from "react-bootstrap";
import Comment from "../components/CommentCard.jsx";
import { useMediaQuery } from "react-responsive";

const ArtworkModal = ({ artwork, onClose, onEditClick }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); 

  const [showModal, setShowModal] = useState(true);
  const [artworkData, setArtworkData] = useState([]);
  const [comments, setComments] = useState([]);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clickedArtwork, setClickedArtwork] = useState(true);
  const [isLoved, setIsLoved] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(artwork.like_count || 0);
  const [userData, setUserData] = useState({});
  const [body, setBody] = useState("");

  const fetchCommentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getComments/${artwork.id}`,
        {}
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Comments Data:", data);
        setComments(data.data);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, [artwork.id]);

  const handleComment = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("body", body); // Use the updated state variable
    formData.append("user_id", user_id);
    formData.append("artwork_id", artwork.id);

    try {
      const response = await axios.post(
        "http://localhost:8080/createComment",
        formData
      );

      if (response.status === 201) {
        // alert("Data berhasil ditambahkan");
        setBody(""); // Clear the comment input field after successful submission
        fetchCommentsData();
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const getLikesByArtwork = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-likes/${artwork.id}`
      );

      if (response.status === 200) {
        const likesData = response.data.totalLikes;
        console.log("Likes Data:", likesData);
        setLikeCount(likesData); // Assuming your likes data is nested under 'likes' key
      } else {
        console.error("Error fetching likes data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      return null;
    }
  };

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

  const handleLike = async () => {
    const user_id = localStorage.getItem("userId");
    try {
      // Assuming you have an endpoint to handle likes
      const response = await axios.post(
        `http://localhost:8080/like-artwork/${artwork.id}`,
        { user_id: user_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { liked, likesCount } = response.data;
      console.log(response.data);
      setIsLoved(liked);
      setLikeCount(likesCount);
    } catch (error) {
      console.error("Error liking artwork:", error);
    }
  };

  const handleSave = async () => {
    const user_id = localStorage.getItem("userId");

    try {
      // Assuming you have an endpoint to handle artwork saving
      const response = await axios.post(
        `http://localhost:8080/save-artwork/${artwork.id}`,
        {
          user_id: user_id,
        }
      );

      const { saved } = response.data;
      setIsBookmarked(saved);
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  };
  const handleEditClick = () => {
    setClickedArtwork(artworkData);
    setShowModal(false);
    onEditClick({ artworkData });
  };

  const fetchArtworkData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/artwork/${artwork.id}`
      );

      if (response.status === 200) {
        // Use response.data instead of response.json()
        const data = response.data;
        console.log("Artwork Data:", data.data);
        setArtworkData(data.data); // Assuming your user data is nested under 'user' key
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const deleteArtwork = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-artwork/${artwork.id}`
      );

      if (response.status === 200) {
        // alert("artwork deleted successfully");
        closeDeleteModal(); // Close the delete modal
        fetchArtworkData(); // Fetch updated data;
      } else {
        alert("Failed to delete artwork");
      }
    } catch (error) {
      console.error("An error occurred while deleting artwork:", error);
      alert("An error occurred while deleting artwork");
    }
  };

  const deleteComment = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-artwork/${artwork.id}`
      );

      if (response.status === 200) {
        // alert("artwork deleted successfully");
        closeDeleteModal(); // Close the delete modal
        fetchArtworkData(); // Fetch updated data;
      } else {
        alert("Failed to delete artwork");
      }
    } catch (error) {
      console.error("An error occurred while deleting artwork:", error);
      alert("An error occurred while deleting artwork");
    }
  };

  const handleSupportModal = () => {
    setShowSupportModal(true);
    setShowModal(false); // Set the state to true when FaPlus is clicked
  };

  const closeSupportModal = () => {
    setShowSupportModal(false);
    setShowModal(true); // Close the modal
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(true); // Set the state to true when FaPlus is clicked
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Close the modal
  };

  const handleEditModal = () => {
    setShowEditModal(true); // Set the state to true when FaPlus is clicked
    setShowModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false); // Close the modal
    setShowModal(true);
  };

  useEffect(() => {
    fetchArtworkData();
    fetchUserData();
    getLikesByArtwork();
  }, []);

  const isUserLoggedIn = () => {
    const loggedInUserId = localStorage.getItem("userId");
    return loggedInUserId === artwork.user_id;
  };

  return (
    <div className="mt-10 fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-75 z-50">
      <div className="z-51">
        {showSupportModal && (
          <SupportModal artwork={artworkData} onClose={closeSupportModal} />
        )}
        {showEditModal && (
          <EditArtwork artwork={artworkData} handleClose={closeEditModal} />
        )}
      </div>
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete this data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Detail Data</h5>
                <div className="row">
                  <p className="col-4 card-text">Artwork Name</p>
                  <p className="col-6 card-text">: {artwork.title}</p>
                </div>
                <div className="row">
                  <p className="col-4 card-text">Description</p>
                  <p className="col-6 card-text">: {artwork.description}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="primary"
            className="px-4"
            onClick={() => deleteArtwork(artwork.id)}
          >
            Hapus Data
          </Button>
          <Button variant="danger" onClick={closeDeleteModal}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
      <div
          className="bg-white rounded-lg overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
          style={{ width: isMobile ? "100%" : 800, height: isMobile ? "100%" : 500 }}
        >
          <div className={`flex justify-between items-center ${isMobile ? "flex-col-reverse mt-3" : "flex-row"}`}>
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
                src={`http://localhost:8080/uploads/${artwork.media}`}
                alt={artwork.title}
                className="w-80 h-80 mr-60 object-cover mb-3"
              />
            </MDBCol>
            <MDBCol className="text-center">
              <h3 className=" font-bold text-left">{artwork.title}</h3>
              <h5 className=" font-bold text-left">By: {artwork.artist}</h5>
              <p className="  text-left mb-4">{artwork.description}</p>
              <div className="flex  mb-2">
                <Avatar
                  src={`http://localhost:8080/uploads/${artwork.user_avatar}`}
                  alt={artwork.user_name}
                  sx={{ width: 27, height: 27, borderRadius: "50%", marginRight:"20px" }}
                />
                <div className="text-left">
                  <p className=" text-sm font-bold mb-1">
                    {artwork.user_name}{" "}
                  </p>
                  <p className="text-sm">@{artwork.user_username}</p>
                </div>
                <div className="ml-20">
                  {isUserLoggedIn() ? (
                    <>
                      <div className="mb-2">
                        <MiniButton onClick={handleEditModal} title="Edit" />
                      </div>
                      <div className="">
                        <MiniButton
                          onClick={handleDeleteModal}
                          title="Delete"
                        />
                      </div>
                    </>
                  ) : (
                    <MiniButton onClick={handleSupportModal} title="Support" />
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex">
                  <IconButton color="primary" onClick={handleLike}>
                    {isLoved ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "red" }} />
                    )}
                  </IconButton>
                  <Typography
                    variant="title1"
                    color="textSecondary"
                    className="mt-2"
                  >
                    {likeCount}
                  </Typography>
                  <IconButton color="primary" sx={{ marginLeft: "auto" }}>
                    {isBookmarked ? (
                      <BookmarkIcon sx={{ color: "red" }} />
                    ) : (
                      <BookmarkIcon
                        sx={{ color: "black" }}
                        onClick={handleSave}
                      />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="border-t-2 mt-1 pt-4">
                <h2 className="text-lg font-bold mb-2 text-left">Comments</h2>
                <div className="flex items-center mb-4">
                  <img
                    src={
                      userData.avatar != null
                        ? `http://localhost:8080/uploads/${userData.avatar}`
                        : "/image/profile.jpg"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="relative w-max">
                    {" "}
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="border p-2 w-full rounded bg-red-50 focus:outline-none "
                      name="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <span
                      className="absolute top-4 right-8 border-l"
                      onClick={handleComment}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="absolute text-gray-400">
                        <FaPaperPlane />
                      </i>
                    </span>
                  </div>
                </div>
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    username={comment.user_username}
                    user_id={comment.user_id}
                    artwork_id={comment.artwork_id}
                    createdAt={comment.created_at}
                    body={comment.body}
                    avatar={comment.user_avatar}
                    isUserLoggedIn={isUserLoggedIn}
                    fetchCommentsData={fetchCommentsData}
                  />
                ))}
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
