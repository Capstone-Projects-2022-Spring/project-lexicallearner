# [project-lexicallearner]
###### [project-lexicallearner] created by GitHub Classroom

## System Overview

Lexical Learner is an educational, open-source web application to assist users in both teaching and learning a new language. Lexical Learner will provide templates for vocabulary words, quizzes, modules, and games for an online classroom setting. Upon accessing the application, the user’s will be prompted to create or sign into a profile, including their email, name, and their profile’s classification, being either student or teacher. How the user interacts with the application is dependent on this classification.

The teacher’s perspective will be provided with templates and prewritten quizzes that will be able to be filled with vocabulary words, pictures and/or audio clips provided by this user. Any specifications to the assignments, such as the ability to retake the assignment, to take the average of the scores on an attempted assignment or to take the highest result, a possible time limit, etc; will be assigned by the user.  Once a module or assignment has been completed, the teacher will be able to publish this content to a subsection of application that will serve as a classroom environment. A teacher profile will be able to choose whether this classroom will be open to anyone or if the other profiles will need a code to access it.

A profile that has classified itself as a student will be able to access these environments and undertake the created modules and assignments. The student profiles won’t be limited to how many classes they can sign up for. All attempts, scores and records will be kept and remembered and be able to be accessed by both the student user and the teacher user. The student will also be given access to flash card like set of the practiced knowledge as well as any other resources provided. 

The provided format for the quiz will be provided in such a way that either flashcard of the vocabulary word or an audio depiction of it will be placed in the upper part of the assignment and played. The user attempting the question will be provided all of the possible answers for the entirety of the game. Should the user select the corresponding translation/definition, they will move on to the next question. Otherwise, the answer selected will cross itself out and the user will have to select again. Once the user finally selects the correct answer, the incorrect answers will unblur themselves to allow for them to be selected again. For the game format, the assignment will work in a similar fashion, in which a word will be provided. In this case, there will be two images instead, with only one corresponding with the vocabulary word. The user will need to drag the word to the proper image. 

All information required, such as profiles, assignments, module details will be accessed by a database interface. Any profile change such as general information, or a password change will be accessible.

## Design

### ./ [db](./db) /

#### [database](./db/database) /

##### [create-db-template.sql](./db/database/create-db-template.sql), [create-db.js](./db/database/create-db.js)

The MySQL script and template for creating database, including all tables that it uses, `create-db-template.sql`,
and its Node.js wrapper `create-db.js`.
The template contains the templating string `@{database}`, which will be converted to the proper database name given by [the log-in file `db-log-in.json`][log-in file].
The Node.js wrapper calls [`runMySqlScript` from `run-mysql-script`](./db/database/run-mysql-script.js#L14) to fetch the name of the database and run the MySQL script.

The tables created are described in the [Database description][db description].

##### [drop-db-template.sql](./db/database/drop-db-template.sql), [drop-db.js](./db/database/drop-db.js)

The MySQL script and template for cleaning up the tables used for the database and the database itself, `drop-db-template.sql`,
and its Node.js wrapper `drop-db.js`.
The template contains the templating string `@{database}`, which will be converted to the proper database name given by [the log-in file `db-log-in.json`][log-in file].
The Node.js wrapper calls [`runMySqlScript` from `run-mysql-script`][run sql line] to fetch the name of the database and run the MySQL script.

All tables named by `TABLE_NAME` in the table `Tables_here` will be deleted,
as well as `Tables_here` itself.
Then the database will be deleted.

##### [run-mysql-script.js](./db/database/run-mysql-script.js)

Exports the function [`runMySqlScript`][run sql line].
This function accepts a MySQL script file and a callback function.
The function will establish a database connection and run the MySQL script from the file in the connection, recieving a response.
It will then message the callback function with that response.

##### [start-db.js](./db/database/start-db.js)

Exports itself as a function, which the dependent file may name.
This program can be called itself to check if the connection can be established.
The function accepts a callback function.
If no callback is provided, it will instead use a `noop` function.
The function in the case of being `require`d, or program in the case of being ran directly, will read [the log-in file `db-log-in.json`][log-in file] and use the configuration contained therein to establish a database connection.
Once the connection is established, it will call the callback function,
sending it the connection as well as the name of the database,
which may be used by templating functions.

##### db-login.json

The database log-in configuration file.
In its place, [an example named `db-login.json.example`] is provided instead.
This is the required format.
However, it should be configured exactly as the database created in the
MySQL Workbench or equivalent.

##### .gitignore

A standard `.gitignore` file for preventing the `git commit`ing of undesired files.

The files that we will `.gitignore` are
* The database log-in configuration file `db-login.json`.

## Contributors
* [Cole Linse Fitzpatrick][ColeFitz88]
* [Grant Gwiazdowski][GrantGwiaz]
* Jacky Chen He
* [Leomar Duran][lduran2]
* Shane Phillip Grinkewitz

<!--
      link references
-->

[project-lexicallearner]: https://github.com/Capstone-Projects-2022-Spring/project-lexicallearner

[db description]: ./tree/main/doc/database#readme
[run sql line]: ./db/database/run-mysql-script.js#L14
[log-in file]: #db-login.json
[log-in example]: #db-login.json.example

[ColeFitz88]: https://github.com/ColeFitz88
[lduran2]: https://github.com/lduran2
[GrantGwiaz]: https://github.com/GrantGwiaz
