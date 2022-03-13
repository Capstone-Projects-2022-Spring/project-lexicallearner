/**
 * Starts the database.
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for the MySQL driver */
const mysqld = require('mysql2');

/* constants */
const PASSWORD_FILE = 'db-login.json';  /* contains the login information */

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

    /* parse the response */
    const LOGINS = JSON.parse(res);

    /* for each log-in information */
    for (const LOGIN of LOGINS) {
      connectDb(LOGIN);
    } /* for (const LOGIN of LOGINS) */
  }); /* end callback fs.readFile */
} /* end function main() */

function connectDb(login) {
  /* create and use the connection */
  const CONNECTION = mysqld.createConnection(login);
  console.log('connecting to database . . .');
  CONNECTION.connect((err) => {
    /* if any errors */
    if (err) {
      /* log the error */
      console.error(err);
      /* cascade the error */
      throw err;
    } /* end if (err) */
    console.log('connection established . . .');
  }); /* end callback CONNECTION.connect */
} /* end function connectDb(login) */

/* run the program */
main();
