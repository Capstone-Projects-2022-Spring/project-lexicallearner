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

/**
 * Execute the MySQL script at the given file, which is filled in with
 * the given template variables, performing given the callback on the
 * error and response returned.
 * @param file : string = name of a file containing a script to execute
 * @param template_variables : [{string: string}] = objects, each of
 *    which contain a 'key' key to replace and a 'value' key with which
 *    to replace
 * @param callback : (err, res) => undefined = callback function to
 *    which to message the error and response of executing the script
 */
function runMySqlScript(file, template_variables, callback) {
  /* default template variables if no callback */
  if (!callback) {
    callback = template_variables;
    template_variables = [];
  }
  /* test whether it works */
  startDb((connection, database) => {
    /* read the template file */
    fs.readFile(file, 'utf8', (err, res) => {
      /* if any errors */
      if (err) {
        /* cascade the error */
        throw err;
      } /* end if (err) */

      /* the augmented template variables */
      const AUG_TMP_VARS = [
        {
          "key": "@\{database\}",
          "value": database
        },
        ...template_variables
      ];
      /* fill in the template */
      const SQL_SCRIPT = fillInTemplate(res, AUG_TMP_VARS);

      /* log the script */
      console.log(`===Executing ${file}===`);
      console.log(SQL_SCRIPT);
      /* execute the script */
      connection.query(SQL_SCRIPT, [], callback);

      /* terminate the connection */
      connection.end();
      console.log('Connection terminated');
    }); /* end callback fs.readFile */
  }); /* end callback startDb */
} /* end function runMySqlScript(file) */

/**
 * Fills in a template using the template variables given.
 * @param template : string = to fill
 * @param template_variables : [{string: string}] = objects, each of
 *    which contain a 'key' key to replace and a 'value' key with which
 *    to replace
 */
function fillInTemplate(template, template_variables) {
  /* get the original template */
  let result = template;
  /* fill in the template for each template variable */
  for (const TMP_VAR of template_variables) {
    /* create a global replacement pattern */
    const PATTERN = new RegExp(TMP_VAR.key, 'g');
    result = result.replace(PATTERN, TMP_VAR.value);
  } /* next TMP_VAR */
  return result;
} /* end function fillInTemplate(template, template_variables) */

/* export the program */
module.exports = runMySqlScript;
