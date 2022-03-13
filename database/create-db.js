#!/usr/bin/env node
/**
 * Builds the database.
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for starting the database */
const startDb = require('./start-db');

/* constants */
/* template for creating database */
const TEMPLATE_FILE = 'create-db-template.sql';

/* test whether it works */
startDb((connection, database) => {
  /* read the template file */
  fs.readFile(TEMPLATE_FILE, 'utf8', (err, res) => {
    /* if any errors */
    if (err) {
      /* cascade the error */
      throw err;
    } /* end if (err) */

    /* fill in the template */
    const SQL_SCRIPT = res.replace(/@\{database\}/g, database);
    for (const LINE of SQL_SCRIPT.split(';')) {
      /* log the line */
      console.log('Executing: ', LINE);
      connection.query(LINE, [], (err, res) => {
        /* if any errors */
        if (err) {
          /* cascade the error */
          throw err;
        } /* end if (err) */

        /* log the response */
        console.log(res);
      });
    } /* next LINE */
  }); /* end callback fs.readFile */
}); /* end callback startDb */
