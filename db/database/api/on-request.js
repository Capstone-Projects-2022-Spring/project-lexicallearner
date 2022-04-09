#!/usr/bin/env node
/**
 * Creates a server that accepts all requests in the REQUESTS_FILE and
 * responds accordingly.
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for accepting requests */
const express = require('express');
/* for parsing requests */
const bodyParser = require('body-parser');
/* for escaping all template values */
const sqlstring = require('sqlstring');
/* random string generator used for salting */
const csprng = require('csprng');
/* for hashing password-like values */
const sha2 = require('sha2');
/* for starting the database */
const runMySqlScript = require('../run-mysql-script');

/* file containing the request types */
const REQUESTS_FILE = 'requests.json';
/* request methods */
const METHODS = 'post,get'.split(',');
/* functions for processing template values */
const VALUE_PROCESSES = 'salt,hash'.split(',');

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
        /* template variable entries */
        const ENTRIES = [];
        /* template variables */
        const TMP_VARS = REQUEST_TYPE['template variables']

        /* add all case-specific script variables */
        for (const SCRIPT of REQUEST_TYPE.scripts) {
          /* if switch is true, always run */
          let shouldRun = (true===SCRIPT['switch']);
          /* otherwise, check whether the switch gives this case */
          shouldRun = (shouldRun
            || SCRIPT['switch']
              && (req.body[SCRIPT['switch']]===SCRIPT['case']));
          /* in either case, if the script has template variables */
          console.log((true===SCRIPT['switch']), SCRIPT['switch'], (req.body[SCRIPT['switch']]===SCRIPT['case']), 'template variables' in SCRIPT);
          if (shouldRun && ('template variables' in SCRIPT)) {
            /* push each onto TMP_VARS */
            Array.prototype.push.apply(TMP_VARS, SCRIPT['template variables']);
          } /* end if (shouldRun) */
        } /* next SCRIPT */

        /* for each template variable */
        for (const TMP_VAR of TMP_VARS) {
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
            const PATTERN = new RegExp(REQUEST_TYPES.schema[KEY].regexp);
            /* test VALUE against PATTERN */
            if (!PATTERN.test(VALUE)) {
              res.send(`Illegal value for '${KEY}': '${VALUE}'.`);
              return;
            } /* end if (!PATTERN.test(VALUE)) */

            /* parse and set the value */
            ENTRY.value = VALUE;
          } /* end if ('value' in TMP_VAR) || */

          /* process the value */
          if ('processes' in REQUEST_TYPES.schema[KEY]) {
            for (const PROCESS of REQUEST_TYPES.schema[KEY].processes) {
              console.log(PROCESS);
              /* check if the template variable includes this process */
              if ('salt'===PROCESS) {
                /* salt the value */
                const SALT_AND_VALUE = saltValue(ENTRY.value);
                //SALT_AND_VALUE[0] = 'SALT';
                /* entry for the salt */
                const SALT_ENTRY = {};
                /* save the salt and salted value */
                SALT_ENTRY.key = `@\{${KEY}Salt\}`;
                SALT_ENTRY.value = sqlstring.escape(SALT_AND_VALUE[0]);
                ENTRIES.push(SALT_ENTRY);
                ENTRY.value = SALT_AND_VALUE[1];
              } /* end if ('salt'===PROCESS) */
              else if ('hash'===PROCESS) {
                ENTRY.value = sha2.sha512(ENTRY.value);
              } /* end if ('salt'===PROCESS) || ('hash'===PROCESS) */
            } /* next PROCESS */
          } /* end if ('processes' in REQUEST_TYPES.schema[KEY]) */

          /* put in the ENTRY key */
          ENTRY.key = `@\{${KEY}\}`;
          /* escape the ENTRY value */
          ENTRY.value = sqlstring.escape(ENTRY.value);
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
            || SCRIPT['switch']
              && (req.body[SCRIPT['switch']]===SCRIPT['case']));
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

/**
 * Calculates a random string for prepending values and applies it to
 * the given value.
 */
function saltValue(value) {
  /* use at least 8 words of 64-bit length as SHA512 does */
  const RANDBYTES = csprng(8*64, 16);
  /* split into digit pair bytes */
  const SPLIT = RANDBYTES.match(/.{2}/g);
  /* convert each digit pair into an integers */
  const INTS = SPLIT.map((s) => parseInt(s, 16));
  /* convert each integer into an ASCII character */
  const CHARS = INTS.map((b) => String.fromCharCode(b));
  /* join into a salt */
  const SALT = CHARS.join('');
  /* apply salt to the value */
  const SALTED_VALUE = [ SALT, value ].join('');
  return [ SALT, SALTED_VALUE ];
} /* end function randSalt(acc, value) */
