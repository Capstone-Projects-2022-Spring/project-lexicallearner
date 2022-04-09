-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist, and check.
CREATE DATABASE IF NOT EXISTS @{database};
SHOW DATABASES;

-- Enter the database
USE @{database};

-- Procedure to add all tables so far in a given database to
-- "Tables_here"
DROP PROCEDURE IF EXISTS update_Tables_here;
CREATE PROCEDURE update_Tables_here(IN database_name CHAR(64))
BEGIN
  INSERT IGNORE INTO Tables_here (TABLE_NAME) (
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA=database_name
  );
  -- show number of rows inserted
  SELECT ROW_COUNT();
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

-- Create the Profile entity table
CREATE TABLE IF NOT EXISTS Profile (
  pfid              INT             NOT NULL    AUTO_INCREMENT,
  UserEmail         VARCHAR(40)     NOT NULL,
  UserName          VARCHAR(20)     NOT NULL,
  UserType          ENUM('educator', 'student')
                                    NOT NULL,
  UserImage         VARCHAR(2048)   NOT NULL,
  StyleSheet        ENUM('lightmode', 'darkmode')
                                    NOT NULL,
  -- dash separated ISO language (3), country (3), script (4) codes
  PreferredLanguage VARCHAR(12)     NOT NULL,
  pfLevel           INT             NOT NULL    DEFAULT 1,
  score             INT             NOT NULL    DEFAULT 0,

  CONSTRAINT id_is_primary_key PRIMARY KEY (pfid)
);
CALL update_Tables_here(database());

-- Create the Canvas-linked Accounts entity table
CREATE TABLE IF NOT EXISTS CanvasAccount (
  cacid             CHAR(12)        NOT NULL,
  pfid              INT             NOT NULL,
  pat               BINARY(128)     NOT NULL,
  -- allow VARCHAR(4x) for salt, in case of escaped characters
  patSalt           VARCHAR(512)    NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (cacid),
  CONSTRAINT cac_Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid)
);
CALL update_Tables_here(database());

-- Create the Game Accounts entity table
CREATE TABLE IF NOT EXISTS GameAccount (
  pfid              INT             NOT NULL,
  password          BINARY(128)     NOT NULL,
  -- allow VARCHAR(4x) for salt, in case of escaped characters
  passwordSalt      VARCHAR(512)    NOT NULL,

  CONSTRAINT pfid_is_primary_key PRIMARY KEY (pfid),
  CONSTRAINT gac_Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid)
);
CALL update_Tables_here(database());

-- Create the Group entity table
CREATE TABLE IF NOT EXISTS UserGroup (
  grid              CHAR(12)        NOT NULL,
  groupName         VARCHAR(50)     NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (grid)
);
CALL update_Tables_here(database());

-- Create the "is in Group" relation table
CREATE TABLE IF NOT EXISTS inGroup (
  inGrid            CHAR(24)        NOT NULL,
  pfid              INT             NOT NULL,
  grid              CHAR(12)        NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (grid),
  CONSTRAINT inGr_Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid),
  CONSTRAINT Group_id_references FOREIGN KEY (grid) REFERENCES UserGroup(grid)
);
CALL update_Tables_here(database());

-- Create the Lesson entity table
CREATE TABLE IF NOT EXISTS Lesson (
  lsid              CHAR(18)        NOT NULL,
  pfid              INT             NOT NULL,
  lsLevel           INT             NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (lsid),
  CONSTRAINT ls_Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid)
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

-- Describe every table
DROP PROCEDURE IF EXISTS describe_tables_here;
CREATE PROCEDURE describe_tables_here(IN n_tables INT)
BEGIN
  -- index of the tables
  DECLARE   k   INT   DEFAULT 0;
  -- for each table
  WHILE (k < n_tables) DO
    -- Concatenate the describe statement
    SET @expression := (
      SELECT CONCAT('DESCRIBE ', TABLE_NAME, ';')
        FROM Tables_here ORDER BY tid LIMIT k, 1
    );
    SELECT @expression;
    -- Create the statement
    PREPARE stmt FROM @expression;
    -- Perform the statement
    EXECUTE stmt;
    -- increment the counter
    SET k := k + 1;
  END WHILE; -- WHILE (k <= n_tables)
END; -- PROCEDURE describe_tables_here()
CALL describe_tables_here((@N_TABLES_HERE));
DROP PROCEDURE describe_tables_here;
