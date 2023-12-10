import React, { useState,useEffect } from 'react'
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
import Footer from "../components/General/Footer";
import {Button, LongButton} from "../components/General/Button.jsx"
import Navi from "../components/General/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "../App.css";
import axios from "axios";

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || username === "" || email === ""|| password === "") {
      alert("Failed to Register,fill all the form ");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/register", {
          name,
          username,
          email,
          password,
        });

        if (response.status === 200) {
          alert("Register Successful");
          window.location.replace('http://localhost:3000/login');
        } else {
          alert("Failed to register");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while submitting data");
      }
    }
  };
  useEffect(() => {
    document.title = 'Register | Articuverse'; 
    return () => {

      document.title = 'Articuverse';
    };
  }, []);
  return (
    <>
      <Navi />
      <style>
        {`
          /* Override accent colors */
          .btn {
            background-color: #FF5B5B !important;
            color: #000 !important;
            color: #fff !important;
          }

          .btn:hover {
            background-color: #c84343 !important;
            color: #fff !important;
          }

          .circle-button {
            background-color: #FFE9E9 !important;
          }

          .social-buttons .circle-button:hover {
            background-color: #FF5B5B !important;
          }

          .md-form.md-form-lg.focused .form-control {
            border-color: #c84343 !important;
          }
        `}
      </style>

      <MDBContainer fluid className="p-3 my-2 h-custom mt-5">
        <MDBRow>
          <MDBCol col="8" md="6" className="d-flex ml-5 mt-5">
            <img
              src="./image/register.png"
              className=" w-full"
              alt="Sample image"
            />
          </MDBCol>
          <MDBCol col="4" md="4" className=" mt-5 me-auto ms-auto">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h1 className="lead fw-bold mb-0 me-3 fs-1">Register</h1>
            </div>


            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="social-buttons">
                <div className="circle-button">
                  <a><FontAwesomeIcon icon={faFacebookF} /></a>
                  
                </div>

                <div className="circle-button">
                  <a>
                    {" "}
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </div>

                <div className="circle-button">
                  <a> <FontAwesomeIcon icon={faGithub} /></a>
                 
                </div>
              </div>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <div className="divider-line"></div>
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
              <div className="divider-line"></div>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Name
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-user mr-2"></i> Username
                </span>
              }
              id="formControlLg"
              type="text"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-envelope mr-2"></i> Email address
                </span>
              }
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              label={
                <span>
                  <i className="fas fa-lock mr-2"></i> Password
                </span>
              }
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className=" ml-5 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2">
              <LongButton title="Register" onClick={handleFormSubmit} className="mb-2 mb-md-0 px-5 mx- " size="lg"/>

              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/login" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default Register;
