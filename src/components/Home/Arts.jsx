
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "../General/Button";

function Arts() {
  const [visibleItems, setVisibleItems] = useState(0);
  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    textAlign: "center",
    margin: "0 0 50px 0",
  };

  const cardStyle = {
    margin: "20px",
    textAlign: "center",
    width: "400px",
    padding: "20px",
    backgroundColor: "#FFF5F5",
    transition: "opacity 0.5s ease", // Add a CSS transition for opacity
    opacity: 0, // Start with 0 opacity
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
  };

  const arts = [
    {
      image: "/image/the-irony.jpg",
      title: "The Irony of Ruralism",
      author: "Eddy Susanto",
    },
    {
      image: "/image/st-john.jpeg",
      title: "St. John",
      author: "J. Aryadhitya Pramuhendra",
    },
    {
      image: "/image/syagini.jpeg",
      title: "389-696-104-554",
      author: "Syagini Ratna Wulan",
    },
    {
      image: "/image/the-irony.jpg",
      title: "The Irony of Ruralism",
      author: "Eddy Susanto",
    },
    {
      image: "/image/st-john.jpeg",
      title: "St. John",
      author: "J. Aryadhitya Pramuhendra",
    },
    {
      image: "/image/syagini.jpeg",
      title: "389-696-104-554",
      author: "Syagini Ratna Wulan",
    },
  ];

  const buttonStyle = {
    margin: "20px",
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setVisibleItems(arts.length);
    }
  }, [inView, arts.length]);


  return (
    <div id="explore-arts">
      <div className="text-center">
        <h2 className="black bold" style={{ marginRight: "10px" }}>
          {" "}
          Explore <span className="fw-bold red"> Art Inspirations</span>
        </h2>
        <h2 className="black">
          from All Over <span className="blue">The World</span>
        </h2>
      </div>
      <div style={cardContainerStyle}>
        {arts.slice(0, window.innerWidth >= 768 ? arts.length : 3).map((art, index) => (
          <div
            className="card"
            style={{ ...cardStyle, opacity: inView ? 1 : 0 }} // Apply opacity based on inView
            key={index}
            ref={ref}
          >
            <img src={art.image} alt={art.title} style={imageStyle} />
            <h3>{art.title}</h3>
            <p>By {art.author}</p>
          </div>
        ))}
      <div style={{ textAlign: "center", margin: "20px 0 0 0" }} className="center-button col-span-1">
        <Button title="More Arts" to="explore" />
      </div>
      </div>
      

    </div>
  );
}

export default Arts;
