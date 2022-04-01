#!/usr/bin/env node
/**
 * Builds the database.
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for starting the database */
const runMySqlScript = require('./run-mysql-script');

/* constants */
/* template for creating database */
const TEMPLATE_FILE = 'create-db-template.sql';

runMySqlScript(TEMPLATE_FILE, (err, res) => {
  /* if any errors */
  if (err) {
    /* cascade the error */
    throw err;
  } /* end if (err) */

  /* log the response */
  console.log(res);
}) /* end callback runMySqlScript */;
