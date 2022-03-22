-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist, and check.
CREATE DATABASE IF NOT EXISTS @{database};
SHOW DATABASES;

-- Enter the database
USE @{database};

-- Constant for number of tables here
SET @N_TABLES_HERE := 0;

-- Procedure to add all tables so far in a given database to
-- "Tables_here"
DROP PROCEDURE IF EXISTS update_Tables_here;
CREATE PROCEDURE update_Tables_here(IN database_name CHAR(64))
BEGIN
  INSERT IGNORE INTO Tables_here (TABLE_NAME) (
    SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA=database_name
  );
  SET @N_TABLES_HERE = row_count();
END; -- PROCEDURE update_Tables_here(database_name)

-- Create a table of tables
-- tid gives creation order
CREATE TABLE IF NOT EXISTS Tables_here (
  tid               INT             NOT NULL    AUTO_INCREMENT,
  TABLE_NAME        VARCHAR(255)    NOT NULL,

  KEY tid (tid),
  CONSTRAINT name_is_primary_key PRIMARY KEY (TABLE_NAME)
);
CALL update_Tables_here(database());

-- Create the Accounts entity table
CREATE TABLE IF NOT EXISTS Account (
  acid              CHAR(12)        NOT NULL,
  password          VARCHAR(40)     NOT NULL,
  PAT               CHAR(12)        NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (acid)
);
CALL update_Tables_here(database());

-- Create the Profile entity table
CREATE TABLE IF NOT EXISTS Profile (
  pfid              CHAR(12)        NOT NULL,
  acid              CHAR(12)        NOT NULL,
  pfLevel           INT             NOT NULL,
  score             INT             NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (pfid),
  CONSTRAINT Account_id_references FOREIGN KEY (acid) REFERENCES Account(acid)
);
CALL update_Tables_here(database());

-- Create the Lesson entity table
CREATE TABLE IF NOT EXISTS Lesson (
  lsid              CHAR(18)        NOT NULL,
  pfid              CHAR(12)        NOT NULL,
  lsLevel           INT             NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (lsid),
  CONSTRAINT Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid)
);
CALL update_Tables_here(database());

-- Create the Item entity table
-- Note: for itSource, 2048 is the maximum URL length in IExplorer
CREATE TABLE IF NOT EXISTS Item (
  itid              CHAR(21)        NOT NULL,
  itName            VARCHAR(255)    NOT NULL,
  itSource          VARCHAR(2048)  NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (itid)
);
CALL update_Tables_here(database());

-- Create the Question entity table
CREATE TABLE IF NOT EXISTS Question (
  qsid              CHAR(20)        NOT NULL,
  lsid              CHAR(18)        NOT NULL,
  qsItid            CHAR(21)        NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (qsid),
  CONSTRAINT Lesson_id_references FOREIGN KEY (lsid) REFERENCES Lesson(lsid),
  CONSTRAINT qsItem_id_references FOREIGN KEY (qsItid) REFERENCES Item(itid)
);
CALL update_Tables_here(database());

-- Create the answers relation table
CREATE TABLE IF NOT EXISTS answers (
  anid              CHAR(21)        NOT NULL,
  qsid              CHAR(20)        NOT NULL,
  itid              CHAR(21)        NOT NULL,
  isCorrect         BOOLEAN         NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (anid),
  CONSTRAINT Question_id_references FOREIGN KEY (qsid) REFERENCES Question(qsid),
  CONSTRAINT Item_id_references FOREIGN KEY (itid) REFERENCES Item(itid)
);
CALL update_Tables_here(database());

-- Create the Room entity table
CREATE TABLE IF NOT EXISTS Room (
  room_id           CHAR(12)        NOT NULL,
  room_name         VARCHAR(200)    NOT NULL,
  room_type         VARCHAR(20)     NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (room_id)
);
CALL update_Tables_here(database());

-- Create the Message entity table
CREATE TABLE IF NOT EXISTS Message (
  message_id        CHAR(12)        NOT NULL,
  room_id           CHAR(12)        NOT NULL,
  from_user_id      INT             NOT NULL,
  to_user_id        INT             NOT NULL,
  content           VARCHAR(200)    NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (message_id),
  CONSTRAINT Room_id_references FOREIGN KEY (room_id) REFERENCES Room(room_id)
);
CALL update_Tables_here(database());

-- Show all tables created
SHOW TABLES;

-- Show table of tables in creation order
SELECT tid, TABLE_NAME FROM Tables_here;

-- Count the tables stored
SET @N_TABLES_HERE := (SELECT COUNT(*) FROM Tables_here);
SELECT @N_TABLES_HERE;
