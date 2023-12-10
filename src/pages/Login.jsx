import React, { useState, useEffect } from "react";
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
import { Button, LongButton } from "../components/General/Button.jsx";
import {handleLogin} from "../Auth/AuthHelper.js";

import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = 'Login| Articuverse'; 
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

      <MDBContainer
        fluid
        className="p-3 h-custom d-flex align-items-center justify-content-center mt-5"
      >
        <MDBRow>
          <MDBCol col="4" md="4" className="order-2 order-md-1 mt-5">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h className="lead fw-bold mb-0 me-3 fs-1">Login</h>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="social-buttons">
                <div className="circle-button">
                  <a>
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </div>

                <div className="circle-button">
                  <a>
                    {" "}
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </div>

                <div className="circle-button">
                  <a>
                    {" "}
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
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
              label="Email address"
              id="email"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
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

            <div className="ml-5 flex-column flex-md-row align-items-center text-center text-md-start mt-4 pt-2">
              <LongButton
                className="mb-2 mb-md-0 px-5 "
                size="lg"
                title="Login"
                onClick={() => handleLogin(email, password)}
              />

              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/register" className="link-danger">
                  Register
                </a>
              </p>
            </div>
          </MDBCol>
          <MDBCol
            col="10"
            md="6"
            className="order-1 order-md-2 d-flex  mt-5 md:ml-32"
          >
            <img
              src="./image/login.png"
              className="mr-auto w-full"
              alt="Sample image"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default Login;
