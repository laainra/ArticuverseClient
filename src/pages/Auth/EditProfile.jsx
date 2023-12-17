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
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function EditProfile() {
  const IsMobile = useMediaQuery({ maxWidth: 767 }); 
  const nav = new useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [bank_acc, setBankAcc] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log("User Data:", data);
          // Set the state with user data
          setUserData(data.user);
          // Populate the form fields with user data
          setName(data.user.name || "");
          setUsername(data.user.username || "");
          setDescription(data.user.description || "");
          setEmail(data.user.email || "");
          setPassword(data.user.password || "");
          setBankAcc(data.user.bank_acc || "");
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const avatarSource =
  avatar || userData.avatar
    ? avatar
      ? URL.createObjectURL(avatar)
      : `http://localhost:8080/uploads/${userData.avatar}`
    : "/image/profile.jpg";


// ...
const handleUpdateProfile = async (event) => {
  event.preventDefault();
  const user_id = localStorage.getItem("userId");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("avatar", avatar);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("user_id", user_id);
  formData.append("bank_acc", bank_acc);
  

  try {
    const response = await axios.post(
      `http://localhost:8080/api/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      console.log("response", response);
      // alert("Data berhasil diubah");
      window.location.replace("http://localhost:3000/profile");
    } else {
      alert("Failed to update data");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting data");
  }
};
// ...
console.log("userData:", userData);

  return (
    <div className="font-roboto">
      <Navi />
      <MDBContainer fluid className="p-3 my-2 h-custom mt-5">
        <MDBRow>
          <MDBCol col="8" md="4" className="text-center items-center">
            <img
              src={avatarSource
              }
              alt="Avatar"
              className={
                IsMobile
                  ? " mt-3 w-40 ml-28 h-40 object-cover rounded-full"
                  : "w-80 h-80 ml-40 mt-32 mr-60 object-cover rounded-full"
              }
            />

            <MDBBtn
              tag="label"
              color="danger"
              rounded
              size="xl"
              htmlFor="avatarFile"
              className={IsMobile ? "mt-3" : "ml-44 mt-3"}
            >
              Change
              <input
                type="file"
                onChange={handleFileChange}
                defaultValue={avatar ? "" : userData.avatar}
                id="avatarFile"
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"

             
              />
            </MDBBtn>
            <h5 className="text-sm ml-44 mt-2 text-red-500">
              {avatar ? `Selected avatar: ${avatar.name}` : ""}
            </h5>
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
              // defaultValue={userData.name}
              value={name}
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
              // defaultValue={userData.username}
              value={username}
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
              // defaultValue={userData.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h6 className="text-bold">Email</h6>
            <MDBInput
              
              wrapperClass="mb-4"
              id="formControlLg"
              type="text"
              size="lg"
              // defaultValue={userData.email}

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h6 className="text-bold">Bank Account (Format: Account Number(Bank Name)) </h6>
            <MDBInput
              
              wrapperClass="mb-4"
              id="formControlLg"
              type="text"
              size="lg"
              // defaultValue={userData.email}

              value={bank_acc}
              onChange={(e) => setBankAcc(e.target.value)}
            />
            <h6 className="text-bold">Password</h6>
            <MDBInput
              
              wrapperClass="mb-4"
              id="formControlLg"
              type="password"
              size="lg"
              // defaultValue={userData.email}
              required
              placeholder="Enter your password for confirmation"
              label={
                <span>
                  <i className="fas fa-envelope mr-2"></i> Enter your password for confirmation
                </span>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={IsMobile ?  "ml-20 mt-3" : "ml-32 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2"} >
              <Button
                name="Update"
                title="Update"
                onClick={handleUpdateProfile}
                className={IsMobile ? "mt-3" : "ml-44 mt-3"}
                size="lg"
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
