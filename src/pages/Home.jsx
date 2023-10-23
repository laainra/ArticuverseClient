import React from "react";

import withSplashScreen from '../components/withSplashScreen';

import Footer from "../components/General/Footer";
import Hero from "../components/Home/Hero";
import Arts from "../components/Home/Arts";
import Navi from "../components/General/Navbar.jsx";
import Learn from "../components/Home/Learn";
import Artists from "../components/Home/Artists";
import Exhibition from "../components/Home/Exhibition";
import Museum from "../components/Home/Museum";
import Royalties from "../components/Home/royalties";

function Home() {
  return (
    <>
      <Navi id="navi" />
      <Hero id="hero" />
      <Arts id="explore" />
      <Learn id="learn" />
      <Artists id="artist" />
      <Exhibition id="exhibition" />
      <Royalties id="royalties" />
      <Museum id="museum" />
      <Footer id="footer" />
    </>
  );
}


export default withSplashScreen(Home);
