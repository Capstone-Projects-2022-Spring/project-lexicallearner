import React from "react";
import Navbar from "../components/navbar/Navbar";
import * as BsIcons from "react-icons/bs";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <section className="intro">
        <BsIcons.BsChatSquareTextFill
          style={{ fontSize: "7rem", color: "black" }}
        />
        <div className="intro-aside">
          <span>
            A Real Time <br /> 
            Web Chat + Text Translation
          </span>
          <span>
            ==================
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;
