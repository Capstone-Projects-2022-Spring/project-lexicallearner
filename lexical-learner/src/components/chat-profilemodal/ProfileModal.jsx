import React from "react";
import "./profileModal.css";

const ProfileModal = (props) => {
  return (
    <div
      className={
        props.profilemodal ? "profileModal profileModal-active" : "profileModal"
      }
    >
      <span className="profileModal-title">Profile</span> <br />
      <hr />
      <span>Username: {props.username}</span>
      <br /><br /><br /><br /><br /><br />
      <hr />
      <span>More Updates Soon...</span>
    </div>
  );
};

export default ProfileModal;
