import React, {useState} from "react";
import "./styles/Upload.css";
import Navbar from "../components/navbar/NavbarLoggedIn";

const Upload = () => {

    const [oriImg, setOriImg] = useState();
    const [img, setImg] = useState();
    const [text, setText] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        console.log(e.target.files[0].name);
        //setOriImg(file.toString());
        setOriImg(e.target.files[0].name);
        setImg(URL.createObjectURL(file));
    };

    async function onImageSubmit() {
        let url = `/api/detectText/?file=./uploaded_images/`;
        url += oriImg;
        console.log(url);
        await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        })
        .then((res) => res.json())
        .then((response) => {
            setText(response[1].description);
        })
        .catch((error) => {
            console.log("There was an error with the OCR request: ", error);
        });
    }; 

  return (
    <div className="Upload">
      <Navbar />

      <span className="Upload-title">Upload</span>
      <hr />
      <span className="Upload-description">
        Upload an image to perform image text translation
      </span>
      <div className="Upload-filecontainer">
          <img src={img}/>
      </div>

      <form action="api/image_upload" method="post" encType="multipart/form-data" onChange={onImageChange}>
        <input type="file" accept="image/*" id="myFile" name="filename"/>
        <input type="submit" value="Submit"/>
      </form>

      <button onClick={onImageSubmit}>
        Translate
      </button>

        <div>
            Text: {text}
        </div>

      

      <footer>
        <span>Lexical</span>
      </footer>
    </div>
  );
};

export default Upload;
