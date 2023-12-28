import React, {useEffect} from "react";

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
import { motion } from "framer-motion";

function Home() {

  useEffect(() => {
    document.title = 'Dashboard | Articuverse'; 
    return () => {

      document.title = 'Articuverse';
    };
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Navi id="navi" />
      <motion.div
        id="hero"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Hero />
      </motion.div>
      <motion.div
        id="explore"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Arts />
      </motion.div>
      <motion.div
        id="learn"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Learn />
      </motion.div>
      <motion.div
        id="artist"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Artists />
      </motion.div>
      <motion.div
        id="exhibition"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Exhibition />
      </motion.div>
      <motion.div
        id="royalties"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* <Royalties /> */}
      </motion.div>
      <motion.div
        id="museum"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
      </motion.div>
      <Footer id="footer" />
    </>
  );
}

export default withSplashScreen(Home);
