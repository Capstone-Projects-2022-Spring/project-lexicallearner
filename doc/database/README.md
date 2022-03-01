# Database description

Lexical Learner
is a web application for people to upload and play language matching lessons to help each other learn languages.  It
includes a database for handling content and one for handling accounts for players and content creaters.
The account database can be bypassed by using a Canvas account which is linked up to the Lexical Learner account.

## Business rules

1. Each account has an ID number and password.
1. Each profiles has an ID number, level, and weekly score.
1. A profile may be related to an account.
1. A profile may be related to a Canvas account.
1. A profile may teaches many lessons.
1. Each lesson has a lesson ID, a level, and one or more questions.
1. A question has a question ID and includes question item ID.
1. An item has an ID number, a name and a source.
1. Items can answer questions.
1. An answer may be correct or incorrect.

## Entity&ndash;Relation diagram

### Chen's notation

### Crow's Foot notation

## Relational schema

- Account(__acid__, password)
- Profile(__pfid__, acid, pfLevel, score)
- Lesson(__lsid__, pfid, lsLevel)
- Question(__qsid__, lsid, questionItid)
- answers(__anid__, qsid, itid, isC)
- Items(__itid__, itemName, itemSource)

## Data dictionary

Table name | Table description
-----------|-------------------------------------------------
Account    | Contains account login information.
Profile    | Contains publicly available profile information.
Lesson     | Contains a lesson's questions.
Question   | Contains a specific question.
answers    | Represents a possible answer to a question.
Items      | Contains information about an item.

Attribute name | Attribute description
---------------|--------------------------------------
acid           | Generated ID number for this account.
password       | Password to log into this account.

: Account table
