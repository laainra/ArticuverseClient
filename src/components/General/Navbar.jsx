import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MiniButton } from "./Button";
import styled from "styled-components";

function Navi() {
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

  return (
    <div>
      <Navbar bg="light" expand="lg" expanded={expanded} fixed="top">
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
                style={{  right: 0 }}
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
            </Nav>
            <MiniButton title={getMiniButtonTitle()} to={getMiniButtonTo()} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navi;
