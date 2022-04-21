const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

/*const options = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};*/
const options = {
    origin: ['http://localhost:3000', process.env.CORS_ORIGIN]
};
app.use(cors(options));

const filename_table = new Map();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send("CORS_ORIGIN: " + process.env.CORS_ORIGIN);
});

app.post('/api/image_upload', (req, res) => {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            //console.log(files);
            if (files.filename.mimetype.startsWith('image/')) {
                //console.log('File uploaded, path: ' + files.filename.filepath);
                let path_to_image = files.filename.filepath;

                //let newpath = './uploaded_images/' + files.filename.originalFilename;
                /*fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });*/
                filename_table.set(files.filename.originalFilename, path_to_image);
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




//detectText API call like this: https://.../api/translate/?file=...&targetLang=...    You can put a local file or a image url
app.get('/api/detectText', async (req, res) => {
    const fileName = req.query.file;
    const file_path = filename_table.get(fileName);
    const detected_json = await detectTextAndLangImg(file_path);
    const detected_text = detected_json[1].description;
    const lang = req.query.targetLang;
    const translated_text = await translateText(detected_text, lang);
    res.send(translated_text);
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
/*app.get('/api/translate', async (req, res) => {
    const oriText = req.query.text;
    const lang = req.query.targetLang;
    const text = await translateText(oriText, lang);
    res.send(text);
});*/

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