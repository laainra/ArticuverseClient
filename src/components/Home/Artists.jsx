import React from "react";
import { Button } from "../General/Button";

export default function Artists() {
  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    textAlign: "center",
    margin: "0 30px 50px 0",
  };

  const cardStyle = {
    margin: "50px",
    textAlign: "center",
    width: "300px",
    padding: "20px",
    backgroundColor: "#FFF5F5",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
  };

  const imageStyle = {
    margin: "0 0 20px 0",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const artists = [
    {
      image: "/image/artist1.jpg",
      name: "Liz",
      desc: "Artist from South Korea, Loves to Draw and Sing",
    },
    {
      image: "/image/artist2.jpg",
      name: "Juyy",
      desc: "Love me if you love arts",
    },
    {
      image: "/image/artist3.jpg",
      name: "ElJH",
      desc: "Arts are about your personality",
    },
  ];

  const buttonStyle = {
    margin: "20px",
  };

  return (
    <div id="artists">
      <div className="text-center ">
        <h2 className="black bold" style={{ marginRight: "10px" }}>
          {" "}
          Meet <span className="fw-bold red"> Great Artists</span>
        </h2>
        <h2 className="black">
          and Make Yourself <span className="blue">One of Them</span>
        </h2>
      </div>

      <div style={cardContainerStyle}>
        {artists.map((artist, index) => (
          <div className="card" style={cardStyle} key={index}>
            <img src={artist.image} alt={artist.name} style={imageStyle} />
            <h3>{artist.name}</h3>
            <p>{artist.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
