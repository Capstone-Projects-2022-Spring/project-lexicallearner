// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const text = 'The text for which to detect language, e.g. Hello, world!';

// Detects the language. "text" can be a string for detecting the language of
// a single piece of text, or an array of strings for detecting the languages
// of multiple texts.
async function detectLanguage() {
    let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    console.log('Detections:');
    detections.forEach(detection => {
        console.log(`${detection.input} => ${detection.language}`);
    });
}

detectLanguage();