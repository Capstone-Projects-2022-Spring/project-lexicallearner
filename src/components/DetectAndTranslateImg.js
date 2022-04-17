async function detectAndTranslateImg() {
    const vision = require('@google-cloud/vision');

// Creates a client
    const client = new vision.ImageAnnotatorClient();


const fileName = '..\\wakeupcat.jpg';

// Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
}

detectAndTranslateImg()