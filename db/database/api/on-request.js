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
/* converts values to the proper type */
const VALUE_TYPER = {
  "String": (value) => `'${value}'`,
  "Int": (value) => parseInt(value),
  "Float": (value) => parseFloat(value),
  "Boolean": (value) => ('true'===value),
};

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
    if (!REQUEST_TYPES.methods[METHOD]) {
      continue;
    } /* end if (!REQUEST_TYPES[METHOD]) */
    /* add reply to all requests of that METHOD in REQUEST_TYPES.methods */
    for (const REQUEST_TYPE of REQUEST_TYPES.methods[METHOD]) {
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
            const PATTERN = new RegExp(REQUEST_TYPES.schemas[KEY].regexp);
            /* test VALUE against PATTERN */
            if (!PATTERN.test(VALUE)) {
              res.send(`Illegal value for '${KEY}': '${VALUE}'.`);
              return;
            } /* end if (!PATTERN.test(VALUE)) */

            /* parse and set the value */
            const TYPE = REQUEST_TYPES.schemas[KEY].type;
            /* error if type does not exist */
            if (!(TYPE in VALUE_TYPER)) {
              res.send(`Unknown type for '${KEY}': '${TYPE}'.`);
              return;
            } /* end if (!(TYPE in VALUE_TYPER)) */
            ENTRY.value = VALUE_TYPER[TYPE](VALUE);
          } /* end if ('value' in TMP_VAR) || */

          /* put in the ENTRY key */
          ENTRY.key = `@\{${KEY}\}`;
          /* add to entries */
          ENTRIES.push(ENTRY);
        } /* next TMP_VAR */

        /* print the entries */
        console.log(ENTRIES);
        /* run each script on the ENTRIES */
        for (const SCRIPT of REQUEST_TYPE.scripts) {
          /* if switch is true, always run */
          let shouldRun = (true===SCRIPT['switch']);
          /* otherwise, check whether the switch gives this case */
          shouldRun = (shouldRun
            || (req.body[SCRIPT['switch']]===SCRIPT['case']));
          /* if either case */
          if (shouldRun) {
            /* run the script at each path */
            for (const PATH of SCRIPT.paths) {
              runMySqlScript(PATH, ENTRIES, (err, res) => {
                /* if any errors */
                if (err) {
                  /* cascade the error */
                  throw err;
                } /* end if (err) */

                /* log the response */
                console.log(res);
              }); /* end callback runMySqlScript */
            } /* next PATH */
          } /* end if (shouldRun) */
        } /* next SCRIPT */

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
