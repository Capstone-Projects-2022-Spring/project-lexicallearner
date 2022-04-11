const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api/image_upload', (req, res) => {
    try {
        let filename = "";
        const form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            console.log(files);
            if (files.filename.mimetype.startsWith('image/')) {
                console.log('File uploaded, path: ' + files.filename.filepath);
                let oldpath = files.filename.filepath;

                let newpath = './uploaded_images/' + files.filename.originalFilename;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });
            } else {
                console.log("File is not an image");
            }
            res.status(204).send();
            //res.redirect("/upload");
        });
    } catch (e) {
        console.log(e.toString());
    }
});




//detectText API call like this: https://.../api/translate/?file=...    You can put a local file or a image url
app.get('/api/detectText', async (req, res) => {
    const fileName = req.query.file;
    const text = await detectTextAndLangImg(fileName);
    res.send(text);
});

// TODO extract text from the JSON a JSON that contains the original text "locale" (ie detected language) and translated text (add target lang to params)
async function detectTextAndLangImg(fileName) {
    try {
        const vision = require('@google-cloud/vision');

// Creates a client
        //make sure that the API JSON file is in the project and set
        const client = new vision.ImageAnnotatorClient();

// Performs text detection on the local file
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations;
        detections.forEach(text => console.log(text));

        return detections;
    } catch (e) {
        return e.toString();
    }
}

// Translate API call like this: https://.../api/translate/?text=...&targetLang=...     put in the text you want to translate and the language code that your translating to
app.get('/api/translate', async (req, res) => {
    const oriText = req.query.text;
    const lang = req.query.targetLang;
    const text = await translateText(oriText, lang);
    res.send(text);
});

async function translateText(oriText, targetLang) {
    try {
        // Imports the Google Cloud client library
        const {Translate} = require('@google-cloud/translate').v2;
        // Instantiates a client
        const translate = new Translate();

        const [translation] = await translate.translate(oriText, targetLang);
        //returns a string of the translate text not json
        return translation;
    } catch (e) {
        return e.toString();
    }
}