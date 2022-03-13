/**
 * Runs a given MySQL script file.
 * @param file : string = name of the script file
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for starting the database */
const startDb = require('./start-db');

function runMySqlScript(file) {
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
} /* end function runMySqlScript(file) */

/* export the program */
module.exports = runMySqlScript;
