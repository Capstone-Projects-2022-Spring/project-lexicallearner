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









app.use(express.json());


app.get('/api/detectText', async (req, res) => {
  const text = await detectAndTranslateImg();
  res.send(text);
});

app.get('/api/books/:file', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));

  if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
  res.send(book);
});

//CREATE Request Handler
app.post('/api/books', (req, res)=> {

  const { error } = validateBook(req.body);
  if (error){
    res.status(400).send(error.details[0].message)
    return;
  }
  const book = {
    id: books.length + 1,
    title: req.body.title
  };
  books.push(book);
  res.send(book);
});

//UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
  const book = books.find(c=> c.id === parseInt(req.params.id));
  if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

  const { error } = validateBook(req.body);
  if (error){
    res.status(400).send(error.details[0].message);
    return;
  }

  book.title = req.body.title;
  res.send(book);
});

//DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {

  const book = books.find( c=> c.id === parseInt(req.params.id));
  if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

  const index = books.indexOf(book);
  books.splice(index,1);

  res.send(book);
});


async function detectAndTranslateImg(fileNAme) {
  const vision = require('@google-cloud/vision');

// Creates a client
  const client = new vision.ImageAnnotatorClient();
  const fileName = '.\\wakeupcat.jpg';

// Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  detections.forEach(text => console.log(text));
  return detections;
}
