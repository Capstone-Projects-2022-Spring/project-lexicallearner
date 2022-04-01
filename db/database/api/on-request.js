#!/usr/bin/env node
/**
 */

/* imports */
/* for accepting requests */
const express = require('express');
/* for parsing requests */
const bodyParser = require('body-parser');

/* whether the encoding type for the forms is extended */
const IS_ENCTYPE_EXTENDED = false;
/* port for the app to listen to */
const LISTEN_PORT = 8081;

/* create the application */
const APP = express();
/* parser for form encoding type */
const enctype = bodyParser.urlencoded({ extended: IS_ENCTYPE_EXTENDED });
/* add reply to POST requests to /create-account/ */
APP.post('/create-account/', enctype, (req, res) => {
  console.log('Received request to create an account.');
  console.log(req.body['user-email']);
  console.log(req.body['user-name']);
  console.log(req.body['user-type']);
  console.log(req.body['user-image']);
  console.log(req.body['preferred-language']);
  console.log(req.body['style-sheet']);
  console.log(req.body['level']);
  console.log(req.body['score']);
  res.send('OK!');
}); /* end callback APP.post */

/* listen to port 8081 */
const SERVER = APP.listen(LISTEN_PORT, () => {
  /* get the host and port */
  const HOST = SERVER.address().address;
  const PORT = SERVER.address().port;
  console.log(`listening to https://${HOST}:${PORT}`);
}); /* end callback APP.listen */