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
- Question(__qsid__, lsid, qsItid)
- answers(__anid__, qsid, itid, isCorrect)
- Item(__itid__, itName, itSource)

## Data dictionary

Table name                  | Table description
----------------------------|-------------------------------------------------
[Account](#account-table)   | Contains account login information.
[Profile](#profile-table)   | Contains publicly available profile information.
[Lesson](#lesson-table)     | Contains a lesson's questions.
[Question](#question-table) | Contains a specific question.
[answers](#answers-table)   | Represents a possible answer to a question.
[Item](#item-table)         | Contains information about an item.

### Account table

Attribute name | Attribute description
---------------|--------------------------------------
acid           | Generated ID number for this account.
password       | Password to log into this account.

### Profile table

Attribute name | Attribute description
---------------|------------------------------------------------------------------------
pfid           | Generated ID number for this profile.
acid           | ID number of the account associated with this profile.
pfLevel        | The highest lesson level completed with this profile.
score          | The number of questions answered correctly this week with this profile.

### Lesson table

Attribute name | Attribute description
---------------|---------------------------------------------------
lsid           | Generated ID number for this lesson.
pfid           | ID number of the profile that created this lesson.
lsLevel        | Difficulty level to associate this lesson.

### Question table

Attribute name | Attribute description
---------------|---------------------------------------------------
qsid           | Generated ID number for this question.
lsid           | ID number of the lesson this question belongs to.
qsItid         | ID of the item that is used to ask the question.

### answers table

Attribute name | Attribute description
---------------|---------------------------------------------------
anid           | Generated ID number for this answer.
qsid           | ID number of the question this answer answers.
itid           | ID number of the item used for this answer.
isCorrect      | Whether the answer is correct or wrong.

### Item table

Attribute name | Attribute description
---------------|---------------------------------------------------
itid           | Generated ID number for this item.
itName         | The name of the item.
itSource       | The source of the file containing the item.
