import React, {useState} from "react";
import "./styles/Upload.css";
import Navbar from "../components/navbar/NavbarLoggedIn";




const Upload = () => {

    const [oriImg, setOriImg] = useState();
    const [img, setImg] = useState();
    const [text, setText] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setOriImg(e.target.files[0].name);
        setImg(URL.createObjectURL(file));
    };

    async function onImageSubmit(filename) {
        let url = `http://localhost:5000/api/detectText/?file=./uploaded_images/`;
        url += oriImg;
        console.log(url);

            await fetch(url, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            })
                .then((res) => {
                    console.log(res);
                    res.json();})
                .then((response) => {
                    setText(response);
                })
                .catch((error) => {
                    console.log("There was an error with the OCR request: ", error);
                });
            console.log(text);
        return text;
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

      <form action="api/image_upload" method="post" encType="multipart/form-data" onChange={onImageChange} onSubmit={onImageSubmit}>
        <input type="file" accept="image/*" id="myFile" name="filename"/>
        <input type="submit"/>
      </form>
        <div>
        </div>

      <footer>
        <span>Lexical</span>
      </footer>
    </div>
  );
};

export default Upload;
