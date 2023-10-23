import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import "../../App.css";
import { Button } from "../General/Button";

export default function Learn() {
  return (
    <section className="py-16">
      <Container>
        <Row className="items-center">
          <Col md={6} className="mb-6 md:mb-0">
            <img
              src="/image/artgif.gif"
              alt="Amazing Arts"
              className="w-full mt-5 rounded-sm"
            />
          </Col>
          <Col md={6} className="sm:text-center lg:text-left ">

  <div className="md:ml-5">
    <div className="text-center">
    <h2 className="text-black font-bold">
    Learn How to Create{" "}
    <span className="text-red-600 font-bold">Amazing Arts</span>
  </h2>
  <h2 className="text-black" style={{ marginRight: "10px" }}>
    With<span className="text-blue-600 font-bold"> Professional</span>
    <span className="text-black font-bold"> Tutor</span>
  </h2>
    </div>

<div className="ml-0 lg:ml-0">

  <ul className="list-none mt-5">
    <li className="mb-2">
      <FaCheck className="inline-block text-red-600" /> Expert guidance from artist
    </li>
    <li className="mb-2">
      <FaCheck className="inline-block text-red-600" /> Connect with a community of fellow artists
    </li>
    <li className="mb-2">
      <FaCheck className="inline-block text-red-600" /> Affordable Pricing
    </li>
  </ul>
</div>

  </div>
  <div className="flex justify-center mt-8">
    <Button to="learn" title="Learn" className="mx-auto" />
  </div>
</Col>

        </Row>
      </Container>
    </section>
  );
}
