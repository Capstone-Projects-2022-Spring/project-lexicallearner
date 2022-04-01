#!/usr/bin/env node
/**
 */

/* imports */
/* for accepting requests */
const express = require('express');

/* create the application */
const APP = express();

/* add reply to POST requests to /create-account/ */
APP.post('/create-account/', function (req, res) {
  console.log('Received request to create an account.');
  res.send('OK!');
}); /* end callback APP.post */

/* listen to port 8081 */
const SERVER = APP.listen(8081, function () {
  /* get the host and port */
  const HOST = SERVER.address().address;
  const PORT = SERVER.address().port;
  console.log(`listening to https://${HOST}:${PORT}`);
}); /* end callback APP.listen */