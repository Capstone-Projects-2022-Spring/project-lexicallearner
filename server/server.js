const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.post('/image_upload', (req, res) => {
  var filename = "";
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(files);
    if (files.filename.mimetype.startsWith('image/')) {
      console.log('File uploaded, path: ' + files.filename.filepath);
      var oldpath = files.filename.filepath;
      var newpath = './uploaded_images/' + files.filename.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
    } else {
      console.log("File is not an image");
    }
    res.redirect("/upload");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));