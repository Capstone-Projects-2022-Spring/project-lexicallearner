import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Navbar />
      <section className="classrooms">
        <div className="classroom" onclick="location.href='#';">
          Classroom 1
        </div>
        <div className="classroom" onclick="location.href='#';">
          Classroom 2
        </div>
        <div className="classroom" onclick="location.href='#';">
          Classroom 3
        </div>
      </section>
      <footer>
        <span>Lexical</span>
      </footer>
    </div>
  );
};

export default Dashboard;
