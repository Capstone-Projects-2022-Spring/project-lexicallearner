import React, {useState} from "react";
import Navbar from "../components/navbar/NavbarLoggedIn";
import LanguageSelect from "../components/LanguageSelect";
import "./styles/Profile.css";
import profileImg from "../images/profile.png";

const Profile = () => {
  const [show, setShow] = useState(false);

  //function editPortrait() {

  //}

  return (
    <div className="Profile">
      <Navbar />
      <section className="Portrait">
          <img className="profilepic" src={profileImg}  width="64" height="64" alt="profilepic"/>

          <button className="edit-button">
            Edit
          </button>
      </section>
      Preferred Language: <LanguageSelect />
    </div>
  );
};

export default Profile;
