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
    /* fill in the template */
    const SQL_SCRIPT = res.replace(/@\{database\}/g, database);
    /* print the resulting script */
    console.log(SQL_SCRIPT);
  }); /* end callback fs.readFile */
}); /* end callback startDb */
