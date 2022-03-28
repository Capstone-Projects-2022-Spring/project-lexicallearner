async function detectAndTranslate(text, targetLang) {
    // Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate').v2;

    // Creates the Client
    const translate = new Translate();
    // Gets the original language's text
    let [detection] = await translate.detect(text);
    // Translate the text to the target language
    let translation = await translate.translate(text, targetLang);

    return {
        targetLang: targetLang,
        oriText: text,
        oriLang: detection.language,
        targetText: translation
    };
}
/*
    IMPORTANT!!! Anything calling detectAndTranslate(...) must do so asynchronously
    otherwise it will likely return undefined, so use async and await
 */

