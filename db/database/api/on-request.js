#!/usr/bin/env node
/**
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for accepting requests */
const express = require('express');
/* for parsing requests */
const bodyParser = require('body-parser');
/* for starting the database */
const runMySqlScript = require('../run-mysql-script');

/* file containing the request types */
const REQUESTS_FILE = 'requests.json';
/* request methods */
const METHODS = 'post,get'.split(',');
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
    /* if no request types of that method, skip to next method */
    if (!REQUEST_TYPES[METHOD]) {
      continue;
    } /* end if (!REQUEST_TYPES[METHOD]) */
    /* add reply to all requests of that METHOD in REQUEST_TYPES */
    for (const REQUEST_TYPE of REQUEST_TYPES[METHOD]) {
      APP[METHOD](REQUEST_TYPE.action, enctype, (req, res) => {
        const ENTRIES = [];

        /* for each template variable */
        for (const TMP_VAR of REQUEST_TYPE['template variables']) {
          /* store the name of the template variable */
          const KEY = TMP_VAR.name;
          /* store the value from the request body */
          const VALUE = req.body[KEY];
          /* build and print the entry */
          const ENTRY = {};

          /* if the template variable has a value, use that value */
          if ('value' in TMP_VAR) {
            ENTRY.value = TMP_VAR.value;
          } /* if ('value' in TMP_VAR) */

          /* otherwise validate VALUE */
          else {
            /* create the template variable's regular expression */
            const PATTERN = new RegExp(TMP_VAR.regexp);
            /* test VALUE against PATTERN */
            if (!PATTERN.test(VALUE)) {
              res.send(`Illegal value for '${KEY}': '${VALUE}'.`);
              return;
            } /* end if (!PATTERN.test(VALUE)) */

            /* parse and set the value */
            const TYPE = TMP_VAR.type;
            switch (TYPE) {
              case 'String':
                ENTRY.value = `'${VALUE}'`;
              break;
              case 'Int':
                ENTRY.value = praseInt(VALUE);
              break;
              case 'Float':
                ENTRY.value = praseFloat(VALUE);
              break;
              case 'Boolean':
                ENTRY.value = (true === VALUE);
              break;
              default:
                res.send(`Unknown type for '${KEY}': '${TYPE}'.`);
                return;
              break;
            } /* const TYPE = TMP_VAR.type; */
          } /* end if ('value' in TMP_VAR) || */

          /* put in the ENTRY key */
          ENTRY.key = `@\{${KEY}\}`;
          /* add to entries */
          ENTRIES.push(ENTRY);
        } /* next TMP_VAR */

        /* run the script on the ENTRIES */
        runMySqlScript(REQUEST_TYPE.script, ENTRIES, (err, res) => {
          /* if any errors */
          if (err) {
            /* cascade the error */
            throw err;
          } /* end if (err) */

          /* log the response */
          console.log(res);
        }); /* end callback runMySqlScript */

        /* send a response to UA */
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
