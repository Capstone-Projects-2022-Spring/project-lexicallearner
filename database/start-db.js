/**
 * Starts the database.
 */

/* imports */
/* for reading files */
const fs = require('fs');

/* constants */
const PASSWORD_FILE = 'password';

function main() {
  /* read the password file */
  fs.readFile(PASSWORD_FILE, 'utf8', (err, res) => {
    /* if any errors */
    if (err) {
      /* log the error */
      console.error(err);
      /* cascade the error */
      throw err;
    } /* end if (err) */

    /* log the response */
    console.log(res);
  }); /* end fs.readFile */
} /* end function main() */

/* run the program */
main();
