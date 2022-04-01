-- Template for creating the database given by `@{database}`.

-- Enter the database
USE @{database};

INSERT INTO Profile(UserEmail, UserName, UserType, UserImage,
    StyleSheet, PreferredLanguage, pfLevel, score)
  VALUES(@{user-email}, @{user-name}, @{user-type}, @{user-image},
    @{style-sheet}, @{preferred-language}, @{level}, @{score});