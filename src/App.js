import { Helmet } from "react-helmet";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import withSplashScreen from "./components/withSplashScreen";

function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="..."
          crossOrigin="anonymous"
        />

        <script src="https://cdn.tailwindcss.com"></script>
      </Helmet>
    </>
  );
}

export default withSplashScreen(App);
