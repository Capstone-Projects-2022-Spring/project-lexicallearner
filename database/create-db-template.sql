-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist.
IF NOT EXISTS @{database} THEN
  CREATE DATABASE @{database};
  SELECT 'Created @{database}.';
ELSE
  SELECT '@{database} already exists.';
END IF; -- NOT EXISTS @{database} ELSE
