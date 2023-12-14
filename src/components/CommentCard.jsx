import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = ({
  id,
  user_id,
  username,
  createdAt,
  avatar,
  body,
  fetchCommentsData,
  artwork_id
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(body);

  const handleEditCancel = () => {
    setIsEditing(false);

    setEditedComment(body);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/updateComment/${id}`,
        {
          body: editedComment,
          user_id: user_id,
          artwork_id: artwork_id
        }
      );

      if (response.status === 200) {
        // alert("Comment updated successfully");
        fetchCommentsData();
        setIsEditing(false);
      } else {
        alert("Failed to update comment");
      }
    } catch (error) {
      console.error("An error occurred while updating comment:", error);
      alert("An error occurred while updating comment");
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteComment/${id}`
      );

      if (response.status === 200) {
        // alert("Comment deleted successfully");
        fetchCommentsData();
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("An error occurred while deleting comment:", error);
      alert("An error occurred while deleting comment");
    }
  };

  const isUserLoggedIn = () => {
    const loggedInUserId = localStorage.getItem("userId");
    return loggedInUserId === user_id;
  };
  const formatTimestamp = (timestamp) => {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);

    const timeDifference = currentDate - commentDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds < 5 ? "just now" : `${seconds} seconds ago`;
    }
  };
  return (
    <div className="flex items-center mb-2 border-b-2">
      <div className="text-left justify-start">
        <div className="flex">
          <img
            src={
              avatar != null
                ? `http://localhost:8080/uploads/${avatar}`
                : "/image/profile.jpg"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <p className="font-bold mr-2 mt-2">@{username}</p>
        </div>

        <div className="ml-12 flex-col">
          {isEditing ? (
            <div className="items-center mb-4">
              <input
                type="text"
                placeholder="Edit your comment..."
                className="border p-2 w-full rounded bg-red-50 focus:outline-none "
                name="body"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <div className="flex">
                {" "}
                <button className="mr-3 hover:text-red-500" onClick={handleEditSave}>Save</button>
                <button  className="mr-3 hover:text-red-500" onClick={handleEditCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p>{body}</p>
              <div className="flex">
                <p className="font-italic text-sm">
                  {formatTimestamp(createdAt)}
                </p>
                {isUserLoggedIn() && (
                  <div className="mb-2 flex">
                    <FaEdit
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                      onClick={handleEditClick}
                    />
                    <FaTrash
                      className="mx-3"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={deleteComment}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
