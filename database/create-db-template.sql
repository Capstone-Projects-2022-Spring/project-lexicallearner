-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist, and check.
CREATE DATABASE IF NOT EXISTS @{database};
SHOW DATABASES;

-- Enter the database
USE @{database};

-- Create the Accounts table
CREATE TABLE Account (
  acid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  password  VARCHAR(40) NOT NULL
);