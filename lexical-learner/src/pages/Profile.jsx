import React, {useState} from "react";
import Navbar from "../components/navbar/Navbar";
import * as BsIcons from "react-icons/bs";
import "./Profile.css";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [show, setShow] = useState(false);

  function editPortrait() {

  }

  return (
    <div className="Profile">
      <Navbar />
      <section className="Portrait">
          <img id="profilepic" src=""  width="170" height="170" alt="profilepic"/>

          <Button>
            Edit
          </Button>
      </section>
    </div>
  );
};

export default Profile;
