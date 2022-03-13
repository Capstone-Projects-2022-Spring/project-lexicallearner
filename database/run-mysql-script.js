/**
 * Runs a given MySQL script template file.
 * @param file : string = name of the script file
 * @param callback : (err, res)=>undefined = callback function for
 *    queries executed from the script
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for starting the database */
const startDb = require('./start-db');

function runMySqlScript(file, callback) {
  /* test whether it works */
  startDb((connection, database) => {
    /* read the template file */
    fs.readFile(file, 'utf8', (err, res) => {
      /* if any errors */
      if (err) {
        /* cascade the error */
        throw err;
      } /* end if (err) */

      /* fill in the template */
      const SQL_SCRIPT = res.replace(/@\{database\}/g, database);
      for (const LINE of SQL_SCRIPT.split(';')) {
        /* remove whitespace from commands */
        const COMMAND = LINE.trim();
        /* if empty, skip the command */
        if (COMMAND==='') continue;
        /* log the line */
        console.log('Executing: ', COMMAND);
        connection.query(LINE, [], callback);
      } /* next LINE */

      /* terminate the connection */
      connection.end();
      console.log('Connection terminated');
    }); /* end callback fs.readFile */
  }); /* end callback startDb */
} /* end function runMySqlScript(file) */

/* export the program */
module.exports = runMySqlScript;
