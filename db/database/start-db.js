#!/usr/bin/env node
/**
 * Starts the database.
 * @param callback : (mysqld.Connection, string) = accepts a
 *    mysqld.Connection and database name after the connection is
 *    established
 * @throws if error reading password file or connecting to database
 */

/* imports */
/* for reading files */
const fs = require('fs');
/* for the MySQL driver */
const mysqld = require('mysql2');

/* constants */
const PASSWORD_FILE = 'db-login.json';  /* contains the login information */
const NOOP = (() => {});                /* no-op stub method */

function main(callback) {
  /* default to no-op */
  callback = (callback || NOOP);

  /* read the password file */
  fs.readFile(PASSWORD_FILE, 'utf8', (err, res) => {
    /* if any errors */
    if (err) {
      /* cascade the error */
      throw err;
    } /* end if (err) */

    /* parse the response */
    const LOGINS = JSON.parse(res);

    /* for each log-in information */
    for (const LOGIN of LOGINS) {
      /* connect to database corresponding to LOGIN */
      connectDb(LOGIN, callback);
    } /* next LOGIN */
  }); /* end callback fs.readFile */
} /* end function main() */

/**
 * Connects to the database specified by the login function and calls
 * the callback on the mysqld.Connection established thereby.
 * @param login : object = login information
 * @param callback : function = function to call on the established
 *    connection
 * @throws if error connecting to database
 */
function connectDb(login, callback) {
  /* allow executing an entire SQL script */
  const connection_options = {
    ...login.connection,
    ...{multipleStatements: true}
  };
  /* create and use the connection */
  const CONNECTION = mysqld.createConnection(connection_options);
  console.log('connecting to database . . .');
  CONNECTION.connect((err) => {
    /* if any errors */
    if (err) {
      /* cascade the error */
      throw err;
    } /* end if (err) */

    /* apply the callback */
    console.log('Connection established.');
    callback(CONNECTION, login.database);
  }); /* end callback CONNECTION.connect */
} /* end function connectDb(login) */

/* if main module */
if (require.main === module) {
  /* run the program */
  main();
} /* end if (require.main === module) */
else {
  /* otherwise, export the program */
  module.exports = main;
} /* end if (require.main === module) else */
