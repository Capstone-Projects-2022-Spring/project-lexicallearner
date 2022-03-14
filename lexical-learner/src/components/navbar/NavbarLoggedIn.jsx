import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavbarLoggedIn = () => {
  return (
    <div className="Navbar">
      <ul>
        <Link to='/homeLoggedIn' className="logo">
          <li>
            <span>Lexical</span>
          </li>
        </Link>
      </ul>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/profile">Profile</Link>
          <Link to='/'>Log Out</Link>
          
        </li>
      </ul>
    </div>
  );
};

export default NavbarLoggedIn;
