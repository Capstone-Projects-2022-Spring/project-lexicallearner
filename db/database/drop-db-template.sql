-- Template for deleting the database given by `@{database}`.

-- Enter the database, creating it if it does not exist.
CREATE DATABASE IF NOT EXISTS @{database};
USE @{database};

-- Count the tables stored in Tables_here,
-- creating the table with TABLE_NAMEs if it does not exist
CREATE TABLE IF NOT EXISTS Tables_here (
  TABLE_NAME        CHAR(0)    NOT NULL
);
SET @N_TABLES_HERE := (SELECT COUNT(*) FROM Tables_here);
SELECT @N_TABLES_HERE;

-- Clean up all tables if they already exist, and check
DROP PROCEDURE IF EXISTS drop_tables_here;
CREATE PROCEDURE drop_tables_here(IN n_tables INT)
BEGIN
  -- index of the tables
  DECLARE   k   INT   DEFAULT 0;
  -- for each table (ordered by descending)
  WHILE (k < n_tables) DO
    -- Concatenate the drop statement
    SET @expression := (
      SELECT CONCAT('DROP TABLE IF EXISTS ', TABLE_NAME, ';')
        FROM Tables_here ORDER BY tid DESC LIMIT k, 1
    );
    SELECT @expression;
    -- Create the statement
    PREPARE stmt FROM @expression;
    -- -- Perform the statement
    EXECUTE stmt;
    -- increment the counter
    SET k := k + 1;
  END WHILE; -- WHILE (k <= n_tables)
END; -- PROCEDURE drop_tables_here()
CALL drop_tables_here((@N_TABLES_HERE));
DROP PROCEDURE drop_tables_here;

-- Finally remove Tables_here, which lists the other tables
DROP TABLE IF EXISTS Tables_here;

-- Check the table
SHOW TABLES;

-- Now remove the database, and check
DROP DATABASE @{database};
SHOW DATABASES;