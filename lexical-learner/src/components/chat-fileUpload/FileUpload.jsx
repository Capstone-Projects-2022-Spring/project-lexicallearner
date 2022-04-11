import React from "react";
import * as BsIcons from "react-icons/bs";
import "./fileUpload.css";

const FileUpload = (props) => {
  const uploadFile = (e) => {
    document.getElementById("file").click();
  };

  const uploadingFile = (e, files) => {
    console.log(files[0]);
    let reader = new FileReader();
    reader.onload = () => {
      //strb64 = reader.result.replace("data:", "").replace(/^.+,/, "");
      props.send(e, reader.result, "img");
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="fileUpload">
      <button onClick={uploadFile}>
        <BsIcons.BsFolder2 style={{ width: "25px", height: "25px" }} />
      </button>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        onChange={(e) => {
          uploadingFile(e, e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default FileUpload;
