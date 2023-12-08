import React, { useState, useEffect } from "react";
import axios from "axios";
import Navi from "../../components/General/Navbar.jsx";
import { Button } from "../../components/General/Button.jsx";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [userData, setUserData] = useState({
  });

  useEffect(() => {
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

    fetchUserData();
  }, []);


  const handleUpdateProfile = () => {
    // Handle update logic here
  };

  return (
    <div className="font-roboto">
      <Navi />
      <MDBContainer fluid className="p-3 my-2 h-custom mt-5">
        <MDBRow>
          <MDBCol col="8" md="4" className="text-center items-center">
            <img
              src="/image/profile.jpg"
              alt="Avatar"
              className="w-32 h-32 rounded-circle ml-60 mt-40 object-cover"
            />
            <MDBBtn
              tag="label"
              color="danger"
              rounded
              size="xl"
              htmlFor="avatarFile"
              className="ml-40 mt-3"
            >
              Change
              <input type="file" id="avatarFile" style={{ display: "none" }} />
            </MDBBtn>
          </MDBCol>
          <MDBCol col="4" md="4" className=" mt-5 me-auto ms-auto">
            <div className="mt-20  d-flex flex-row align-items-center justify-content-center">
              <h5 className="lead fw-bold mb-0 me-3 fs-1">Edit Profile</h5>
            </div>

            <h6 className="text-bold">
              Name<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Your Name
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={userData.name}
              onChange={(e) => setName(e.target.value)}
            />
                        <h6 className="text-bold">
              Username<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Your Username
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={userData.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h6 className="text-bold">
              Description<span className="text-red-700">*</span>
            </h6>
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-envelope mr-2"></i> Add Description Here
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={userData.description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className=" ml-32 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2">
              <Button
                title="Update"
                onClick={handleUpdateProfile}
                className="mb-2 mb-md-0 px-5 ml-5 "
                size="lg"
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </div>
  );
}
