import React, {useState} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
const NavbarLoggedIn = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);


  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  
  
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
      <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        
        <Link to="/homeLoggedIn"> Dashboard </Link>
        {dropdown && <Dropdown />}
        </li>
        <li>
        <Link to="/upload">Upload</Link>
        </li>
        <li>
        <Link to="/profile">Profile</Link>
        </li>
        <li>
        <Link to='/'>Log Out</Link>
        </li>
      
    </ul>
  </div>
  );
};

export default NavbarLoggedIn;
