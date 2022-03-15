import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <ul>
        <Link to='/' className="logo">
          <li>
            <span>Lexical</span>
          </li>
        </Link>
      </ul>
      <ul>
        <li>
          <Link to="/login" className="login">Login</Link>
          <Link to="/register" className="register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
