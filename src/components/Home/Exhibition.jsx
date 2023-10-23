import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../App.css";

export default function Exhibition() {
  const imageStyle = {
    margin: "0 0 20px 0",
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    width: "100%",
  };

  return (
    <section className="section justify-center ">
      <Container className="mt-10 md:mt-16">
        <Row>
        <Col md={6} className="image-container sm:order-2">
            <img
              src="/image/show-gallery.gif"
              alt="Amazing Arts"
              className="main-image"
              style={imageStyle}
            />
          </Col>
          <Col md={6} className="text-container md:order-2">
            <div className="d-flex justify-center">
              <h2 className="black bold" style={{ marginRight: "10px" }}>
                Discover{" "}
              </h2>
              <h2 className="red bold">Wonderful World</h2>
            </div>
            <div className="d-flex justify-center">
              <h3 className="black" style={{ marginRight: "10px" }}>
                Find Current
              </h3>
              <h3 className="blue" style={{ marginRight: "10px" }}>
                Exhibition Here
              </h3>
            </div>

            <div className="text-container ">
              <p>
                Step into a world of wonder and exploration with our current
                exhibition. Immerse yourself in the captivating narratives and
                artistic expressions on display.
              </p>
              <p>
                Join our knowledgeable guides for an in-depth tour of the
                exhibition. They'll provide fascinating insights and answer your
                questions, enhancing your understanding of the art and
                artifacts.
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}
