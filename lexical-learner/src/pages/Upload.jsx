import React from "react";
import "./styles/Upload.css";
import Navbar from "../components/navbar/NavbarLoggedIn";

const Upload = () => {
  return (
    <div className="Upload">
      <Navbar />
      
      <span className="Upload-title">Upload</span>
      <hr />
      <span className="Upload-description">
        Upload an image to perform image text translation
      </span>
      <div className="Upload-filecontainer"></div>

      <form action="">
        <input type="file" id="myFile" name="filename" />
        <input type="submit" />
      </form>

      <footer>
        <span>Lexical</span>
      </footer>
    </div>
  );
};

export default Upload;
