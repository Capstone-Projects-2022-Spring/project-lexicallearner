-- Template for deleting the database given by `@{database}`.

-- Enter the database
USE @{database};

-- Clean up all tables if they already exist, and check
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS Profile;
DROP TABLE IF EXISTS Account;
SHOW TABLES;


-- Now remove the database, and check
DROP DATABASE @{database};
SHOW DATABASES;
