import React, {useState} from "react";
import Navbar from "../components/navbar/NavbarLoggedIn";
import LanguageSelect from "../components/LanguageSelect";
import "./styles/Profile.css";

const Profile = () => {
  const [show, setShow] = useState(false);

  //function editPortrait() {

  //}

  return (
    <div className="Profile">
      <Navbar />
      <section className="Portrait">
          <img id="profilepic" src=""  width="170" height="170" alt="profilepic"/>

          <button>
            Edit
          </button>
      </section>
      Preferred Language: <LanguageSelect />
    </div>
  );
};

export default Profile;
