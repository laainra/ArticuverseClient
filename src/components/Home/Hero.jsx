import React from "react";
import { Carousel } from "react-bootstrap";
import { Button } from '../General/Button';


function Hero() {
  const carouselStyle = {
    backgroundColor: "transparent",
    textAlign: "center",
    margin: "0 0 50px 0",
  };

  const titleStyle = {
    color: "white",
    fontSize: "70px",
    fontWeight: "bold",
    margin: "10px 0 50px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const subTitleStyle = {
    color: "white",
    fontSize: "30px",
    margin: "10px 0 100px 0",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  };

  const buttonStyle = {
    margin: "0 50px 50px 0",
    verticalAlign: "middle",
  };

  const carouselData = [
    {
      image: `${process.env.PUBLIC_URL}/image/maxresdefault.jpg`,
      title: "Welcome to Articuverse",
      subTitle: "Discover, Create, and Connect with a Global Community of Artists and Art Enthusiasts",
    },
    {
      image: `${process.env.PUBLIC_URL}/image/carousel.jpg`,
      title: "Explore the Art World",
      subTitle: "Immerse yourself in a diverse range of artistic creations from around the globe",
    },
    {
      image: `${process.env.PUBLIC_URL}/image/carousel.jpeg`,
      title: "Join Our Art Community",
      subTitle: "Share your own art, connect with fellow artists, and inspire the world with the arts",
    },
  ];

  return (
    <Carousel style={carouselStyle} interval={5000} controls={false}>
      {carouselData.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="w-100"
            style={{ height: "600px", objectFit: "cover" }}
            src={item.image}
            alt={`Slide ${index + 1}`}
          />
          <Carousel.Caption>
            <div className="text-center my-6">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                {item.title}
              </h1>
              <p className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-8" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}>
                {item.subTitle}
              </p>
              <div className="flex justify-center">
                
                <Button title="Join Us Now" to="register" />
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Hero;
