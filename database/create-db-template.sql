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

-- Create the Profile table
CREATE TABLE Profile (
  pfid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acid      INT         NOT NULL                FOREIGN KEY,
  pfLevel   INT         NOT NULL,
  score     INT         NOT NULL
);

-- Create the Lesson table
CREATE TABLE Lesson (
  lsid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pfid      INT         NOT NULL                FOREIGN KEY,
  lsLevel   INT         NOT NULL,
);
