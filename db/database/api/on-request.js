#!/usr/bin/env node
/**
 */

/* imports */
/* for accepting requests */
const express = require('express');
/* for parsing requests */
const bodyParser = require('body-parser');
/* for reading files */
const fs = require('fs');

/* file containing the request types */
const REQUESTS_FILE = 'requests.json';
/* request methods */
const METHODS = ['post'];
/* whether the encoding type for the forms is extended */
const IS_ENCTYPE_EXTENDED = false;
/* port for the app to listen to */
const LISTEN_PORT = 8081;

fs.readFile(REQUESTS_FILE, 'utf8', (err, requests_res) => {
  /* if any errors */
  if (err) {
    /* cascade the error */
    throw err;
  } /* end if (err) */

  /* parse the requests read */
  const REQUEST_TYPES = JSON.parse(requests_res);

  /* create the application */
  const APP = express();
  /* parser for form encoding type */
  const enctype = bodyParser.urlencoded({ extended: IS_ENCTYPE_EXTENDED });

  /* for each valid method of request */
  for (const METHOD of METHODS) {
    /* add reply to all requests of that METHOD in REQUEST_TYPES */
    for (const REQUEST_TYPE of REQUEST_TYPES[METHOD]) {
      APP[METHOD](REQUEST_TYPE.action, enctype, (req, res) => {
        /* print the corresponding variable in the received request
         * body */
        for (const TMP_VAR of REQUEST_TYPE['template variables']) {
          /* build and print the entry */
          const ENTRY = {};
          ENTRY[TMP_VAR.name] = req.body[TMP_VAR.name];
          console.log(ENTRY);
        } /* next TMP_VAR */
        /* send a response */
        res.send('OK!');
      }); /* end callback APP[METHOD] */
    } /* next REQUEST_TYPE */
  } /* next METHOD */

  /* listen to port 8081 */
  const SERVER = APP.listen(LISTEN_PORT, () => {
    /* get the host and port */
    const HOST = SERVER.address().address;
    const PORT = SERVER.address().port;
    console.log(`listening to https://${HOST}:${PORT}`);
  }); /* end callback APP.listen */
}); /* end callback fs.readFile */
