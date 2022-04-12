# [project-lexicallearner]
###### [project-lexicallearner] created by GitHub Classroom

## System Overview

Lexical Learner is an educational, open-source web application to assist users in both teaching and learning a new language. Lexical Learner will provide templates for vocabulary words, quizzes, modules, and games for an online learning setting as well as provide additional applications like a group messaging system that contains a translation option and a image translation feature that will be able to translate the text in an image. The application will work in tangent with and be intergrated the LMS Canvas, in a relationship comparable to canvas and Qwickly; User’s will be able to use and authorize their accounts on Lexical Learner through Canvas Upon accessing the application, the user will be prompted to create or sign into a profile, including their email, name, and their preferred language.

Once signed in, users will be able to create and join groups with other users by finding them through a search engine on the application or through a user’s specified id. The first function of this group will be to communicate with all grouped user’s with a messaging system. Included in this system will be a translation option, in which the user will be able to view all messages in their preferred language. Should the user wish to change their preferred language, all previous text will be able to be changed and translated with it.

The second function of the group will be the ability to practice vocabulary words that the users provide. Users will be able to choose and create a list of flashcards with their chosen vocabulary words. The user will then be able to submit and publish these flashcards to a group they belong to. The other users will be able to access these flashcards through three possible means; by being able to look and flip through the flashcards, being able to take a practice quiz based on the vocabulary list and being able to play a matching game with them.

The provided format for the practice quiz will be provided in such a way that either a vocabulary word or it’s defintionwill be placed in the upper part of the assignment . The user attempting the question will be provided all of the possible answers for the entirety of the quiz . Should the user select the corresponding translation/definition, they will move on to the next question. Otherwise, the answer selected will cross itself out and the user will have to select again. Once the user finally selects the correct answer, the incorrect answers will unblur themselves to allow for them to be selected again. For the game format, the user will be presented with a 4 by 5 blank model of cards. Upon clicking a card, the card will flip, revealing either a word or it’s corresponding definition and/or translation. The user must then find it’s corresponding value. If the user picks the wrong card, both cards will flip over to blank. Once all pairs have been found, the game will be won. The game will be timed to promote the player to practice and improve their vocabulary to better their time.

The application will also have the ability to translate images with text (in an assumed foreign language). The user just has to upload the image to Lexical Learner where either the translated message will be returned or an error message that states the image is too blurry to translate.All information required, such as profiles, assignments, module details will be accessed by a database interface. Any profile changed such as general information, or a password change will be accessible.

## [Testing Document](./Blank_Sample_Acceptance_QA_Testing_doc_Lexical_Learner.xlsx) /

## Design

### ./ [db](./db) /

Contains the database, its dependency modules, and some related documentation.

#### [database](./db/database) /

Contains the files needed to maintain the database and the API of the database in Node.js.

##### [create-db-template.sql](./db/database/create-db-template.sql), [create-db.js](./db/database/create-db.js)

The MySQL script and template for creating database, including all tables that it uses, `create-db-template.sql`,
and its Node.js wrapper `create-db.js`.
The template contains the templating string `@{database}`, which will be converted to the proper database name given by [the log-in file `db-log-in.json`][log-in file].
The Node.js wrapper calls [`runMySqlScript` from `run-mysql-script`](./db/database/run-mysql-script.js#L14) to fetch the name of the database and run the MySQL script.

The tables created are described in the [Database description].

##### [drop-db-template.sql](./db/database/drop-db-template.sql), [drop-db.js](./db/database/drop-db.js)

The MySQL script and template for cleaning up the tables used for the database and the database itself, `drop-db-template.sql`,
and its Node.js wrapper `drop-db.js`.
The template contains the templating string `@{database}`, which will be converted to the proper database name given by [the log-in file `db-log-in.json`][log-in file].
The Node.js wrapper calls [`runMySqlScript` from `run-mysql-script`][`runMySqlScript`] to fetch the name of the database and run the MySQL script.

All tables named by `TABLE_NAME` in the table `Tables_here` will be deleted,
as well as `Tables_here` itself.
Then the database will be deleted.

##### [run-mysql-script.js](./db/database/run-mysql-script.js)

Exports the function [`runMySqlScript`].
This function accepts a MySQL script file and a callback function.
The function will establish a database connection and run the MySQL script from the file in the connection, recieving a response.
It will then message the callback function with that response.

##### [start-db.js](./db/database/start-db.js)

Exports [its main function][start-db main] as itself, which the dependent file may name.
This program can be called itself to check if the connection can be established.
The function accepts a callback function.
If no callback is provided, it will instead use a `noop` function.
The function in the case of being `require`d, or program in the case of being ran directly, will read [the log-in file `db-log-in.json`][log-in file] and use the configuration contained therein to establish a database connection.
Once the connection is established, it will call the callback function,
sending it the connection as well as the name of the database,
which may be used by templating functions.

##### db-login.json

The database log-in configuration file.
In its place, [an example named `db-login.json.example`][log-in example] is provided instead.
This is the required format.
However, it should be configured exactly as the database created in the
MySQL Workbench or equivalent.

##### [.gitignore](./db/database/.gitignore)

A standard `.gitignore` file for preventing the `git commit`ing of undesired files.

The files that we will `.gitignore` are
* [The database log-in configuration file `db-login.json`][log-in file].

## Contributors
* [Cole Linse Fitzpatrick][ColeFitz88]
* [Grant Gwiazdowski][GrantGwiaz]
* [Jacky Chen He][tuo17505]
* [Leomar Duran][lduran2]
* [Shane Phillip Grinkewitz][Shanegrinkewitz]

<!--
      link references
-->

<!-- meta -->
[project-lexicallearner]: https://github.com/Capstone-Projects-2022-Spring/project-lexicallearner

<!-- Design -->
[Database description]: ./tree/main/doc/database#readme
[`runMySqlScript`]: ./db/database/run-mysql-script.js#L14
[log-in file]: #db-loginjson
[log-in example]: ./db/database/db-login.json.example
[start-db main]: https://github.com/Capstone-Projects-2022-Spring/project-lexicallearner/blob/database/db/database/start-db.js#L20

<!-- Contributors -->
[ColeFitz88]: https://github.com/ColeFitz88
[lduran2]: https://github.com/lduran2
[GrantGwiaz]: https://github.com/GrantGwiaz
[tuo17505]: https://github.com/tuo17505
[Shanegrinkewitz]: https://github.com/Shanegrinkewitz
