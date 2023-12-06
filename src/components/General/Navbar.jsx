import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MiniButton } from "./Button";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import AvatarDropdown from "../AvatarDropdown";
import { FaPlus } from "react-icons/fa";
import UploadArtworkModal from "../ModalArtwork";

function Navi() {
  const { isAuthenticated } = useAuth0();
  const NavLinkStyle = styled(Link)`
    margin: 0 0.5rem;
    text-decoration: none;
    color: #000;

    &:hover {
      border-bottom: 2px solid #ff5b5b;
      color: #000;
    }

    &.active {
      border-bottom: 2px solid #ff5b5b;
      color: #000;
    }
  `;

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const getMiniButtonTitle = () => {
    if (location.pathname === "/login") {
      return "Register";
    }
    return "Login";
  };

  const getMiniButtonTo = () => {
    if (location.pathname === "/login") {
      return "/register";
    }
    return "/login";
  };

  const getNavLinkHref = (section) => {
    if (location.pathname === "/home" && section !== "home") {
      return `/${section}`;
    }
    return `/${section}`;
  };


  const handlePlusIconClick = () => {
    setShowModal(true); // Set the state to true when FaPlus is clicked
  };

  const closeUploadModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" expanded={expanded} fixed="top">
      {showModal && <UploadArtworkModal onClose={closeUploadModal} />}
        <Container className="w-full justify-between">
        
          <div className="flex justify-between items-center">
            <div className="mr-32 2xl:mr-5">
              <Navbar.Brand as={Link} to="/home">
                <img
                  className=""
                  width="100px"
                  src="/image/logo.png"
                  alt="Logo"
                />
              </Navbar.Brand>
            </div>
            <div className="flex justify-end">
              <Navbar.Toggle
                className="ml-24"
                aria-controls="basic-navbar-nav"
                onClick={() => setExpanded(!expanded)}
                style={{ right: 0 }}
              >
                <span style={{ color: "black" }}>&#9776;</span>
              </Navbar.Toggle>
            </div>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto lg:ml-32">
              <NavLinkStyle
                to={getNavLinkHref("home")}
                className={`mx-5 ${
                  location.pathname === "/" || location.pathname === "/home"
                    ? "active"
                    : ""
                }`}
              >
                Home
              </NavLinkStyle>
              <NavLinkStyle
                to={getNavLinkHref("explore")}
                className={`mx-5 ${
                  location.pathname === "/explore" ? "active" : ""
                }`}
              >
                Explore
              </NavLinkStyle>
              <NavLinkStyle
                to={getNavLinkHref("learn")}
                className={`mx-5 ${
                  location.pathname === "/learn" ? "active" : ""
                }`}
              >
                Learn
              </NavLinkStyle>
              <NavLinkStyle
                to={getNavLinkHref("exhibition")}
                className={`mx-5 ${
                  location.pathname === "/exhibition" ? "active" : ""
                }`}
              >
                Exhibition
              </NavLinkStyle>
              <NavLinkStyle
              // to={getNavLinkHref("exhibition")}
              // className={`mx-5 ${
              //   location.pathname === "/exhibition" ? "active" : ""
              // }`}
              ></NavLinkStyle>
            </Nav>

            {location.pathname !== "/" && (
              <div className="flex items-center h-12 mt-2">
                <div className="w-12 h-12 items-center">
                <div className="rounded-full w-8 h-8 bg-red-600 flex items-center justify-center">
                  <FaPlus className="text-white text-2xl p-1" onClick={handlePlusIconClick}/>
                </div>
                </div>

                <AvatarDropdown />
              </div>
            )}

            {location.pathname === "/" && (
              <MiniButton title={getMiniButtonTitle()} to={getMiniButtonTo()} />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navi;
