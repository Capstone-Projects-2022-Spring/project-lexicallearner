-- Template for creating the database given by `@{database}`.

-- Create the database if it does not exist, and check.
CREATE DATABASE IF NOT EXISTS @{database};
SHOW DATABASES;

-- Enter the database
USE @{database};

-- Create the Accounts entity table
CREATE TABLE IF NOT EXISTS Account (
  acid              CHAR(12)        NOT NULL,
  password          VARCHAR(40)     NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (acid)
);

-- Create the Profile entity table
CREATE TABLE IF NOT EXISTS Profile (
  pfid              CHAR(12)        NOT NULL,
  acid              CHAR(12)        NOT NULL,
  pfLevel           INT             NOT NULL,
  score             INT             NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (pfid),
  CONSTRAINT Account_id_references FOREIGN KEY (acid) REFERENCES Account(acid)
);

-- Create the Lesson entity table
CREATE TABLE IF NOT EXISTS Lesson (
  lsid              CHAR(18)        NOT NULL,
  pfid              CHAR(12)        NOT NULL,
  lsLevel           INT             NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (lsid),
  CONSTRAINT Profile_id_references FOREIGN KEY (pfid) REFERENCES Profile(pfid)
);

-- Create the Item entity table
-- Note: 16383 is the maximum column size
CREATE TABLE IF NOT EXISTS Item (
  itid              CHAR(21)        NOT NULL,
  itName            VARCHAR(255)    NOT NULL,
  itSource          VARCHAR(10000)  NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (itid)
);

-- Create the Question entity table
CREATE TABLE IF NOT EXISTS Question (
  qsid              CHAR(20)        NOT NULL,
  lsid              CHAR(18)        NOT NULL,
  qsItid            CHAR(21)        NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (qsid),
  CONSTRAINT Lesson_id_references FOREIGN KEY (lsid) REFERENCES Lesson(lsid),
  CONSTRAINT qsItem_id_references FOREIGN KEY (qsItid) REFERENCES Item(itid)
);

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

-- Create the Room entity table
CREATE TABLE IF NOT EXISTS Room (
  room_id           CHAR(12)        NOT NULL,
  room_name         VARCHAR(200)    NOT NULL,
  room_type         VARCHAR(20)     NOT NULL,

  CONSTRAINT id_is_primary_key PRIMARY KEY (room_id)
);

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

-- Show all tables created
SHOW TABLES;
