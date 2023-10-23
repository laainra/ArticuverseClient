import React from "react";
import { Button } from "../General/Button";

function Museum() {
  const imageStyle = {
    margin: "40px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div id="explore-arts" style={{ backgroundColor: "#FFF5F5", padding: "50px" }}>
      <div className="text-center ">
        
        <h2 className="black bold flex justify-center" >
          {" "}
          Explore <span className="fw-bold red" style={{ marginLeft: "3px" }}> Art Inspirations</span>
        </h2>
        <h2 className="black">
          from All Over <span className="blue">The World</span>
        </h2>
        <div className="flex justify-center">
          <img
            src="image/museum.jpg"
            alt="{artist.name}"
            className="max-w-full h-auto"
            style={imageStyle}
          />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Button title="Join Us Now" to="/register" />
      </div>
    </div>
  );
}

export default Museum;
