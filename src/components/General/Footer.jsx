import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MiniButton } from "./Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function App() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#FFF9F9" }}
      className="text-center text-lg-start text-muted"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block mx-5">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="mx-5">
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#" className="me-4 text-reset">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Articuverse</h6>
              <p>
                Articuverse is an online platform that allows users to discover
                art and design inspiration, create articles and engage in art
                and culture learning, and access information about museums and
                exhibitions.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <form action="">
                <p className="">
                  <strong>GET IN TOUCH</strong>
                  
                </p>
                <p className="">
                Don’t miss any updates of our 
new templates and extensions.!
                  
                </p>

                <MDBInput
                  type="text"
                  id="form5Example2"
                  label="Email address"
                  className="m-3"
                />

                <MiniButton
                  className="mb-2 mb-md-0 px-5 "
                  size="lg"
                  title="Subscibe"
                />
              </form>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">OUR GUIDELINES</h6>
              <p>
                <a href="#!" className="text-reset">
                Terms
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Privacy policy

                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Cookie Policy
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Discover
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fa fa-Home" />
                Magetan, East Java, indonesia
              </p>
              <p>
                <i className="fa fa-Envelope" />
                contact@Articuverse.com
              </p>
              <p>
                <i className="fa fa-Phone" /> + 62812345678
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "#F2E1E1" }}>
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="/">
          Articuverse.com
        </a>
      </div>
    </MDBFooter>
  );
}
