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

## Entity&ndash;Relation diagram

### Chen's notation

### Crow's Foot notation

## Relational schema

- Account(__acid__, password)
- Profile(__pfid__, pfLevel, score)
- Lesson(__lsid__, pfid, level, lsLevel)
- LessonQuestion(__qsid__, lsid, question_item_id)
- answers(__anid__, qsid, itid)
- Items(__itid__, item_name, item_source)
