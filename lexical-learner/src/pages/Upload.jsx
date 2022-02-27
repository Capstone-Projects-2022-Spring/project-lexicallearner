import React from 'react'
import './Upload.css'

const Upload = () => {
  return (
    <div className='Upload'>
      <span className="Upload-title">Upload</span>
      <hr />
      <span className="Upload-description">
        Upload an image to perform image text translation
      </span>
      <div className="Upload-filecontainer"></div>

      <form action="/action_page.php">
        <input type="file" id="myFile" name="filename" />
        <input type="submit" />
      </form>

    </div>
  )
}

export default Upload