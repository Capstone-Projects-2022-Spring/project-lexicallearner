-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist, and check.
CREATE DATABASE IF NOT EXISTS @{database};
SHOW DATABASES;

-- Enter the database
USE @{database};

-- Create the Accounts entity table
CREATE TABLE Account (
  acid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  password  VARCHAR(40) NOT NULL
);

-- Create the Profile entity table
CREATE TABLE Profile (
  pfid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  acid      INT         NOT NULL                FOREIGN KEY,
  pfLevel   INT         NOT NULL,
  score     INT         NOT NULL
);

-- Create the Lesson entity table
CREATE TABLE Lesson (
  lsid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pfid      INT         NOT NULL                FOREIGN KEY,
  lsLevel   INT         NOT NULL
);

-- Create the Question entity table
CREATE TABLE Question (
  qsid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  lsid      INT         NOT NULL                FOREIGN KEY,
  qsItid    INT         NOT NULL                FOREIGN KEY
);

-- Create the answers relation table
CREATE TABLE answers (
  anid      INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  qsid      INT         NOT NULL                FOREIGN KEY,
  itid      INT         NOT NULL                FOREIGN KEY,
  isCorrect BOOLEAN     NOT NULL  
);

