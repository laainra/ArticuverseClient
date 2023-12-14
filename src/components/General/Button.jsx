import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


function Button({ title, to, onClick }) {
  return (
    <Wrapper to={to} className="animate pointer radius8" onClick={onClick}>
      {title}
    </Wrapper>
  );
}

function LongButton({ title, to, onClick, onKeyDown }) {
  return (
    <LongWrapper to={to} className="animate pointer radius8" onClick={onClick} onKeyDown={onKeyDown}>
      {title}
    </LongWrapper>
  );  
}

function MiniButton({ title, to, onClick }) {
  return (
    <MiniWrapper to={to} className="animate pointer radius8" onClick={onClick}>
      {title}
    </MiniWrapper>
  );
}
// Create a styled component for the base button
const Wrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 192px;
  flex-shrink: 0;
  background-color: #ff5b5b;
  border-radius: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  text-decoration: none; /* Remove underline for links */
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #c84343;
    color: #fff;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LongWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 53px;
  flex-shrink: 0;
  background-color: #ff5b5b;
  border-radius: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  text-decoration: none; /* Remove underline for links */
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #c84343;
    color: #fff;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const MiniWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94px;
  height: 39px;
  flex-shrink: 0;
  background-color: #ff5b5b;
  border-radius: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  text-decoration: none; /* Remove underline for links */
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #c84343;
    color: #fff;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export { Button, LongButton, MiniButton };
