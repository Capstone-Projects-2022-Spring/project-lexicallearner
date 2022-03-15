import React from "react";
import Navbar from "../components/navbar/NavbarLoggedIn";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="Dashboard">
      <Navbar />
      <section className="classrooms">
        <div className="classroom" onclick= {navigate("/Classroom")}>
          Classroom 1
        </div>
        <p> <button onClick={() => navigate("/classroom")}>Check Class 1</button> </p>
        <div className="classroom" onclick="location.href='/Classroom';">
          Classroom 2
        </div>
        <p> <button onClick={() => navigate("/classroom")}>Check Class 2</button> </p>
        <div className="classroom" onclick="location.href='/Classroom';">
          Classroom 3
        </div>
        <p> <button onClick={() => navigate("/classroom")}>Check Class 3</button> </p>
      </section>
      <footer>
        <span>Lexical Learner</span>
      </footer>
    </div>
  );
};
const SAMPLE_CLASSROOM = [
  {
    class_id: 1,
    name: 'Spanish Class',
  },
  {
    class_id: 2,
    name: 'German Class',
  
  },
  {
    class_id: 3,
    name: 'Russian Class',
  }
]
export default Dashboard;
